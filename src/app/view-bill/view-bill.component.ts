import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { ConfirmationComponent } from '../material-component/dialog/confirmation/confirmation.component';
import { BillServiceService } from '../services/bill-service.service';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { ViewbillproductsComponent } from '../viewbillproducts/viewbillproducts.component';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  constructor(private billser: BillServiceService, private dialog: MatDialog, private router: Router, private snakbar: OpensnackbarService) { }
  displayedColumns: any[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'view']
  responseMessage: any
  dataSource: any

  ngOnInit(): void {
    this.tableData()

  }
  tableData() {
    this.billser.getBills().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res)



    })

  }
  applyFilter(event: Event) {
    var filteredValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filteredValue.trim().toLocaleLowerCase()

  }
  handleViewAction(values: any) {
    const matdialgconfig = new MatDialogConfig()
    matdialgconfig.data = {
      data: values
    }
    matdialgconfig.width = '100%'
    const dialoref = this.dialog.open(ViewbillproductsComponent, matdialgconfig)
    this.router.events.subscribe(() => {
      dialoref.close()
    })


  }
  handleDownloadAction(element: any) {
    var data = {
      name: element.name,
      email: element.email,
      contactNumber: element.contactNumber,
      paymentMethod: element.paymentMethod,
      total: element.total,
      productDetails: element.productDetails
    }

    this.billser.generateReport(data).subscribe((res: any) => {
      this.downloadFile(res?.uuid)
    })
  }

  handleDeleteAction(element: any) {
    const dialogconfic = new MatDialogConfig()
    dialogconfic.data = {
      message: 'delete ' + element.name + ',s bill'
    }
    const dialogref = this.dialog.open(ConfirmationComponent, dialogconfic)
    const sub = dialogref.componentInstance.onEmmitStatus.subscribe((res: any) => {
      this.deleteIt(element.id)
      dialogref.close()
    })

  }
  downloadFile(filename: any) {
    var data = {
      uuid: filename
    }
    this.billser.getPdf(data).subscribe((res: any) => {
      saveAs(res, filename + '.pdf')
    })


  }

  deleteIt(id: any) {
    this.billser.deleteBill(id).subscribe((res: any) => {
      this.responseMessage = res?.message
      this.tableData()
      this.snakbar.openSnackBar(this.responseMessage, 'success')

    })
  }

}

