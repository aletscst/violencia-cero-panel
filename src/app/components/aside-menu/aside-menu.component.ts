import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {

  showFiller = false;
  constructor(public router: Router, public authService:LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
