import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Denuncia, denunciaObj, searchComplaint } from 'src/app/models/complaint-model';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { ComplaintDetailComponent } from '../complaint-detail/complaint-detail.component';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  public dataComplaints:Denuncia[]=[];
  public statusSelect:String;
  public statusData:String[]=[];
  public sendJsonSearch:searchComplaint={
    dateFin:'',
    dateIni:'',
    status:''
  };

  public statusNuevos:number=0;
  public statusCompletados:number=0;
  public statusCancelados:number=0;
  public statusProceso:number=0;

  public statusComplaint:String[]=[
    "NUEVO",
    "COMPLETADO",
    "CANCELADO",
    "PROCESO"
  ];
  public statusSearch:String;
  public dateIni:String='';
  public dateFin:String='';

  constructor(private serviceComplaint:ComplaintsService,private router:Router,private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceComplaint.getComplaints().subscribe(resp=>{
      this.dataComplaints = resp.data;
      //console.log(resp)
      this.dataComplaints.forEach(element => {
        this.statusData.push(element.estatus);
      });
      this.sumaEstatus(this.dataComplaints);
      //console.log(this.dataComplaints)
      //console.log(this.statusData)
    });
  }

  sumaEstatus(obj:Denuncia[]){
    this.statusNuevos = 0;
    this.statusCompletados = 0;
    this.statusCancelados = 0;
    this.statusProceso = 0;
    obj.forEach(element => {
      if(element.estatus === 'NUEVO')
      this.statusNuevos = this.statusNuevos + 1 ;
      if(element.estatus === 'COMPLETADO')
      this.statusCompletados = this.statusCompletados + 1 ;
      if(element.estatus === 'CANCELADO')
      this.statusCancelados = this.statusCancelados + 1 ;
      if(element.estatus === 'PROCESO')
      this.statusProceso = this.statusProceso + 1 ;
    });
  }

  searchComplaint(){
    this.sendJsonSearch.status = this.statusSearch;
    this.sendJsonSearch.dateIni = this.dateIni;
    this.sendJsonSearch.dateFin = this.dateFin;
    //console.log(this.sendJsonSearch);
    this.serviceComplaint.searchComplaints(this.sendJsonSearch).subscribe(resp=>{
      this.dataComplaints = resp.data;
      this.sumaEstatus(this.dataComplaints);
    }, error => alert('No se encontraron resultados'));

  }
  editStatus(statu:Denuncia){
    //console.log(statu);
    this.serviceComplaint.editComplaint(Number(statu.id),statu).subscribe(resp=>{
      if(resp.status)
      console.log("Se actualizo correctamente")
      else
      alert("No se pudo actualizar correctamente")
    })
    alert("Se Actualizo correctamente")
  }

  openComplaintDetail(obj): void {
    //console.log(obj);
    //let id = obj.id;
    //console.log(this.router.navigate(['/denuncia-detail/',{obj} ]));
    this.router.navigate(['denuncia-detail/'+obj]);
    //this.miruta.snapshot.params.obj.id;
    //obj = this.actRoute.snapshot.params.id;
    //console.log(obj)
  }

}
