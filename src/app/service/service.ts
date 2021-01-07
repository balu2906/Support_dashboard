import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiService } from '../service/api.service'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }
  //OPEN TICKETS
  gettableData() {
    return this.http.get(ApiService.API.GET_TABLE_DATA);
  }

  
  postresolve(data){
    return this.http.post('http://localhost:5000/ticket/resolve',data);

  }
  postticket(data) {
    console.log(data, ApiService.API.POST_TICKET);
    return this.http.post('http://localhost:5000/ticket/create_ticket', data);
  }

  //admincomponent
  getteammembers() {
    return this.http.get(ApiService.API.GET_TEAM_MEMBERS);
  }
  postteammember(data) {
    return this.http.post(ApiService.API.POST_TEAM_MEMBER, data);
  }
  postdelete(data) {
    return this.http.post(ApiService.API.POST_DELETE, data);
  }
  postalert(data) {
    console.log("alerting data ", data, ApiService.API.POST_ALERT);
    return this.http.post(ApiService.API.POST_ALERT, data);
  }

  //RESOLVED TICKETS
  getresolvedtickets() {
    return this.http.get(ApiService.API.GET_RESOLVED_DATA);
  }

  getclose(data){
    return this.http.post('http://localhost:5000/ticket/close',data)

  }

  //CLOSED TICKETS
  getclosedtickets() {
    return this.http.get(ApiService.API.GET_CLOSED_DATA);
  }

  //OPEN ALERTS
  getallalerts() {
    return this.http.get(ApiService.API.GET_ALL_ALERTS_DATA);
  }
  saveAttendalert(alertId, data) {
    return this.http.post(ApiService.API.PUT_ATTENDALERT_ID + `/${alertId}`, data);
  }

  saveResolvealert(alertId, data) {
    return this.http.post(ApiService.API.PUT_RESOLVEALERT_ID + `/${alertId}`, data);
  }

  saveConfirmalert(alertId) {
    return this.http.post(ApiService.API.PUT_CONFIRMALERT_ID + `/${alertId}`,{});
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
