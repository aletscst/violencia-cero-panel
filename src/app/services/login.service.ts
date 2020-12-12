import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { DataUsersApp, DataUsersPanel, Login, Register, respLogin, respRegister, UserApp, UserPanel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private url = 'http://localhost:3000/admin';
  private url = 'http://201.116.12.210:3000/admin';
  constructor(private _http:HttpClient,private jwtHelper: JwtHelperService) { }

  auth(obj:Login):Observable<respLogin>{
    return this._http.post<respLogin>(this.url+"/login",obj);
  }

  logout(){
    localStorage.removeItem('user');
  }

  isAuthenticate(): boolean{
    const user:respLogin = JSON.parse(localStorage.getItem('user'));
    return !this.jwtHelper.isTokenExpired(user.token);
  }

  getUserData():Observable<UserPanel>{
    return this._http.get<UserPanel>(this.url+'/perfil');
  }

  ///////Usuarios//////

  register(obj:Register):Observable<respRegister>{
    return this._http.post<respRegister>(this.url,obj);
  }

  getUsersApp():Observable<DataUsersApp>{
    return this._http.get<DataUsersApp>(this.url+'/perfil/usersapp');
  }

  getUsersPanel():Observable<DataUsersPanel>{
    return this._http.get<DataUsersPanel>(this.url+'/perfil/userspanel');
  }

  updateUserPanel(user:UserPanel):Observable<respRegister>{
    return this._http.put<respRegister>(this.url+'/perfil/'+user.id,user);
  }

  deleteUserApp(id):Observable<respRegister>{
    return this._http.delete<respRegister>(this.url+'/perfil/usersapp/'+id,);
  }

  deleteUserPanel(id):Observable<respRegister>{
    return this._http.delete<respRegister>(this.url+'/perfil/usersPanel/'+id,);
  }

}
