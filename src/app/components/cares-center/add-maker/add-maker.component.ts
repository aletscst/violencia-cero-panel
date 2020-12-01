import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CaresCenterService } from 'src/app/services/cares-center.service';

import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeo from '@mapbox/mapbox-gl-geocoder';
import { ActivatedRoute } from '@angular/router';
import { addMarker, markersMap } from 'src/app/models/cares-center-model';


@Component({
  selector: 'app-add-maker',
  templateUrl: './add-maker.component.html',
  styleUrls: ['./add-maker.component.scss']
})
export class AddMakerComponent implements OnInit {
  
  public data:markersMap[]=[];
  public latitud:number = -99.143993;
  public longitud:number = 19.4355293;

  public nameMarker:String='';
  public descMarker:String='';
  public addresMarker:String='';

  public newMarker:addMarker={
    nombre:'',
    descripcion:'',
    direccion:'',
    lat:0,
    long:0
  };

  mapa:Mapboxgl.Map;

  constructor(private serviceCareCenter:CaresCenterService,private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapboxKey;
    //console.log(this.route.snapshot.params.id);
    // if(this.route.snapshot.params.id !== null){
    //   let num = Number(this.route.snapshot.params.id);
    //   this.serviceCareCenter.getMarkers().subscribe(resp=>{
    //     console.log(resp)
    //     for(let i=0;i<num;i++){
    //       if(num == i){
    //         this.data.push(resp[i]);
    //         console.log(resp)
    //         console.log("Entro al if")
    //       }
    //       console.log(Number(this.route.snapshot.params.id))
    //     }
    //   })
    // }

    console.log(this.data);
    /*
    const geocoder = new MapboxGeo({
      accessToken: Mapboxgl.accessToken,
      types: 'country,region,place,postcode,locality,neighborhood'
    });
    geocoder.addTo('#geocoder');*/

    this.openMarker(this.longitud,this.latitud);

  }

  addMarker(){
    this.newMarker.nombre = this.nameMarker;
    this.newMarker.descripcion = this.descMarker;
    this.newMarker.direccion = this.addresMarker;
    this.newMarker.long = this.longitud;
    this.newMarker.lat = this.latitud;
    console.log(this.newMarker);
    this.serviceCareCenter.addMarker(this.newMarker).subscribe(resp=>{
      if(!resp.estatus)
      console.log("Marcador agregado")
      else
      alert("No se pudo agregar el marcador")
    });
  }

  createMarker(lng:number,lat:number){
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
      marker.on('drag',()=>{
        this.latitud = marker.getLngLat().lat;
        this.longitud = marker.getLngLat().lng;
        //console.log(marker.getLngLat())
      });
  }

  openMarker(lat:number,long:number){
    this.mapa = new Mapboxgl.Map({
      container: 'mapaEdit', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [long,lat], // Longitud -- @Latitud
      zoom: 16 // starting zoom
    });
    this.createMarker(long,lat);
  }

}
