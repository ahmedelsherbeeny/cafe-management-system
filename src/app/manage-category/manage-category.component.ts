import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryComponent } from '../material-component/dialog/category/category.component';
import { CategoryserviceService } from '../services/categoryservice.service';
import { OpensnackbarService } from '../services/opensnackbar.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
displayedColumns:string[]=['name','edit']
responseMessage:any
dataSource:any
  constructor(private catser:CategoryserviceService,private dialog:MatDialog,
    private router:Router,private snackbar:OpensnackbarService) { }

  ngOnInit(): void {
    this.getTableData()
  }
  getTableData(){
    this.catser.getCategories().subscribe((res:any)=>{
      this.dataSource=new MatTableDataSource(res)
    })
  }
  applyFilter(event:Event){
    let filteredVal=(event.target as HTMLInputElement).value
    this.dataSource.filter=filteredVal.trim().toLocaleLowerCase()
  }

  
  handleAddAction(){
    let dialogconfig=new MatDialogConfig()
    dialogconfig.data={
      action:"Add"
    }
    dialogconfig.width="850px"
    let dialogref=this.dialog.open(CategoryComponent,dialogconfig)
    this.router.events.subscribe((res:any)=>{
      dialogref.close()

    })
    let sub=dialogref.componentInstance.onAddEmiter.subscribe((res:any)=>{
      this.getTableData()
    })


  }
  handleEditAction(values:any){
    let dialogconfig=new MatDialogConfig()
    dialogconfig.data={

      action:"Edit",
      data:values
    }
    dialogconfig.width="850px"
    let dialogref=this.dialog.open(CategoryComponent,dialogconfig)
    this.router.events.subscribe((res:any)=>{
      dialogref.close()

    })
    let sub=dialogref.componentInstance.onEditEmiter.subscribe((res:any)=>{
      this.getTableData()
    })

  }



}
