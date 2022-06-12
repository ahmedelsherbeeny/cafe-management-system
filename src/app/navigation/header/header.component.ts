import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForgotPasswordComponent } from 'src/app/forgot-password/forgot-password.component';
import { LoaderServiceService } from 'src/app/loader/loader-service.service';
import { LoginComponent } from 'src/app/login/login.component';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';
import { OpenDialogService } from 'src/app/services/open-dialog.service';
import { SignupComponent } from 'src/app/signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mediasub!:Subscription
  devicexs!:boolean
  @Output() toggleSideBar:EventEmitter<any>=new EventEmitter()


  constructor(private dialogser:OpenDialogService,public loader:LoaderServiceService,
    private http:HttpClient,private mediaObserver:MediaObserver,public router:Router,private dialog:MatDialog) { }
    loading$=this.loader.loading$


  ngOnInit(): void {
    this.mediasub=this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      console.log(result.mqAlias)
      this.devicexs=result.mqAlias==='xs'?true:false


    })
    
  }
  ngOnDestroy(): void {
    this.mediasub.unsubscribe()
  }
  toggle(){
    this.toggleSideBar.emit()
  }
  signupAction(){
    this.dialogser.openComponent('550px',SignupComponent)
  }
  forgotPasswordAction(){
    this.dialogser.openComponent('550px',ForgotPasswordComponent)


  }
  logIn(){
    this.dialogser.openComponent('550px',LoginComponent)


  }
  changepass(){
    this.dialogser.openComponent('550px',ChangePasswordComponent)

  }
  logOut(){
    const dialogconfig=new MatDialogConfig()
    dialogconfig.data={
      message:'log out'
    }
    const dialogref=this.dialog.open(ConfirmationComponent,dialogconfig)
    dialogref.componentInstance.onEmmitStatus.subscribe((user:any)=>{
      dialogref.close()
      localStorage.clear()
      this.router.navigate(['/'])
    })

  }

}
