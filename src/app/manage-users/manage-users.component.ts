import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OpensnackbarService } from '../services/opensnackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
dataSource:any
displayedColumns:any[]=['name','contactNumber','email','status']
responseMessage:any
  constructor(private userser:UserService,private snackbar:OpensnackbarService) { }

  ngOnInit(): void {
    this.tableData()
  }
  tableData(){
    this.userser.getUsers().subscribe((res:any)=>{
      this.dataSource=new MatTableDataSource(res)
      

    })

  }
  applyFilter(event:Event){
    var filteredValue=(event.target as HTMLInputElement).value
    this.dataSource.filter=filteredValue.trim().toLocaleLowerCase()
  }
  onChange(status: any, id: any) {
    var data = {
      status: status.toString(),
      id: id
    }
    this.userser.updateUser(data).subscribe((res: any) => {
      this.responseMessage = res?.message
      this.snackbar.openSnackBar(this.responseMessage, 'success')
    })

  }

}
