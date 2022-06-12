import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OpensnackbarService } from 'src/app/services/opensnackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any = FormGroup
  formData: any
  responseMessage: any
  constructor(private fb: FormBuilder, private user: UserService, private snackbar: OpensnackbarService, public dialogref: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })

  }
  handleConfirm() {
    if (this.changePasswordForm.controls['confirmPassword'].value != this.changePasswordForm.controls['newPassword'].value) {
      return true;
    }
    else {
      return false
    }
  }
  handleChange() {
    this.formData = this.changePasswordForm.value
    var data = {
      password: this.formData.oldPassword,
      newPassword: this.formData.newPassword,
      confirmPassword: this.formData.confirmPassword
    }
    this.user.changePassword(data).subscribe((response: any) => {
      this.responseMessage = response?.message
      this.dialogref.close()
      this.snackbar.openSnackBar(this.responseMessage, 'success')



    })


  }

}
