import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { UserService } from '../services/user.service';
import { globalVariables } from '../shared/global-variable';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!:FormGroup
  resposeMessage!:any

  constructor(private fb:FormBuilder,private snackbar:OpensnackbarService,
    private user:UserService,private dialog:MatDialogRef<ForgotPasswordComponent>) { }

  ngOnInit(): void {
    this.forgotPasswordForm=this.fb.group({
      email:[null,[Validators.required,Validators.pattern(globalVariables.emailRegex)]]
    })

  }


  handleSubmit(){
    var formData=this.forgotPasswordForm.value;
    var data=
    {
      email:formData.email 
    }
    this.user.forgotPassword(data).subscribe((response:any)=>{
      this.resposeMessage=response?.message
      this.dialog.close()
      this.snackbar.openSnackBar(this.resposeMessage,'')

    })

  }

}
