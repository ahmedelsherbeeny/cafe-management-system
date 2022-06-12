import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { UserService } from '../services/user.service';
import { globalVariables } from '../shared/global-variable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup
  responseMessage!:string

  constructor(private fb:FormBuilder,private userservise:UserService,
    private dialogref:MatDialogRef<SignupComponent>,private snackbarser:OpensnackbarService,private router:Router) { }
  

  ngOnInit(): void {
   this.signupForm= this.fb.group({
     name:[null,[Validators.required,Validators.pattern(globalVariables.nameRegex)]],
     email:[null,[Validators.required,Validators.pattern(globalVariables.emailRegex)]],
     contactNumber:[null,[Validators.required,Validators.pattern(globalVariables.contactNumberRegex)]],
     password:[null,[Validators.required]]

    })
  }
  handleSubmit(){
    var formData=this.signupForm.value;
    var data=
    {
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password
    }
    this.userservise.signUp(data).subscribe((response:any)=>{
      console.log(response)
      this.dialogref.close()
      this.responseMessage=response?.message
      this.snackbarser.openSnackBar(this.responseMessage,'');
      this.router.navigate(['/'])


    })
  }
  

}
