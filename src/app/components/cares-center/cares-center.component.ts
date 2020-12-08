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

  public makersList:markersMap[] = [];
  public showMap:boolean=true;
  public mapaAdd:boolean=false;
  public edit:boolean=false;
  public prueba:string;

  public idMarker:number;

  public updateDir:markersMap;

  public center = {lat: 19.191496, lng: -99.023021};
  public zoom = 16;
  public markerOptions: google.maps.MarkerOptions = {draggable: false};
  public markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(private serviceCaresCenter:CaresCenterService) { }

  ngOnInit(): void {

    (Mapboxgl as any).accessToken = environment.mapboxKey;
    //this.createMarkerAdd(19.4355293,-99.143993);
    this.loadMarkers();
  }

  loadMarkers(){
    this.makersList = [];
    this.serviceCaresCenter.getMarkers().subscribe(resp=>{
      this.makersList = resp.data;
    });
  }

  showMark(direction:markersMap){
    
    let mark:google.maps.LatLngLiteral = {
      lat:direction.lat,
      lng: direction.long
    };
    this.markerPositions = [];
    this.markerPositions.push(mark);
  }

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions = [];
    this.updateDir.lat = event.latLng.lat();
    this.updateDir.long = event.latLng.lng();
    this.markerPositions.push(event.latLng.toJSON());
  }

  editDirection(direction:markersMap){
    this.edit = true;
    this.updateDir = direction;
    this.showMark(direction);
  }

  updateDirection(){
    this.serviceCaresCenter.updateMarker(this.updateDir.id,this.updateDir).subscribe(data => {
      this.edit = false;
      if(!data.status){
        alert('No se pudo actualizar la direccion');
      }else{
        this.loadMarkers();
      }
    });
  }
  
  delete(obj:markersMap){
    if(!confirm(`Deseas eliminar ${obj.nombre}`)) return;
    
    this.serviceCaresCenter.deleteMarker(obj.id).subscribe(resp=>{
      if(resp.status)
      this.loadMarkers();
      else
      alert("No se pudo eliminar el marcador")
    });

  }

}
