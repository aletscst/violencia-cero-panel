import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListProcedures, ObjProcedures, objRespByID, objRespProcedures, Parrafo, reqDataProcedure } from 'src/app/models/procedures';
import { ProceduresService } from 'src/app/services/procedures.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.scss']
})
export class ProceduresComponent implements OnInit {

  public dataProcedures:ListProcedures;
  public frmProcedure: FormGroup;
  public parrafos:Parrafo[]=[{texto:'',subtitulo:''}];

  public sendJson:reqDataProcedure={
    titulo:'',
    parrafos:[{texto:'',subtitulo:''}]
  };

  public titleProcedure:String;
  public frmEditProcedure:FormGroup;
  public miarray:Parrafo[]=[];
  public emptyParrafo:boolean=true;

  constructor(private _fb: FormBuilder,private serviceProcedures:ProceduresService,public dialog: MatDialog) { 
    this.frmEditProcedure = new FormGroup({
      formArrayName: this._fb.array([])
      
    });
    //this.buildForm();
  }

  ngOnInit(): void {

    //this.parrafos=[{texto:'',subtitulo:''}];

    this.loadProcedure();
    this.buildForm();
  }

  loadProcedure(){
    this.serviceProcedures.getListProcedures().subscribe(resp=>{
      this.dataProcedures = resp.data;
      console.log(resp)
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
    console.log(obj);
    if(obj !== null && obj.length >0)
    this.emptyParrafo = false;
    else
    this.emptyParrafo = true;
  }

  addParrafo(value:any){
    console.log(this.frmEditProcedure.valid);
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    //this.parrafos[] this.frmEditProcedure.value;
    this.parrafos.forEach(element => {
      element.subtitulo = a.at(0).value.regSubtitle;
      element.texto = a.at(0).value.regParrafo;
    });
    
    let addParrafo:Parrafo={
      subtitulo:'',
      texto:''
    }
    this.parrafos.push(addParrafo);
    console.log(this.parrafos)
    this.buildForm();
    this.emptyParrafo = true;
  }

  SaveProcedure(){
    console.log(this.titleProcedure)
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    this.parrafos.forEach(element => {
      element.subtitulo = a.at(0).value.regSubtitle;
      element.texto = a.at(0).value.regParrafo;
    });
    this.sendJson.titulo = this.titleProcedure;
    this.sendJson.parrafos = this.parrafos;
    console.log(this.sendJson)
    this.serviceProcedures.addProcedure(this.sendJson).subscribe(resp=>{
        if(resp.status)
        this.loadProcedure();
        else
        alert("No se pudo guardar correctamente")
    });
  }

  openDialog(obj:any): void {
    //console.log(obj)
    const dialogRef = this.dialog.open(ProceduresDialog, {
      width: '100%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteProcedure(obj:any){
    this.serviceProcedures.deleteProcedure(obj.id).subscribe(resp=>{
      if(resp.status)
      this.loadProcedure();
      else
      alert("No se pudo eliminar correctamente");
    });
  }

}

@Component({
  selector: 'procedures-dialog',
  templateUrl: 'procedures-dialog.html',
  styleUrls: ['procedures-dialog.scss']
})
export class ProceduresDialog implements OnInit{

  public parrafoObj:objRespByID={
    id:0,
    estatus:'',
    titulo:'',
    parrafos:[{subtitulo:'',texto:''}]
  };
  public parrafos:Parrafo[];
  public load:boolean=false;
  public sendJsonID:objRespByID={
    estatus:'',
    id:0,
    parrafos:[{subtitulo:'',texto:''}],
    titulo:''
  };

  public titleProcedure:String='';
  public frmEditProcedure: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ListProcedures, private serviceProcedure:ProceduresService,private _fb: FormBuilder,private dialogRef: MatDialogRef<ProceduresDialog>,public dialog: MatDialog) 
  {
    this.frmEditProcedure = new FormGroup({
      formArrayName: this._fb.array([])
    });


  }
  
  ngOnInit(): void {

    this.serviceProcedure.getProcedurebyID(this.data.id).subscribe( resp =>{
      this.parrafoObj = resp; 
      this.parrafos = resp.parrafos;
      this.titleProcedure = this.parrafoObj.titulo;
      //console.log(this.parrafoObj)
      console.log(this.parrafos)
      console.log(this.parrafoObj.titulo)
      this.buildForm();
    });

    
    /*
    this.frmEditProcedure = this._fb.group({
      EditTitle: this.parrafoObj.titulo
    });*/
    this.load=true;
  }

  buildForm(){
    console.log(this.parrafos)
    const controlArray = this.frmEditProcedure.get('formArrayName') as FormArray;
    controlArray.clear();
    Object.keys(this.parrafos).forEach((i) => {
      controlArray.push(
        this._fb.group({
          EditSubtitle: new FormControl({ value: this.parrafos[i].subtitulo , disabled: false}),
          EditParrafo: new FormControl({ value: this.parrafos[i].texto , disabled: false})
        })
      )
    })
    //console.log(controlArray.controls)
  }

  onSubmit(){
    console.log(this.parrafoObj.id)
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    for(let i=0;i<a.length;i++){
      this.parrafos[i].subtitulo = this.frmEditProcedure.value.formArrayName[i].EditSubtitle;
      this.parrafos[i].texto = this.frmEditProcedure.value.formArrayName[i].EditParrafo
    }
    this.sendJsonID.estatus = this.parrafoObj.estatus;
    this.sendJsonID.id = this.parrafoObj.id;
    this.sendJsonID.titulo = this.titleProcedure;
    this.sendJsonID.parrafos = this.parrafos;
    console.log(this.sendJsonID);
    this.serviceProcedure.updateProcedure(this.parrafoObj.id,this.sendJsonID).subscribe(resp=>{
      if(resp.status)
      console.log("se ha actualizado")
      else
      alert("No se pudo actualizar")
    });
    //this.dialogRef.close();
  }

  addParrafo(){
    let a = this.frmEditProcedure.get('formArrayName') as FormArray;
    //console.log(this.frmEditProcedure.value.formArrayName[0])
    for(let i=0;i<a.length;i++){
      this.parrafos[i].subtitulo = this.frmEditProcedure.value.formArrayName[i].EditSubtitle;
      this.parrafos[i].texto = this.frmEditProcedure.value.formArrayName[i].EditParrafo
    }/*
    this.parrafos.forEach((i) => {
      i.subtitulo = this.frmEditProcedure.value.formArrayName[Number(i)].EditSubtitle;
      i.texto = this.frmEditProcedure.value.formArrayName[Number(i)].EditParrafo;
    });*/
    let parrafo:Parrafo={
      subtitulo:'Subtitulo Anadido',
      texto:'Texto anadido'
    }
    console.log(this.parrafos)
    console.log(this.frmEditProcedure)
    this.parrafos.push(parrafo);
    //this.parrafos.push(parrafo);
    //console.log(this.parrafoObj);
    //console.log(this.parrafos.length);
    //this.dialogRef.close();
    //this.dialog.open(ProceduresDialog);
    this.buildForm();
  }

}