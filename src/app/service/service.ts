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
// <<<<<<< HEAD
//   getrsv(id) {
//     return this.http.post(ApiService.API.GET_RSVDATA_ID + `/${id}`, id);
// =======
  // getrsv(id) {
  //   return this.http.get(ApiService.API.GET_RSVDATA_ID + '/' + id);
  // }
  getrsv(id){
    return this.http.post('http://localhost:5000/ticket/resolve',id)
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
  }
  postticket(data) {
    console.log(data, ApiService.API.POST_TICKET);
    return this.http.post('http://localhost:5000/ticket/create_ticket', data);
  }

  //RESOLVED TICKETS
  getresolvedtickets() {
    return this.http.get(ApiService.API.GET_RESOLVED_DATA);
  }

// <<<<<<< HEAD
//   getclose(id) {
//     return this.http.post(ApiService.API.GET_CLSDATA_ID + `/${id}` , id);
//   }
// =======
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
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b

  //CLOSED TICKETS
  getclosedtickets() {
    return this.http.get(ApiService.API.GET_CLOSED_DATA);
  }

  //OPEN ALERTS
  getallalerts() {
    return this.http.get(ApiService.API.GET_ALL_ALERTS_DATA);
  }
  saveAttendalert(data: any) {
    return this.http.put(ApiService.API.PUT_ATTENDALERT_ID,data);
  }

  saveResolvealert(data: any) {
    return this.http.post(ApiService.API.PUT_RESOLVEALERT_ID,data);
  }

  saveConfirmalert(data: any) {
    return this.http.post(ApiService.API.PUT_CONFIRMALERT_ID,data);
  }

  

  //CLOSED ALERTS
  getclosedalerts() {
    return this.http.get(ApiService.API.GET_CLOSED_ALERTS_DATA);
  }

  //TYPOGRAPHY
  getChartinfo() {
    return this.http.get(ApiService.API.GET_CHART_INFO);
  }

  //alerts charts
  // getalertChartinfo() {
  //   return this.http.get(ApiService.API.GETALERTS_CHARTINFO);
  // }
}
