import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageCategoryComponent } from 'src/app/manage-category/manage-category.component';
import { CategoryserviceService } from 'src/app/services/categoryservice.service';
import { OpensnackbarService } from 'src/app/services/opensnackbar.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
categoryForm:any=FormGroup
dialogAction:any
action:string="Add"
responseMessage:any
onAddEmiter=new EventEmitter()
onEditEmiter=new EventEmitter()
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private fb:FormBuilder,private catser:CategoryserviceService,
  private dialgref:MatDialogRef<CategoryComponent>,private snackbar:OpensnackbarService) { }

  ngOnInit(): void {
    this.categoryForm=this.fb.group({
      name:[null,[Validators.required]]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction="Edit";
      this.action="Update"
      this.categoryForm.patchValue(this.dialogData.data)

    }

  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.Edit()

    }
    else{
      this.Add()

    }
  }

  Add(){
    var formData=this.categoryForm.value
    var data={
      name:formData.name
    }
    this.catser.addCategory(data).subscribe((res:any)=>{
      this.dialgref.close()
      this.onAddEmiter.emit()
      this.responseMessage=res?.message
      this.snackbar.openSnackBar(this.responseMessage,'success')


    })


  }

  Edit(){
    var formData=this.categoryForm.value
    var data={
      id:this.dialogData.data.id,
      name:formData.name
    }
    this.catser.updateCategory(data).subscribe((res:any)=>{
      this.dialgref.close()
      this.onEditEmiter.emit()
      this.responseMessage=res?.message
      this.snackbar.openSnackBar(this.responseMessage,'success')


    })

  }

}
