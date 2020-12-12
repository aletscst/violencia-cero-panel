import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contacts, ContactsSend, respContacts, respStatus } from '../models/contacts-emergency';
import { DATACONTACTS } from '../mocks/contacts-mocks'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsEmergencyService {
  //private url = 'http://localhost:3000/contactos';
  private url = 'http://201.116.12.210:3000/contactos';

  constructor(private _http:HttpClient) { }

  getContacts():Observable<respContacts>{
    //return of(DATACONTACTS);
    return this._http.get<respContacts>(this.url);
  }

  addContactos(obj:any):Observable<respStatus>{
    return this._http.post<respStatus>(this.url,obj);
  }

  updateContacto(id:number,obj:ContactsSend):Observable<respStatus>{
    return this._http.put<respStatus>(this.url+id.toString(), obj);
  }

  deleteContact(id:number):Observable<respStatus>{
    return this._http.delete<respStatus>(this.url+id);
  }

}
