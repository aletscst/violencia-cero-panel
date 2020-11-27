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
  public statusComplaint:String[]=[
    "Nuevo",
    "Completado",
    "Cancelado",
    "Proceso"
  ];
  public statusSearch:String;
  public dateIni:String='';
  public dateFin:String='';

  constructor(private serviceComplaint:ComplaintsService,private router:Router,private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceComplaint.getComplaints().subscribe(resp=>{
      this.dataComplaints = resp[0].data;
      console.log(resp)
      this.dataComplaints.forEach(element => {
        this.statusData.push(element.estatus);
      });
      console.log(this.dataComplaints)
      //console.log(this.statusData)
    })
  }

  searchComplaint(){
    this.sendJsonSearch.status = this.statusSearch;
    this.sendJsonSearch.dateIni = this.dateIni;
    this.sendJsonSearch.dateFin = this.dateFin;
    console.log(this.sendJsonSearch);
    this.serviceComplaint.searchComplaints(this.sendJsonSearch).subscribe(resp=>{
      this.dataComplaints = resp[0].data;
    });

  }
  editStatus(statu:string){
    console.log(statu);
    alert("Se Actualizo correctamente")
  }

  openComplaintDetail(obj): void {
    console.log(obj);
    //let id = obj.id;
    //console.log(this.router.navigate(['/denuncia-detail/',{obj} ]));
    this.router.navigate(['denuncia-detail/'+obj]);
    //this.miruta.snapshot.params.obj.id;
    //obj = this.actRoute.snapshot.params.id;
    //console.log(obj)
  }

}
