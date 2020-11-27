import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacts, ContactsSend, respContacts } from 'src/app/models/contacts-emergency';
import { ContactsEmergencyService } from 'src/app/services/contacts-emergency.service';


@Component({
  selector: 'app-contacts-emergency',
  templateUrl: './contacts-emergency.component.html',
  styleUrls: ['./contacts-emergency.component.scss']
})
export class ContactsEmergencyComponent implements OnInit {

  public dataContacts: Contacts[];
  public isEdit: boolean;

  public nameContact: String = '';
  public lastMContact: String = '';
  public lastPContact: String = '';

  public frmContacts: FormGroup;

  constructor(private _fb: FormBuilder, private serviceContacts: ContactsEmergencyService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.frmContacts = this._fb.group({
      regName: "",
      regDesc: "",
      regNum: ""
    });
    this.loadContacts();

  }
  public data: String;

  loadContacts(){
    this.serviceContacts.getContacts().subscribe(resp => {
      this.dataContacts = resp.data;
      console.log(resp);
    });
  }
  editContact(id: Contacts) {
    this.isEdit = true;
    console.log(id);
    this.openDialog(id)
  }
  deleteContact(id: number) {
    this.serviceContacts.deleteContact(id).subscribe(resp=>{
      console.log(resp)
      if(resp.status)
      this.loadContacts();
      else alert("No se pudo eliminar")
    });
  }
  openDialog(obj: any): void {
    const dialogRef = this.dialog.open(ContactEditDialog, {
      width: '100%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  SaveContact(value) {
    console.log(value)
    let jsonSend:ContactsSend={
      description: value.regDesc,
      name: value.regName,
      number: value.regNum
    }
    this.serviceContacts.addContactos(jsonSend).subscribe(resp=>{
      console.log(resp);
      if(resp.status)
      this.loadContacts();
      else
      alert("No se pudo guardar")
    });
  }
}

@Component({
  selector: 'contact-dialog-edit',
  templateUrl: 'contact-dialog-edit.html',
})
export class ContactEditDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Contacts) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  

}