import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import {Service} from './service/service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor( private Injector:Injector) { }

  intercept(req,next){
    let authservice =this.Injector.get(Service)
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `bearer ${authservice.gettoken()}`
      }

    })
    return next.handle(tokenizedReq)
  }
}
