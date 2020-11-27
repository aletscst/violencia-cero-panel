import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';
import { addMarker, markersMap } from 'src/app/models/cares-center-model';
import { CaresCenterService } from 'src/app/services/cares-center.service';

@Component({
  selector: 'app-cares-center',
  templateUrl: './cares-center.component.html',
  styleUrls: ['./cares-center.component.scss']
})
export class CaresCenterComponent implements OnInit {

  public makersList:markersMap[];
  public lat:number;
  public long:number;
  public showMap:boolean=true;
  public mapaAdd:boolean=false;
  public edit:boolean=false;
  public prueba:string;

  public idMarker:number;
  public objMarker:addMarker={
    descripcion:'',
    direccion:'',
    lat:0,
    long:0,
    nombre:''
  };

  mapa:Mapboxgl.Map

  constructor(private serviceCaresCenter:CaresCenterService) { }

  ngOnInit(): void {

    (Mapboxgl as any).accessToken = environment.mapboxKey;
    //this.createMarkerAdd(19.4355293,-99.143993);
    this.loadMarkers();
  }

  loadMarkers(){
    this.serviceCaresCenter.getMarkers().subscribe(resp=>{
      this.makersList = resp.data;
    });
  }
  saveMarker(){
    this.edit=false;
    this.makersList.forEach(element => {
      if(element.id === this.idMarker)
      {
        element.lat = this.lat;
        element.long = this.long;
      }
    });
    this.editMarker(this.long,this.lat,this.edit);
    console.log(this.makersList);
    console.log(this.objMarker);
    this.serviceCaresCenter.updateMarker(this.idMarker,this.objMarker).subscribe(resp=>{
      if(!resp.estatus)
      console.log("Se modifico con exito")
      else
      alert("No se pudo modificar el marcador")
    });
    //console.log("Guardado")
  }
  editMap(obj:any){
    this.objMarker = obj;
    this.idMarker = obj.id;
    this.edit = true;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [obj.long,obj.lat], // Longitud -- @Latitud
      zoom: 16 // starting zoom
    });
    this.editMarker(obj.long,obj.lat,this.edit);
    this.showMap=true;
  }

  editMarker(lng:number,lat:number,bandera:boolean){
    const marker = new Mapboxgl.Marker({
      draggable: bandera
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
      marker.on('drag',()=>{
        this.lat = marker.getLngLat().lat;
        this.long = marker.getLngLat().lng;
        //console.log(marker.getLngLat());
      });
  }

  createMarker(lng:number,lat:number){
    const marker = new Mapboxgl.Marker({
      draggable: false
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
      marker.on('drag',()=>{
        //console.log(marker.getLngLat());
      });
  }
  
  delete(obj:any){
    this.serviceCaresCenter.deleteMarker(obj.id).subscribe(resp=>{
      if(resp.status)
      this.loadMarkers();
      else
      alert("No se pudo eliminar el marcador")
    });

  }

  openMarker(lat:number,long:number){
    this.mapa = new Mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [long,lat], // Longitud -- @Latitud
      zoom: 16 // starting zoom
    });
    this.createMarker(long,lat);
    this.showMap=true;
  }

  statusMap(){
    this.showMap = !this.showMap;
    //console.log(this.showMap)
  }

  statusMapEdit(){
    this.mapaAdd = !this.mapaAdd;
    if(this.mapaAdd){
      //this.createMarkerAdd(19.4355293,-99.143993);
    }
    //console.log(this.mapaAdd);
  }

}
