import { environment } from '../../environments/environment';

export class ApiService {
  public static API = {
    //GET 
    GET_TABLE_DATA: environment.apiUrl + '/table_data',
    GET_RESOLVED_DATA: environment.apiUrl + '/resolved_data',
    GET_CLOSED_DATA: environment.apiUrl + '/closed_data',
    GET_OPEN_ALERTS_DATA: environment.apiUrl + '/open_alerts_data',
    GET_CLOSED_ALERTS_DATA: environment.apiUrl + '/closed_alerts_data',

    //POST
    POST_TICKET: environment.apiUrl + '/post_ticket',
  }
}