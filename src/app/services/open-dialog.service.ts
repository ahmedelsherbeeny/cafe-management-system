import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(private dialog:MatDialog) { }
  openComponent(width:string,component:any){
    const dialogConfig=new MatDialogConfig();

    dialogConfig.width=width
    this.dialog.open(component,dialogConfig)

  }
}
