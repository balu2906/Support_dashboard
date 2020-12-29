import { environment } from '../../environments/environment';

export class ApiService {
  public static API = {
    //GET 
    GET_TABLE_DATA: environment.apiUrl + '/ticket/open_tickets',
    GET_RSVDATA_ID: environment.apiUrl + '/ticket/resolve',
    GET_CLSDATA_ID:environment.apiUrl + '/ticket/close',
    GET_RESOLVED_DATA: environment.apiUrl + '/ticket/resolved_tickets',
    GET_CLOSED_DATA: environment.apiUrl + '/ticket/closed_tickets',
    GET_OPEN_ALERTS_DATA: environment.apiUrl + '/open_alerts_data',
    GET_CLOSED_ALERTS_DATA: environment.apiUrl + '/closed_alerts_data',
    GET_CHART_INFO : environment.apiUrl + '/covidinfo',


    //POST
    POST_TICKET: environment.apiUrl + '/ticket/create_ticket',

    //post popup
    POST_POPUP:environment.apiUrl +'/ticket/close',
  }
}