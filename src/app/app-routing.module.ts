import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AddMakerComponent } from './components/cares-center/add-maker/add-maker.component';
import { CaresCenterComponent } from './components/cares-center/cares-center.component';
import { ComplaintDetailComponent } from './components/complaint-detail/complaint-detail.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { ContactsEmergencyComponent } from './components/contacts-emergency/contacts-emergency.component';
import { HomeComponent } from './components/home/home.component';
import { InformationViolenceComponent } from './components/information-violence/information-violence.component';
import { LoginComponent } from './components/login/login.component';
import { ProceduresComponent } from './components/procedures/procedures.component';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent },
  { path:'contacts',component:ContactsEmergencyComponent},
  { path:'procedures',component:ProceduresComponent},
  { path:'complaint',component:ComplaintComponent},
  { path:'information',component:InformationViolenceComponent},
  { path:'care-center',component:CaresCenterComponent},
  { path:'care-center/add-marker/:id',component:AddMakerComponent},
  { path:'denuncia-detail/:id',component:ComplaintDetailComponent},
  { path:'home', component:HomeComponent, /*canActivate:[AuthGuard]*/},
  { path:'**', component:LoginComponent, /*canActivate:[AuthGuard]*/}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
