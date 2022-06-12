import { Component, OnInit } from '@angular/core';
import { menuitems } from 'src/app/shared/menuItems';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
token:any=localStorage.getItem('token')
tokenPayload:any
  constructor(public menuitems:menuitems) {
    this.tokenPayload=jwt_decode(this.token)
   }

  ngOnInit(): void {
  }

}
