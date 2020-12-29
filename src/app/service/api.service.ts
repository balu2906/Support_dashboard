import { environment } from '../../environments/environment';

export class ApiService {
  public static API = {
    //GET 
    GET_TABLE_DATA: environment.apiUrl + '/ticket/open_tickets',
    GET_RSVDATA_ID: environment.apiUrl + '/ticket/resolve',
    GET_CLSDATA_ID: environment.apiUrl + '/ticket/close',
    GET_RESOLVED_DATA: environment.apiUrl + '/ticket/resolved_tickets',
    GET_CLOSED_DATA: environment.apiUrl + '/ticket/closed_tickets',
    GET_ALL_ALERTS_DATA: environment.apiUrl + '/alerts/all-alerts',
    PUT_ATTENDALERT_ID: environment.apiUrl + '/alerts/attend_alert',
    PUT_RESOLVEALERT_ID: environment.apiUrl + '/alerts/resolve',
    PUT_CONFIRMALERT_ID: environment.apiUrl + '/alerts/confirm_alert',
    GET_CLOSED_ALERTS_DATA: environment.apiUrl + '/alerts/closed_alerts',
    GET_CHART_INFO: environment.apiUrl + '/ticket/alltickets',
    // GETALERTS_CHARTINFO: environment.apiUrl + '/alerts'


    //POST
    POST_TICKET: environment.apiUrl + '/ticket/create_ticket',
  }
}