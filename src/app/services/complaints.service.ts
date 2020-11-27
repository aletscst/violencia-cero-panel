import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATACOMPLAINS } from '../mocks/complaint-mocks';
//import { DATACOMPLAINTRESP } from '../mocks/procedures-mocks';
import { Denuncia, denunciaObj, respData, searchComplaint,respStatus } from '../models/complaint-model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  private url = 'http://localhost:3000/denuncias/';

  constructor(private _http:HttpClient) { }

  getComplaints():Observable<denunciaObj>{
    //return of(DATACOMPLAINS);
    return this._http.get<denunciaObj>(this.url);
  }
  getCompaintID(id:number):Observable<respData>{
    return this._http.get<respData>(this.url+id);
  }
  editComplaint(id:number,obj:Denuncia):Observable<respStatus>{
    return this._http.put<respStatus>(this.url+id,obj)
  }
  searchComplaints(obj:searchComplaint):Observable<denunciaObj>{
    return this._http.post<denunciaObj>(this.url,obj);
  }
  
}
