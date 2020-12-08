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

  public nameMarker:String='';
  public descMarker:String='';
  public addresMarker:String='';

  public newMarker:addMarker={
    id:null,
    nombre:'',
    descripcion:'',
    direccion:'',
    lat:0,
    long:0
  };

  public center = {lat: 19.191496, lng: -99.023021};
  public zoom = 16;
  public markerOptions: google.maps.MarkerOptions = {draggable: false};
  public markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private serviceCareCenter:CaresCenterService,private route: ActivatedRoute) { 

  }

  ngOnInit(): void {

  }

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions = [];
    this.newMarker.lat = event.latLng.lat();
    this.newMarker.long = event.latLng.lng();
    this.markerPositions.push(event.latLng.toJSON());
  }

  save(){
    this.serviceCareCenter.addMarker(this.newMarker).subscribe( data => {
      if(!data.status){
        alert('No se pudo guardar la dirección');
      }else{
        alert('Dirección Agregada');
      }
    }, error => alert('No se pudo guardar la dirección'));
  }

}
