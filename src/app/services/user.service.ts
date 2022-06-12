import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
url=environment.apiUrl
  constructor(private http:HttpClient) { }
  signUp(data:any){
    return this.http.post(this.url+"/user/signup",data)
  }
  forgotPassword(data:any){
    return this.http.post(this.url+'/user/forgotPassword',data)
  }
  logIn(data:any) {
    return this.http.post(this.url+'/user/login',data)


  }
  checkToken(){
    return this.http.get(this.url+'/user/checkToken')
  }
  changePassword(data:any){
    return this.http.post(this.url+'/user/changePassword',data)
  }
  getUsers(){
   return this.http.get(this.url+'/user/get')
  }
  updateUser(data:any){
    return this.http.patch(this.url+'/user/update',data)
  }

}
