import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, RegisterDialog } from './components/login/login.component';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Angular material */ 

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

/*  */
import { ContactsEmergencyComponent, ContactEditDialog } from './components/contacts-emergency/contacts-emergency.component';
import { ProceduresComponent,ProceduresDialog } from './components/procedures/procedures.component';
import { ComplaintComponent } from './components/complaint/complaint.component';
import { InformationViolenceComponent, InformationViolence } from './components/information-violence/information-violence.component';
import { CaresCenterComponent } from './components/cares-center/cares-center.component';
import { AddMakerComponent } from './components/cares-center/add-maker/add-maker.component';
import { ComplaintDetailComponent } from './components/complaint-detail/complaint-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { respLogin } from './models/login-model';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './components/interceptor/token-interceptor';

export function jwtTokenGetter(){
  const user:respLogin = JSON.parse(localStorage.getItem('user'));
  return  user.token;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterDialog,
    AsideMenuComponent,
    HomeComponent,
    ContactsEmergencyComponent,
    ContactEditDialog,
    ProceduresComponent,
    ProceduresDialog,
    ComplaintComponent,
    InformationViolenceComponent,
    InformationViolence,
    CaresCenterComponent,
    AddMakerComponent,
    ComplaintDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  entryComponents: [
    ContactEditDialog,
    ProceduresDialog,
    InformationViolence
 ],
  bootstrap: [AppComponent],
})
export class AppModule { }
