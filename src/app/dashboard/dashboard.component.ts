import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import * as $ from 'jquery';
import * as Chartist from 'chartist';
import { Router } from "@angular/router"

declare var jQuery: any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  AlertchartOptions: Highcharts.Options;
  names: any = [];
  ChartData: any = [];
  AlertChartData: any = [];
  tableData: any = [];
  alertsData: any = [];
  response = false;
  showSpinner: boolean = false;



  mobilenumber = "^(\\+\\d{1,3}[- ]?)?\\d{10}$";
  profileForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    mobilenumber: ['', [Validators.required, Validators.pattern(this.mobilenumber)]],
    email: ['', Validators.required],
    problemtype: ['select', Validators.required],
    assignee: ['select', Validators.required],
    description: ['', Validators.required]
  });
  name: any;
  email: any;
  password: any;
  teammembers: any;


  constructor(private _router: Router, public Service: Service, private toastr: ToastrService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getChartinfo();
    this.getalertChartinfo();
    this.getteammembers();
    var auth = localStorage.getItem('token')
    console.log("existing users ", auth);
    if (!auth) {
      this._router.navigate(["/login"])
    }
  }
  getteammembers() {
    this.showSpinner = true
    this.Service.getteammembers().subscribe(data => {
      this.showSpinner = false;
      console.log(this.showSpinner)
      this.teammembers = data;
      console.log("getteammembersssssssss", data);
    }, err => {
      console.log("ERROR IN TEAM MEMBERS DATAAAA");
    })
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }

  get f() {
    return this.profileForm.controls;
  }

  loading_spinner: Boolean = false;
  postticket() {
    this.loading_spinner = true;
    console.log(this.profileForm.value, this.profileForm.get('username').value);
    const userData = {
      name: this.profileForm.get('username').value,
      mobileNumber: this.profileForm.get('mobilenumber').value,
      email: this.profileForm.get('email').value,
      problemtype: this.profileForm.get('problemtype').value,
      assignee: this.profileForm.get('assignee').value,
      description: this.profileForm.get('description').value,
    }
    this.Service.postticket(userData).subscribe(userData => {
      console.log("userdata is hereeeeeeeeeeeee", userData);
      let userInfo: any = userData;
      this.toastr.success(userInfo.message);
      this.loading_spinner = false;

    }, err => {
      console.log("error", err);

      this.toastr.error(err.error.message);

    })
  }
  getChartsList() {
    this.chartOptions = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Tickets'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          colors: ['#699100', '#007D91', '#FF0000'],
          allowPointSelect: true,
          cursor: 'pointer',

          dataLabels: {
            enabled: false
          },

          showInLegend: true
        }
      },

      series: [
        {
          type: 'pie',
          name: 'Browser share',
          color: '#00FF00',
          data:
            this.ChartData

        }]
    };
  }
  getChartinfo() {
    this.Service.getChartinfo().subscribe((data: any) => {
      this.tableData = data
      console.log('tickets chart data displays hereeee', this.tableData);
      let Opentickets = 0;
      let ResovledTickets = 0;
      let ClosedTickets = 0

      this.tableData.forEach(element => {
        if (!element.status) {
          Opentickets++
        } else if (element.status === 1) {
          ResovledTickets++
        } else if (element.status === 2) {
          ClosedTickets++
        }
      });

      this.ChartData.push(['Opentickets', +((Opentickets / (this.tableData.length)) * 100).toFixed(1)], ['Resolvedtickets', +((ResovledTickets / (this.tableData.length)) * 100).toFixed(1)], ['Closedtickets', +((ClosedTickets / (this.tableData.length)) * 100).toFixed(1)])
      console.log(this.ChartData, 'chart data', Opentickets, ResovledTickets, ClosedTickets)
      this.getChartsList();

    })
  }



  //alertschart
  getAlertChartsList() {
    this.AlertchartOptions = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Alerts'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          colors: ['#699100', '#007D91', '#FF0000', '#00ff00'],
          allowPointSelect: true,
          cursor: 'pointer',

          dataLabels: {
            enabled: false
          },

          showInLegend: true
        }
      },

      series: [
        {
          type: 'pie',
          name: 'Browser share',
          color: '#00FF00',
          data:
            this.AlertChartData

        }]
    };
  }
  getalertChartinfo() {
    this.Service.getallalerts().subscribe((data: any) => {
      this.alertsData = data
      console.log('alertss chart data displays hereeee', this.alertsData);
      let OpenAlerts = 0;
      let AttendedAlerts = 0;
      let ResolvedAlerts = 0;
      let ConfirmedAlerts = 0;

      this.alertsData.forEach(element => {
        if (element.attended == false) {
          OpenAlerts++
        }
        if (element.attended == true) {
          AttendedAlerts++
        }
        if (element.resolved === true) {
          ResolvedAlerts++
        }
        if (element.confirmed === true) {
          ConfirmedAlerts++
        }
      });
      this.AlertChartData.push(['OpenAlerts', +((OpenAlerts / (this.alertsData.length)) * 100).toFixed(1)], ['Attendedalerts', +((AttendedAlerts / (this.alertsData.length)) * 100).toFixed(1)], ['Resolvedalerts', +((ResolvedAlerts / (this.alertsData.length)) * 100).toFixed(1)], ['Confirmedalerts', +((ConfirmedAlerts / (this.alertsData.length)) * 100).toFixed(1)])
      console.log(this.AlertChartData, 'chart data', OpenAlerts, AttendedAlerts, ResolvedAlerts, ConfirmedAlerts)
      this.getAlertChartsList();

    })
  }


}
