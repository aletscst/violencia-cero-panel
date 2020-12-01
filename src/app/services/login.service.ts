import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';
import { Login, Register, respLogin, respRegister } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private url = 'http://localhost:3000/admin/';
  private url = 'http://201.116.12.210:3000/admin/';
  constructor(private _http:HttpClient,private jwtHelper: JwtHelperService) { }

  auth(obj:Login):Observable<respLogin>{
    return this._http.post<respLogin>(this.url+"login",obj);
  }

  logout(){
    localStorage.removeItem('user');
  }

  isAuthenticate(): boolean{
    const user:respLogin = JSON.parse(localStorage.getItem('user'));
    return !this.jwtHelper.isTokenExpired(user.token);
  }

  register(obj:Register):Observable<respRegister>{
    return this._http.post<respRegister>(this.url,obj);
  }

}
