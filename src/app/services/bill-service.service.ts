import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillServiceService {
  url=environment.apiUrl

  constructor(private http:HttpClient) { }
  generateReport(data:any){
    return this.http.post(this.url+'/bill/generateReport',data)
  }
  getPdf(data:any):Observable<Blob>{
    return this.http.post(this.url+'/bill/getPdf',data,{responseType:'blob'});
  }
  getBills(){
    return this.http.get(this.url+'/bill/getBills')
  }
  deleteBill(id:any){
    return this.http.delete(this.url+'/bill/deleteBill/'+id)

  }


}
