import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { globalVariables } from '../shared/global-variable';
import { OpensnackbarService } from './opensnackbar.service';


@Injectable()
export class HandleReqInterceptor implements HttpInterceptor {
  responseMessage:any

  constructor(private snackbarser:OpensnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req=request.clone({
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
    return next.handle(req).pipe(tap(     //tap here display the data and change nothing it is just manipulating it
      (event:any)=>{

      },
      (error:any)=>{
        if(error.error?.message){
          this.responseMessage=error.error?.message
        }
        else{
          this.responseMessage=globalVariables.genericError
          
        }
        this.snackbarser.openSnackBar(this.responseMessage,globalVariables.error)


      }
    )
    )
  }
}
