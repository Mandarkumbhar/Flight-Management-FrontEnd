import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './httpclient.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private service:HttpClientService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("I am in the Interceptor");
    if (sessionStorage.getItem('userName') && sessionStorage.getItem('token')) {
        req = req.clone({
          setHeaders: {
            Authorization: sessionStorage.getItem('token')!
          }
        })
      }
      console.log("Request Modified");
      return next.handle(req);
    
  
}}