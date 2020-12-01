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
import { LoginComponent, RegisterDialog } from './components/login/login.component';
import { ProceduresComponent } from './components/procedures/procedures.component';

import { AuthGuard } from './guards/auth.guard'
const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full'},
  { path:'login', component:LoginComponent },
  { path:'contacts',component:ContactsEmergencyComponent,canActivate:[AuthGuard]},
  { path:'procedures',component:ProceduresComponent,canActivate:[AuthGuard]},
  { path:'complaint',component:ComplaintComponent,canActivate:[AuthGuard]},
  { path:'information',component:InformationViolenceComponent,canActivate:[AuthGuard]},
  { path:'care-center',component:CaresCenterComponent,canActivate:[AuthGuard]},
  { path:'care-center/add-marker/:id',component:AddMakerComponent,canActivate:[AuthGuard]},
  { path:'denuncia-detail/:id',component:ComplaintDetailComponent,canActivate:[AuthGuard]},
  { path:'Roboto', component:RegisterDialog, canActivate:[AuthGuard]},
  { path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  { path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
