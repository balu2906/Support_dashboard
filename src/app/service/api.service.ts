import { environment } from '../../environments/environment';

export class ApiService {
  public static API = {
    //LOGOUT
    GET_LOGOUT: environment.apiUrl + '/logout',
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
    //LOGIN
    POST_LOGIN_DATA: environment.apiUrl + '/login',
    //ADMIN
    GET_TEAM_MEMBERS_ADMIN: environment.apiUrl + '/admin/get_team_admin',
    // support
    GET_TEAM_MEMBERS: environment.apiUrl + '/admin/get_team',
    //create teammember
    POST_TEAM_MEMBER: environment.apiUrl + '/admin/create_team',
    POST_DELETE: environment.apiUrl + '/admin/delete_teammembers',

    //POST
    POST_TICKET: environment.apiUrl + '/ticket/create_ticket',

    //post popup
    POST_POPUP: environment.apiUrl + '/ticket/close',
    POST_ALERT: environment.apiUrl + '/alerts/create_m_alerts',

    //POST FEEDBACK
    POST_FEEDBACK: environment.apiUrl + '/rate_us/:email',

    //RATINGS
    GET_RATINGS: environment.apiUrl + '/admin/get_ratings'
  }
}