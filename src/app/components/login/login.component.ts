import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { Login, Register } from 'src/app/models/login-model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public frmLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog,public serviceLogin:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.frmLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit(){
    let sendObj:Login={
      email:'',
      password:''
    };
    sendObj.email = this.frmLogin.value.email;
    sendObj.password =this.frmLogin.value.password;
    this.serviceLogin.auth(sendObj).subscribe(resp=>{
      if(resp.status){
      console.log("Inicio sesion",resp.token);
      localStorage.setItem('user',JSON.stringify(resp));
      this.router.navigate(['complaint']);
      }
      else
      alert("No se pudo iniciar sesion");
    }, error => alert("No se pudo iniciar sesion"));
  }
  openDialog(){
    this.dialog.open(RegisterDialog);
  }
}


@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterDialog implements OnInit{
  public frmRegister: FormGroup;
  constructor(private formBuilder: FormBuilder,public serviceLogin:LoginService) {}
  ngOnInit(){
    this.frmRegister = this.formBuilder.group({
      username: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit(){
    let sendObj:Register={
      apellido:'',
      email:'',
      nombre:'',
      password:''
    };
    sendObj.nombre = this.frmRegister.value.username;
    sendObj.apellido = this.frmRegister.value.lastname;
    sendObj.email = this.frmRegister.value.email;
    sendObj.password = this.frmRegister.value.password;
    console.log(sendObj)
    this.serviceLogin.register(sendObj).subscribe(resp=>{
      if(resp.status)
      console.log("Se registro correctamente")
      else
      alert("No pudo registrarse correctamente")
    })
    console.log(this.frmRegister.value)
  }

}
