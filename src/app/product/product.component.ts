import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryserviceService } from '../services/categoryservice.service';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { ProductServiceService } from '../services/product-service.service';
import { globalVariables } from '../shared/global-variable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  onAddEmitter=new EventEmitter()
  onEditEmitter=new EventEmitter()
  action:string='Add'
  dialogAction:string=''
  responseMessage:any
  productForm:any=FormGroup
  categories:any[]=[]


  constructor(private prodser:ProductServiceService,private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData:any,private catser:CategoryserviceService,
    private dialogref:MatDialogRef<ProductComponent>,private snackbar:OpensnackbarService) { }

  ngOnInit(): void {
    this.productForm=this.fb.group({
      name:[null,[Validators.required,Validators.pattern(globalVariables.nameRegex)]],
      description:[null,Validators.required],
      categoryID:[null,[Validators.required]],
      price:[null,[Validators.required]]
    })
    if(this.dialogData.action==='Edit'){
      this.dialogAction='Edit'
      this.action='Update'
      this.productForm.patchValue(this.dialogData.data)
      
      
    }
    this.getCategories()

   
  }
  getCategories(){
    this.catser.getCategories().subscribe((res:any)=>{
      this.categories=res

    })
  }
  handleSubmit(){
    if(this.dialogAction==='Edit'){
      this.Edit()
    }
    else{
      this.Add()
    }
  }
  Add() {
    var formData=this.productForm.value
    
    var data={
      
      name:formData.name,
      description:formData.description,
      price:formData.price,
      categoryID:formData.categoryID
    }
    this.prodser.add(data).subscribe((res:any)=>{
      this.dialogref.close()
      this.onAddEmitter.emit()
      this.responseMessage=res?.message
      this.snackbar.openSnackBar(this.responseMessage,'success')
    })
  }
  Edit() {
    var formData=this.productForm.value
    
    var data={
      id:this.dialogData.data.id,
      name:formData.name,
      description:formData.description,
      price:formData.price,
      categoryID:formData.categoryID
    }
    this.prodser.update(data).subscribe((res:any)=>{
      this.dialogref.close()
      this.onEditEmitter.emit()
      this.responseMessage=res?.message
      this.snackbar.openSnackBar(this.responseMessage,'success')
    })
  }

  

  
 

}
