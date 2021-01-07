import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin', title: 'Admin', icon: 'account_circle', class: ''},
  { path: '/dashboard', title: 'Raise Tickets', icon: 'assignment_turned_in', class: '' },
  { path: '/table-list', title: 'Open Tickets', icon: 'import_contacts', class: '' },
  { path: '/resolved-tickets', title: 'Resolved Tickets', icon: 'content_paste', class: '' },
  { path: '/closed-tickets', title: 'Closed Tickets', icon: 'cancel', class: '' },
  { path: '/open-alerts', title: 'All Alerts', icon: 'add_task', class: '' },
  { path: '/closed-alerts', title: 'Closed Alerts', icon: 'close_alert', class: '' },
  { path: '/typography', title: 'Charts', icon: 'library_books', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log("menuitem menu items", this.menuItems)
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
