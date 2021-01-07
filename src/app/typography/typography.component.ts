import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'underscore';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  AlertchartOptions: Highcharts.Options;

  ChartData: any = [];
  AlertChartData: any = [];
  tableData: any = [];
  alertsData: any = [];
  constructor(public Service: Service,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) { }


  ngOnInit() {
    this.getChartinfo();
    this.getalertChartinfo();
  }


  getChartsList() {
    this.chartOptions = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Raising ticket highcharts'
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
        text: 'Raising Alert highcharts'
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