import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from '../service/api.service'
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }
  //OPEN TICKETS
  gettableData() {
    return this.http.get(ApiService.API.GET_TABLE_DATA);
  }
  // getrsv(id) {
  //   return this.http.get(ApiService.API.GET_RSVDATA_ID + '/' + id);
  // }
  getrsv(id){
    return this.http.post('http://localhost:5000/ticket/resolve',id)
  }
  postticket(data) {
    console.log(data, ApiService.API.POST_TICKET);
    return this.http.post('http://localhost:5000/ticket/create_ticket', data);
  }

  //RESOLVED TICKETS
  getresolvedtickets() {
    return this.http.get(ApiService.API.GET_RESOLVED_DATA);
  }

  // getclose(id) {
  //   return this.http.get(ApiService.API.GET_CLSDATA_ID + '/' + id);
  // }
  getclose(data){
    return this.http.post('http://localhost:5000/ticket/close',data)
  }
  //post resolved popup
  // postpopup(popup:any):Observable<any>{
  //   console.log("entered");
  //   return this.http.post('http://localhost:5000/ticket/close',popup)
  // }

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

  //TYPOGRAPHY
  getChartinfo() {
    return this.http.get(ApiService.API.GET_CHART_INFO);
  }
}
