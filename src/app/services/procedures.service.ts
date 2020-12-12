import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { DATAPROCEDURES, OBJPROCEDURE } from '../mocks/procedures-mocks';
import { ListProcedures, ObjProcedures, objRespByID, objRespProcedures, reqDataProcedure, respStatus } from '../models/procedures';

@Injectable({
  providedIn: 'root'
})
export class ProceduresService {

  //private url = 'http://localhost:3000/procedimientos';
  private url = 'http://201.116.12.210:3000/procedimientos';

  constructor(private _http:HttpClient) { }
  getListProcedures():Observable<objRespProcedures>{
    return this._http.get<objRespProcedures>(this.url);
  }
  getProcedurebyID(id:number):Observable<objRespByID>{
    return this._http.get<objRespByID>(this.url+id.toString());
  }
  addProcedure(obj:reqDataProcedure):Observable<respStatus>{
    return this._http.post<respStatus>(this.url,obj);
  }
  deleteProcedure(id:number):Observable<respStatus>{
    return this._http.delete<respStatus>(this.url+id);
  }
  updateProcedure(id:number,obj:objRespByID):Observable<respStatus>{
    return this._http.put<respStatus>(this.url+id,obj)
  }
}
