import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register, UserApp, UserPanel } from 'src/app/models/login-model';
import { LoginService } from 'src/app/services/login.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public usersApp:UserApp[] = [];
  public usersPanel:UserPanel[] = [];
  public isAdding:boolean = false;
  public newUserPanel:UserPanel;

  constructor(private usersServ:LoginService, private router: Router) { }

  ngOnInit(): void {

    this.usersServ.getUserData().subscribe(data => {
      if(data.tipo == 'ADMIN'){
        this.getUsersApp();
        this.getUsersPanel();
      }else{ alert('Usuario Sin Permisos'); this.router.navigate(['/complaint']);}
    }, error => {alert('Usuario Sin Permisos'); this.router.navigate(['/complaint']);});
    
  }

  getUsersApp(){
    this.usersApp = [];

    this.usersServ.getUsersApp().subscribe(data => {
      this.usersApp = data.data;
    }, error => alert('Error al obtener los usuarios'));
  }

  getUsersPanel(){
    this.usersPanel = [];

    this.usersServ.getUsersPanel().subscribe(data => {
      this.usersPanel = data.data;
    }, error => alert('Error al obtener los usuarios'));
  }

  newUser(user:UserPanel){
    if(user == null){
      this.newUserPanel = {
        id:null,
        nombre : '',
        apellido : '',
        email : '',
        password : '',
        tipo: 'USER'
        }
      }else {
        this.newUserPanel = user;
      }

    this.isAdding = true;
  }

  saveUser(){
    this.usersPanel = [];
    if(!this.isValid()) {
      alert('Datos Incompletos'); 
      return
    }
    (this.newUserPanel.id == null) ? this.addUser() : this.updateUser();
    this.isAdding = false;
  }

  addUser(){
    this.usersServ.register(this.newUserPanel).subscribe(data => {
      if(!data.status){
        alert('Error Registrar Usuario')
      }
      this.getUsersPanel();
    }, error => {alert('Error al Registrar'); this.getUsersPanel()});
  }

  updateUser(){
    this.usersServ.updateUserPanel(this.newUserPanel).subscribe(data => {
      if(!data.status){
        alert('Error al Guardar Usuario')
      }
      this.getUsersPanel();
    }, error => {alert('Error al Guardar'); this.getUsersPanel()});
  }

  deleteUserPanel(id){
    if(!confirm('Desea Eliminar Este Usuario')) return;
    this.usersServ.deleteUserPanel(id).subscribe(data => {
      if(!data.status){
        alert('Error al Eliminar')
      }
      this.getUsersPanel();
    }, error => {alert('Error al Eliminar'); this.getUsersPanel()});
  }

  deleteUserApp(id){
    if(!confirm('Desea Eliminar Este Usuario')) return;
    this.usersServ.deleteUserApp(id).subscribe(data => {
      if(!data.status){
        alert('Error al Eliminar')
      }
      this.getUsersApp();
    }, error => {alert('Error al Eliminar'); this.getUsersPanel()});
  }

  isValid(){
    if(this.newUserPanel.nombre == '') return false;
    if(this.newUserPanel.apellido == '') return false;
    if(this.newUserPanel.email == '') return false;
    if(this.newUserPanel.password == '') return false;

    return true;
  }

  exportExcel() {
    const worksheet = xlsx.utils.json_to_sheet(this.usersApp);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Usuarios App');

  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + new Date().toLocaleDateString() + EXCEL_EXTENSION);

    });
  }

}
