import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryserviceService {
 url=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getCategories(){
   return this.http.get(this.url+'/category/get')
  }
  addCategory(data:any){
    return this.http.post(this.url+'/category/add',data)
  }
  updateCategory(data:any){
     return this.http.patch(this.url+'/category/update',data)
  }
}
