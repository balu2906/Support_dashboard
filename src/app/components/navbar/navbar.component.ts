import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { Service } from '../../service/service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


    private listTitles: any[];
    tableData: any = [];
    user: any;
    Opentickets: any = 0;
    ResovledTickets: any = 0;
    ClosedTickets: any = 0;

    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,
        private element: ElementRef,
        private router: Router,
        public Service: Service,) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.notification();
        this.user = localStorage.getItem('user')
        this.user = JSON.parse(this.user)

    }
    logout() {
        console.log("logging out...........")
        this.router.navigate(["/login"])
        localStorage.clear();
    }

    // profile(){

    // }
    notification() {
        this.Service.getChartinfo().subscribe((data: any) => {
            this.tableData = data
            console.log('tickets chart data displays hereeee', this.tableData);
            this.Opentickets = 0;
            this.ResovledTickets = 0;
            this.ClosedTickets = 0

            this.tableData.forEach(element => {
                if (!element.status) {
                    this.Opentickets++
                } else if (element.status === 1) {
                    this.ResovledTickets++
                } else if (element.status === 2) {
                    this.ClosedTickets++
                }
            });
        })
    }


}
