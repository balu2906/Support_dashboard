import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ApiService} from '../service/api.service'
@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }
//OPEN TICKETS
gettableData() {
    return this.http.get(ApiService.API.GET_TABLE_DATA);
  }
postticket(data) {
    console.log(data);
    return this.http.post(ApiService.API.POST_TICKET, data);
  }

  //RESOLVED TICKETS
  getresolvedtickets() {
    return this.http.get(ApiService.API.GET_RESOLVED_DATA);
  }

  //CLOSED TICKETS
  getclosedtickets() {
    return this.http.get(ApiService.API.GET_CLOSED_DATA);
  }

  //OPEN ALERTS
  getopenalerts() {
    return this.http.get(ApiService.API.GET_OPEN_ALERTS_DATA);
  }

  //CLOSED ALERTS
  getclosedalerts() {
     return this.http.get(ApiService.API.GET_CLOSED_ALERTS_DATA);
  }
}
