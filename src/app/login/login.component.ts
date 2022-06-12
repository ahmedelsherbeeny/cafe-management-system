import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { UserService } from '../services/user.service';
import { globalVariables } from '../shared/global-variable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
logInForm!:FormGroup
responseMessage!:any
  constructor(private fb:FormBuilder,private snackbar:OpensnackbarService,
    private user:UserService,private dialog:MatDialogRef<LoginComponent>,private router:Router) { }

    ngOnInit(): void {
      this.logInForm=this.fb.group({
        email:[null,[Validators.required,Validators.pattern(globalVariables.emailRegex)]],
        password:[null,[Validators.required]]


      })
  
    }
    handleSubmit(){
      var formData=this.logInForm.value;
      var data=
      {
        email:formData.email,
        password:formData.password 
      }
      this.user.logIn(data).subscribe((response:any)=>{
        this.dialog.close()
        localStorage.setItem('token',response.token)

        this.router.navigate(['/cafe/dashboard'])

  
      })
  
    }

}
