import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-viewbillproducts',
  templateUrl: './viewbillproducts.component.html',
  styleUrls: ['./viewbillproducts.component.scss']
})
export class ViewbillproductsComponent implements OnInit {
  dataSourceOne:any
  dataSourceTwo:any
  data:any[]=[]
  displayedColumnsOne:any=['name','email','contactNumber','paymentMethod']
  displayedColumnsTwo:any=['name','category','price','quantity','total']


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any) { }

  ngOnInit(): void {
    this.data.push(this.dialogData.data)
    
    this.dataSourceOne=new MatTableDataSource(this.data)
    this.dataSourceTwo=new MatTableDataSource(JSON.parse(this.dialogData.data.productDetails))
  }

}
