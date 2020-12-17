import { environment } from '../../environments/environment';

export class ApiService {
  public static timer = 30000;
  public static API = {
    // DATA APT URL's
    GET_TABLE_DATA: environment.apiUrl + '/table_data',
    POST_TICKET:environment.apiUrl + '/post_ticket',

  }
}