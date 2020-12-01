import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { addMarker, MarkersList, markersMap, respStatus } from '../models/cares-center-model';

@Injectable({
  providedIn: 'root'
})
export class CaresCenterService {

  //private url = 'http://localhost:3000/centros/';
  private url = 'http://201.116.12.210:3000/centros';

  constructor(private http:HttpClient) { }

  getMarkers(): Observable<MarkersList> {
    return this.http.get<MarkersList>(this.url);
  }
  // Yo no la utilizo
  getMarkerID(id:number):Observable<markersMap>{
    return this.http.get<markersMap>(this.url+id);
  }
  
  addMarker(obj:addMarker):Observable<respStatus>{
    return this.http.post<respStatus>(this.url,obj);
  }

  updateMarker(id:number,obj:addMarker):Observable<respStatus>{
    return this.http.put<respStatus>(this.url+id,obj);
  }
  
  deleteMarker(id:number):Observable<respStatus>{
    return this.http.delete<respStatus>(this.url+id);
  }

  /*
  setData(data) {
    this.data = data;
  }
  getData() {
    let temp = this.data;
    return temp;
  }*/
}
