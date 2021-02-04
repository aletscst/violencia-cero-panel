import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data,getObjViolenceID,Parrafos } from 'src/app/models/information-violence-model';
import { ProceduresService } from 'src/app/services/procedures.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getObjViolence, reqObjParrafos } from 'src/app/models/information-violence-model';
import { InformationViolenceService } from 'src/app/services/information-violence.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-information-violence',
  templateUrl: './information-violence.component.html',
  styleUrls: ['./information-violence.component.scss']
})
export class InformationViolenceComponent implements OnInit {

  public dataViolence:Data[] = [];
  public frmProcedure: FormGroup;
  public parrafos:Parrafos[]=[{texto:'',link:''}];

  public sendJson:reqObjParrafos={
    titulo:'',
    parrafos:[{texto:'',link:''}]
  };

  public titleProcedure:String;
  public frmEditProcedure:FormGroup;
  public miarray:Parrafos[]=[];
  public emptyParrafo:boolean=true;

  constructor(private _fb: FormBuilder,
    private serviceViolence:InformationViolenceService,
    public dialog: MatDialog, 
    private usersServ:LoginService, 
    private router: Router) { 
    this.frmEditProcedure = new FormGroup({
      formArrayName: this._fb.array([])
      
    });
    //this.buildForm();
  }

  ngOnInit(): void {

    this.usersServ.getUserData().subscribe(data => {
      if(data.tipo == 'ADMIN'){
        this.loadProcedure();
        this.buildForm();
      }else{ alert('Usuario Sin Permisos'); this.router.navigate(['/complaint']);}
    }, error => {alert('Usuario Sin Permisos'); this.router.navigate(['/complaint']);});
  }

  loadProcedure(){
    this.dataViolence = [];
    this.serviceViolence.getListViolence().subscribe(resp=>{
      this.dataViolence = resp.data;
      //console.log("Violencia:",this.dataViolence)
      //console.log(resp)
    });
  }

  buildForm(){
    const controlArray = this.frmEditProcedure.get('formArrayName') as FormArray;
    //this.miarray.push(controlArray.value);
    //console.log('mi arreglo ',this.miarray)
    controlArray.clear();
    Object.keys(this.parrafos).forEach((i) => {
      controlArray.push(
        this._fb.group({
          regSubtitle: new FormControl({ value: this.parrafos[i].subtitulo , disabled: false}),
          regParrafo: new FormControl({ value: this.parrafos[i].texto , disabled: false})
        })
      )
    })
    //console.log(controlArray.controls)
  }

  onChange(obj:string){
    //console.log(obj);
    if(obj !== null && obj.length >0)
    this.emptyParrafo = false;
    else
    this.emptyParrafo = true;
  }

  addParrafo(value:any){
    //console.log(this.frmEditProcedure.valid);
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    //this.parrafos[] this.frmEditProcedure.value;
    this.parrafos.forEach(element => {
      element.link = a.at(0).value.regSubtitle;
      element.texto = a.at(0).value.regParrafo;
    });
    
    let addParrafo:Parrafos={
      link:'',
      texto:''
    }
    this.parrafos.push(addParrafo);
    //console.log(this.parrafos)
    this.buildForm();
    this.emptyParrafo = true;
  }

  SaveProcedure(){
    //console.log(this.titleProcedure)
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    this.parrafos.forEach(element => {
      element.link = a.at(0).value.regSubtitle;
      element.texto = a.at(0).value.regParrafo;
    });
    this.sendJson.titulo = this.titleProcedure;
    this.sendJson.parrafos = this.parrafos;
    //console.log(this.sendJson)
    this.serviceViolence.addViolence(this.sendJson).subscribe(resp=>{
        if(resp.status)
        this.loadProcedure();
        else
        alert("No se pudo guardar correctamente")
    });
  }

  openDialog(obj:any): void {
    //console.log(obj)
    const dialogRef = this.dialog.open(InformationViolence, {
      width: '100%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadProcedure();
      this.buildForm();
    });
  }

  deleteProcedure(obj:any){
    this.serviceViolence.deleteViolence(obj.id).subscribe(resp=>{
      if(resp.status)
      this.loadProcedure();
      else
      alert("No se pudo eliminar correctamente");
    });
  }
}



@Component({
  selector: 'information-violence-dialog',
  templateUrl: 'information-violence-dialog.html',
  styleUrls: ['informtaion-violence-dialog.scss']
})
export class InformationViolence implements OnInit{

  public parrafoObj:getObjViolenceID={
    id:0,
    estatus:'',
    titulo:'',
    parrafos:[{link:'',texto:''}]
  };
  public parrafos:Parrafos[];
  public load:boolean=true;
  public sendJsonID:getObjViolenceID={
    estatus:'',
    id:0,
    parrafos:[{link:'',texto:''}],
    titulo:''
  };

  public titleProcedure:String='';
  public frmEditProcedure: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private serviceViolence:InformationViolenceService,private _fb: FormBuilder,private dialogRef: MatDialogRef<InformationViolence>,public dialog: MatDialog) 
  {
    this.frmEditProcedure = new FormGroup({
      formArrayName: this._fb.array([])
    });


  }
  
  ngOnInit(): void {

    this.serviceViolence.getViolencebyID(this.data.id).subscribe( resp =>{
      this.parrafoObj = resp; 
      this.parrafos = resp.parrafos;
      this.titleProcedure = this.parrafoObj.titulo;
      //console.log(this.parrafoObj)
      //console.log(this.parrafos)
      //console.log(this.parrafoObj.titulo)
      this.buildForm();
    });

    
    /*
    this.frmEditProcedure = this._fb.group({
      EditTitle: this.parrafoObj.titulo
    });*/
    //this.load=true;
  }

  buildForm(){
    //console.log(this.parrafos)
    const controlArray = this.frmEditProcedure.get('formArrayName') as FormArray;
    controlArray.clear();
    Object.keys(this.parrafos).forEach((i) => {
      controlArray.push(
        this._fb.group({
          EditSubtitle: new FormControl({ value: this.parrafos[i].link , disabled: false}),
          EditParrafo: new FormControl({ value: this.parrafos[i].texto , disabled: false})
        })
      )
    });
    this.load = false;
    //console.log(controlArray.controls)
  }

  onSubmit(){
    this.load = true;
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    for(let i=0;i<a.length;i++){
      this.parrafos[i].link = this.frmEditProcedure.value.formArrayName[i].EditSubtitle;
      this.parrafos[i].texto = this.frmEditProcedure.value.formArrayName[i].EditParrafo
    }
    this.sendJsonID.estatus = this.parrafoObj.estatus;
    this.sendJsonID.id = this.parrafoObj.id;
    this.sendJsonID.titulo = this.titleProcedure;
    this.sendJsonID.parrafos = this.parrafos;
    console.log(this.sendJsonID);
    this.serviceViolence.updateViolence(this.parrafoObj.id,this.sendJsonID).subscribe(resp=>{
      if(resp.status){
        this.load = false;
        this.dialogRef.close();
      }
      else
      alert("No se pudo actualizar")
    });
  }

  addParrafo(){
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    //console.log(this.frmEditProcedure.value.formArrayName[0])
    for(let i=0;i<a.length;i++){
      this.parrafos[i].link = this.frmEditProcedure.value.formArrayName[i].EditSubtitle;
      this.parrafos[i].texto = this.frmEditProcedure.value.formArrayName[i].EditParrafo
    }/*
    this.parrafos.forEach((i) => {
      i.subtitulo = this.frmEditProcedure.value.formArrayName[Number(i)].EditSubtitle;
      i.texto = this.frmEditProcedure.value.formArrayName[Number(i)].EditParrafo;
    });*/
    let parrafo:Parrafos={
      link:'Subtitulo Anadido',
      texto:'Texto anadido'
    }
    //console.log(this.parrafos)
    //console.log(this.frmEditProcedure)
    this.parrafos.push(parrafo);
    //this.parrafos.push(parrafo);
    //console.log(this.parrafoObj);
    //console.log(this.parrafos.length);
    //this.dialogRef.close();
    //this.dialog.open(ProceduresDialog);
    this.buildForm();
  }

}
