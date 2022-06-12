import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { LoaderServiceService } from '../loader/loader-service.service';
import { BillServiceService } from '../services/bill-service.service';
import { CategoryserviceService } from '../services/categoryservice.service';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { ProductServiceService } from '../services/product-service.service';
import { globalVariables } from '../shared/global-variable';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  displayedColumns: any[] = ['name', 'category', 'price', 'quantity', 'total', 'edit']
  dataSource: any = []
  manageOrderForm!: FormGroup
  categories: any[] = []
  products: any[] = []
  price: any
  totalAmount: any=0
  responseMessage: any

  constructor(private fb: FormBuilder, private catser: CategoryserviceService,
    private billser: BillServiceService,
    private snackbar: OpensnackbarService,
    private prodser: ProductServiceService, private loader: LoaderServiceService) { }

  ngOnInit(): void {
   
    this.getCategories()
    this.manageOrderForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(globalVariables.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(globalVariables.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(globalVariables.contactNumberRegex)]],
      paymentMethod: [null, [Validators.required]],
      category: [null, [Validators.required]],
      product: [null, [Validators.required]],
      price: [ , [Validators.required]],
      quantity: [null, [Validators.required]],
      total: [0 , [Validators.required]]

    })
  }
  getCategories() {
    this.catser.getCategories().subscribe((res: any) => {
      this.categories = res
    })

  }
  getProductsByCategoryID(value: any) {
    this.prodser.getProductsByCategoryID(value.id).subscribe((res: any) => {
      this.loader.hide()

      this.products = res
      console.log(res)
      this.manageOrderForm.controls['quantity'].setValue('')
      this.manageOrderForm.controls['total'].setValue(0)

    })
  }
  getProductDetails(value: any) {
    this.prodser.getProductByID(value.id).subscribe((res: any) => {
      this.loader.hide()
      this.price = res[0].price





      this.manageOrderForm.controls['price'].setValue(res[0].price)
      this.manageOrderForm.controls['quantity'].setValue('1')
      this.manageOrderForm.controls['total'].setValue(this.price * 1)





    })
  }
  setQuantity() {
    var temp = this.manageOrderForm.controls['quantity'].value
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value *
        this.manageOrderForm.controls['price'].value)
    }
    else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1')
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value *
        this.manageOrderForm.controls['price'].value)




    }
    
  }
  
  validateProductAdd() {
    if (this.manageOrderForm.controls['total'].value === 0 ||
      this.manageOrderForm.controls['total'].value === null ||
      this.manageOrderForm.controls['quantity'].value <= 0)

      return true

    else

      return false

  }
  
  validateSubmit() {
    if (this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null ||
      this.manageOrderForm.controls['email'].value === null || this.manageOrderForm.controls['contactNumber'].value === null ||
      this.manageOrderForm.controls['paymentMethod'].value === null || !(this.manageOrderForm.controls['contactNumber'].valid) ||
      !(this.manageOrderForm.controls['email'].valid))
      return true

    else

      return false
  }
  
  add() {
    var formData = this.manageOrderForm.value
    var productName = this.dataSource.find((e: { id: number; }) => e.id == formData.product.id)
    if (productName == undefined) {
      this.totalAmount=this.totalAmount + formData.total
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total

      })
      this.dataSource = [...this.dataSource]
      this.snackbar.openSnackBar(globalVariables.productAdded, 'success')
      

    }
    else {
      this.snackbar.openSnackBar(globalVariables.productExistError, globalVariables.error)

    }



  }
  handleDeleteAction(value: any, element: any) {
    this.totalAmount = this.totalAmount - element.total
    this.dataSource.splice(value, 1)
    this.dataSource = [...this.dataSource]


  }
  submitAction() {
    var formData = this.manageOrderForm.value
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      total: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource)
    }
    this.billser.generateReport(data).subscribe((res: any) => {
      this.downloadFile(res?.uuid)
      this.manageOrderForm.reset()
      this.dataSource = []
      this.totalAmount = 0
    })


  }
  downloadFile(filename: any) {
    var data = {
      uuid: filename
    }
    this.billser.getPdf(data).subscribe((res: any) => {
      saveAs(res,filename+'.pdf')
    })
  }

}
