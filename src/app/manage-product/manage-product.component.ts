import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryComponent } from '../material-component/dialog/category/category.component';
import { ConfirmationComponent } from '../material-component/dialog/confirmation/confirmation.component';
import { ProductComponent } from '../product/product.component';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  dataSource: any
  responseMessage: any
  displayedColumns: string[] = ['name', 'description', 'price', 'categoryName', 'edit']
  constructor(private prodser: ProductServiceService, private router: Router, private dialog: MatDialog,
    private snackbar: OpensnackbarService) { }


  ngOnInit(): void {
    this.tableData()

  }
  tableData() {
    this.prodser.getProducts().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res)
    })

  }
  applyFilter(event: Event) {
    let filteredVal = (event.target as HTMLInputElement).value
    this.dataSource.filter = filteredVal.trim().toLocaleLowerCase()
  }
  handleAddAction() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = '850px'
    let dialogref = this.dialog.open(ProductComponent, dialogConfig)
    this.router.events.subscribe((res: any) => {
      dialogref.close()
    })
    let sub = dialogref.componentInstance.onAddEmitter.subscribe((res: any) => {
      this.tableData()

    })


  }
  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width = '850px'
    let dialogref = this.dialog.open(ProductComponent, dialogConfig)
    this.router.events.subscribe((res: any) => {
      dialogref.close()
    })
    let sub = dialogref.componentInstance.onEditEmitter.subscribe((res: any) => {
      this.tableData()

    })

  }
  handleDeleteAction(values: any) {
    const dilogconfig = new MatDialogConfig()
    dilogconfig.data = {
      message: 'delete ' + values.name + ' product'
    }
    const dialogref = this.dialog.open(ConfirmationComponent, dilogconfig)
    const sub = dialogref.componentInstance.onEmmitStatus.subscribe((res: any) => {
      this.deleteProduct(values.id)
      dialogref.close()



    })

  }
  deleteProduct(id: any) {
    this.prodser.delete(id).subscribe((res: any) => {

      this.tableData()
      this.responseMessage = res?.message
      this.snackbar.openSnackBar(this.responseMessage, 'success')

    })
  }
  onChange(status: any, id: any) {
    var data = {
      status: status.toString(),
      id: id
    }
    this.prodser.updateStatus(data).subscribe((res: any) => {
      this.responseMessage = res?.message
      this.snackbar.openSnackBar(this.responseMessage, 'success')
    })

  }


}
