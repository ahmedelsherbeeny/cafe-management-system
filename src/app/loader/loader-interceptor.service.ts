import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderServiceService } from './loader-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  

  constructor(public loader:LoaderServiceService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loader.show();


    return next.handle(request).pipe(
      finalize(()=>{
        setTimeout(() => {
          this.loader.hide()
        }, 3000);

      })
    )
  }
}
