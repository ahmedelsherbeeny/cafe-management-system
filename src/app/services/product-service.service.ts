import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
url=environment.apiUrl
  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get(this.url+'/product/get')
  }
  delete(id:any){
    return this.http.delete(this.url+'/product/delete/'+id)
  }
  updateStatus(data:any){
    return this.http.patch(this.url+'/product/updateStatus',data)
  }
  add(data:any){
    return this.http.post(this.url+'/product/add',data)

  }
  update(data:any){
    return this.http.patch(this.url+'/product/update',data)
  }
  getProductsByCategoryID(id:any){
    return this.http.get(this.url+'/product/getByCategory/'+id)
  }
  getProductByID(id:any){
    return this.http.get(this.url+'/product/getByProduct/'+id)
  }
  

}
