import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { respData } from 'src/app/models/complaint-model';
import { ComplaintsService } from 'src/app/services/complaints.service';

@Component({
  selector: 'app-complaint-detail',
  templateUrl: './complaint-detail.component.html',
  styleUrls: ['./complaint-detail.component.scss']
})
export class ComplaintDetailComponent implements OnInit {

  public product_id: string;
  public dataResp:respData={
    denunciado:{
      apellidoMaterno:'',
      apellidoPaterno:'',
      codigoPostal:'',
      domicilio:'',
      edad:0,
      genero:'',
      id:0,
      idDenuncia:0,
      nombres:'',
      ocupacion:'',
      parentesco:'',
      tipoViolencia:''
    },
    descripcionProblema:'',
    estatus:'',
    fechaSolicitud:'',
    id:0,
    idUsusario:0,
    tipoAyuda:'',
    solicitante:{
      apellidoMaterno:'',
      apellidoPaterno:'',
      codigoPostal:'',
      domicilio:'',
      edad:0,
      edoCivil:'',
      escolaridad:'',
      genero:'',
      id:0,
      idDenuncia:0,
      lugarNacimiento:'',
      nombres:'',
      ocupacion:'',
      telefono:''
    }
  };
  public load:boolean=true;

  constructor(private actRoute: ActivatedRoute,private serviceDenuncia:ComplaintsService) {
    this.product_id = this.actRoute.snapshot.params.id;
    //console.log(this.product_id)
   }

  ngOnInit(): void {
    this.serviceDenuncia.getCompaintID(Number(this.product_id)).subscribe(resp=>{
      this.dataResp = resp;
      this.load = false;
    });
  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const DATA2 = document.getElementById('htmlData2');
    const DATA3 = document.getElementById('htmlData3');
    //console.log(DATA)
    //console.log(DATA2)
    //console.log(DATA3)

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 2
    };
    html2canvas(DATA,options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    });
    html2canvas(DATA2,options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 250;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    });
    html2canvas(DATA3,options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 440;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      //doc.addPage();
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save('Denuncia.pdf');
    });
  }
}
