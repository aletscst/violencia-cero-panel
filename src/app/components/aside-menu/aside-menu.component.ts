import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MAT_DRAWER_CONTAINER } from '@angular/material/sidenav/drawer';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {

  showFiller = false;
  @ViewChild('drawer') sidenav: MatSidenav;
  constructor(public router: Router,private servLogin:LoginService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.sidenav.toggle();
    this.servLogin.logout();
    this.router.navigate(['login']);
  }

}
