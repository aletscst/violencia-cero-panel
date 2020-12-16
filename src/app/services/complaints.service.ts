import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DATACOMPLAINS } from '../mocks/complaint-mocks';
//import { DATACOMPLAINTRESP } from '../mocks/procedures-mocks';
import { Denuncia, denunciaObj, respData, searchComplaint,respStatus } from '../models/complaint-model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  
  //private url = 'http://localhost:3000/denuncias';
  private url = 'http://201.116.12.210:3000/denuncias';

  constructor(private _http:HttpClient) { }
  
  getComplaints():Observable<denunciaObj>{
    //headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYmV0b3ZjIiwiaWQiOjEsImlhdCI6MTYwNjc4ODE5NiwiZXhwIjoxNjA2ODc0NTk2fQ.D8qAunUCVHW1yHArZuaUP3lx9o0FYJRE_gbr7cyBT40');
    return this._http.get<denunciaObj>(this.url);
  }
  getCompaintID(id:number):Observable<respData>{
    return this._http.get<respData>(this.url+'/'+id);
  }
  editComplaint(id:number,obj:Denuncia):Observable<respStatus>{
    return this._http.put<respStatus>(this.url+'/'+id,obj)
  }
  searchComplaints(obj:searchComplaint):Observable<denunciaObj>{
    return this._http.post<denunciaObj>(this.url+'/history',obj);
  }
  
}
