import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ApiService} from '../service/api.service'
@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }

gettableData() {
    return this.http.get(ApiService.API.GET_TABLE_DATA);
  }

postticket(data) {
    console.log(data);
    return this.http.post(ApiService.API.POST_TICKET, data);
  }
}
