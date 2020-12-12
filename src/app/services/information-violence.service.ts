import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getObjViolence, getObjViolenceID, reqObjParrafos,respStatus, updateViolence } from '../models/information-violence-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationViolenceService {

  //private url = 'http://localhost:3000/informacion';
  private url = 'http://201.116.12.210:3000/informacion';

  constructor(private _http:HttpClient) { }
  getListViolence():Observable<getObjViolence>{
    return this._http.get<getObjViolence>(this.url);
  }
  getViolencebyID(id:number):Observable<getObjViolenceID>{
    return this._http.get<getObjViolenceID>(this.url+id.toString());
  }
  addViolence(obj:reqObjParrafos):Observable<respStatus>{
    return this._http.post<respStatus>(this.url,obj);
  }
  deleteViolence(id:number):Observable<respStatus>{
    return this._http.delete<respStatus>(this.url+id);
  }
  updateViolence(id:number,obj:updateViolence):Observable<respStatus>{
    return this._http.put<respStatus>(this.url+id,obj)
  }

}
