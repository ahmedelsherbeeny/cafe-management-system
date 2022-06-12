import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoaderServiceService } from '../loader/loader-service.service';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { UserService } from '../services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  mediasub!:Subscription

  constructor(private dialog:MatDialog,public loader:LoaderServiceService,
    private http:HttpClient,private router:Router,
    private mediaObserver:MediaObserver,private user:UserService,private dashser:DashboardServiceService) { }
 
  loading$=this.loader.loading$
  data:any




  ngOnInit(): void {

   
    if(localStorage.getItem('token')!= null){
      this.user.checkToken().subscribe((response:any)=>{
        this.router.navigate(['/cafe/dashboard'])

      },(error:any)=>{
        console.log(error)
      });
      
    }
    this.mediasub=this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias)

    })
   

    
  }
  ngOnDestroy(): void {
    this.mediasub.unsubscribe()
  }
  
  
  
 

}
