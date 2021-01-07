
  import { Component, OnInit } from '@angular/core';
  import { Service } from '../service/service';
  import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
  import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
  import { Router, ActivatedRoute, ParamMap } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';

  // import * as HighCharts from 'highcharts';
  import * as _ from 'underscore';
  import * as Highcharts from 'highcharts';
import { redis } from 'googleapis/build/src/apis/redis';
  @Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.css'],
  })
  export class TypographyComponent implements OnInit {
    Date: FormGroup = this.fb.group({
      FromDate:[''],
      ToDate:[''],
      assignee:['']
    });

    FinalTickets:any = [];
    FilterChartData:any = [];
    FilterAlertsData:any =[];
    FinalAlerts:any = [];
    date = '';
    FilterDateTickets:any =[];
    DateData:any = [];
    filterdata:any =[];
    FormatedDate:any = [];
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options;
    AlertchartOptions: Highcharts.Options;
    solvedByOptions : Highcharts.Options;
    SingleAlertsOptions:Highcharts.Options;
    duplicateArray=[]
    FilterAssignee:any = [];
    assignee = '';
    alertassignee = '';
    SingleAssignee:any = [];
    ChartData: any = [];
    jyothiData:any = [];
    AssigneeData:any = [];
    AlertChartData: any = [];
    FilterAlertChartData:any = [];
    tableData: any = [];
    alertsData: any = [];
    solvedByData:any = [];
     AssignedTickets = 0;
     Opentickets = 0;
    ResovledTickets = 0;
    ClosedTickets = 0;
    constructor(public Service: Service,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,private toastr:ToastrService,) { }


    ngOnInit() {
      this.getChartinfo();
      this.getalertChartinfo();
      this.getsolvedByinfo();
      this.getSingleAlerts();
    }

    getsolvedByinfo(){
      this.solvedByOptions = {   
        chart: {
           type: 'column'
        },
        title: {
           text: 'Tickets Of Assignees'
        },
        subtitle:{
           text: 'Source: FinnovationZ.com' 
        },
        xAxis:{
          //  categories: ['Open Alerts','Attended alerts','Resolved alerts','Confirmed Alerts'],
           crosshair: true        
        },     
        yAxis : {
           min: 0,
           title: {
              text: 'Values'
           }      
        },
        tooltip : { },
        plotOptions : {
           column: {
              pointPadding: 0.2,
              borderWidth: 0,
              cursor:'pointer'
           }
        },
      series: [
        {
          type : 'column',
          color:'#040c80',
          name:'All Tickets',
          data:[this.ChartData[0]]
        },
        {
          type:'column',
          color:'#008000',
           name: 'Open Tickets',
           data: [this.ChartData[1]]
        }, 
        {
          type:'column',
          color:'#ffcc00',
           name: 'Resolved Tickets',
           data: [this.ChartData[2]]
        }, 
        {
          type:'column',
          color:' #ff3300',
           name: 'Closed Tickets',
           data: [this.ChartData[3]]
        }]
     };

    }
    getSingleAlerts(){
      this.SingleAlertsOptions = {   
        chart: {
           type: 'column'
        },
        title: {
           text: 'Alerts Of Assignees'
        },
        subtitle:{
           text: 'Source: FinnovationZ.com' 
        },
        xAxis:{
          //  categories: ['Open Alerts','Attended alerts','Resolved alerts','Confirmed Alerts'],
           crosshair: true        
        },     
        yAxis : {
           min: 0,
           title: {
              text: 'Values'
           }      
        },
        tooltip : {
          //  headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
          //  pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
          //     '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
        },
        plotOptions : {
           column: {
              pointPadding: 0.2,
              borderWidth: 0,
              cursor:'pointer'
           }
        },
        series: [{
          type:'column',
           name: 'Open Alerts',
           color:'#0066ff',
           data: [this.AlertChartData[0]]
        }, 
        {
          type:'column',
          color:'#008000',
           name: 'Attended Alerts',
           data: [this.AlertChartData[1]]
        }, 
        {
          type:'column',
           name: 'Resolved Alerts',
           color:'#ffcc00',
           data: [this.AlertChartData[2]]
        }, 
        {
          type:'column',
          color:' #ff3300',
           name: 'Confirmed Alerts',
           data: [this.AlertChartData[3]]
        }]
     };

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
        let ClosedTickets = 0;
        let Alltickets = 0;
        Alltickets = this.tableData.length;
        this.tableData.forEach(element => {
          if (!element.status) {
            Opentickets++
          } else if (element.status === 1) {
            ResovledTickets++
          } else if (element.status === 2) {
            ClosedTickets++
          }
        });
        this.ChartData.push(
          ['Alltickets',+Alltickets],
          ['Open Tickets',+Opentickets],
          ['Resolved Tickets',+ResovledTickets ], 
          ['Closed Tickets',+ClosedTickets]
          
        )
        console.log(this.ChartData, 'chart data',Alltickets, Opentickets, ResovledTickets, ClosedTickets)
        this.getChartsList();
        // this.solvedByData();
        this.getsolvedByinfo();

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
        this.AlertChartData.push(
         ['OpenAlerts', +OpenAlerts],
         ['Attendedalerts', +AttendedAlerts],
         ['Resolvedalerts', +ResolvedAlerts], 
         ['Confirmedalerts', +ConfirmedAlerts]
        )
        console.log(this.AlertChartData, 'chart data', OpenAlerts, AttendedAlerts, ResolvedAlerts, ConfirmedAlerts)
        this.getAlertChartsList();
        // this.solvedByData();
        // this.getsolvedByinfo();
        this.getSingleAlerts();
        // console.log("AlertChartData ",this.AlertChartData.length);

      })
    }
    selectDate(){
      let AssignedTickets = 0;
      let Opentickets = 0;
      let ResovledTickets = 0;
      let ClosedTickets = 0;
      let AllData = this.tableData; 
      AllData.forEach(element => {
          element.createdAt =  this.filterdate(element.createdAt);
      });
      const Userdate = {
        from: this.Date.get('FromDate').value,
        tod: this.Date.get('ToDate').value,
      }
      console.log("dates ",Userdate);
      const Assignee = {
        assignee : this.Date.get('assignee').value
      }
      console.log("assignee ",Assignee);
      if((Assignee.assignee != "") &&((Userdate.from == "") && (Userdate.tod == ""))){
        this.FilterChartData = AllData;
        if(Assignee.assignee != 'all'){
          let SelectedAssignee = this.FilterChartData.filter((person) =>{
            return person.assignee == Assignee.assignee
          })
          this.FilterChartData = SelectedAssignee;
        }
        else{
          this.FilterChartData = AllData;
        }
        
        
      }
      if((Assignee.assignee == "") &&((Userdate.from != "") && (Userdate.tod != ""))){
        console.log("Only Dates Selected.......")
        this.FilterChartData = AllData;
        
        let Fildata = this.FilterChartData.filter((person) =>{
          if(person.createdAt >= Userdate.from && person.createdAt <= Userdate.tod){
            return person.createdAt;
          } 
        })
        this.FilterChartData = Fildata;
      }
      if((Assignee.assignee != "") &&((Userdate.from != "") && (Userdate.tod != ""))){
        this.FilterChartData = AllData;
        console.log("Everything Selected");
        let DatesInBoth = this.FilterChartData.filter((person) =>{
          if(person.createdAt >= Userdate.from && person.createdAt <= Userdate.tod){
            return person.createdAt;
          } 
        })
        this.FilterChartData = DatesInBoth;
        if(Assignee.assignee != 'all'){
          let AssigneeBoth = this.FilterChartData.filter((person) =>{
            return person.assignee == Assignee.assignee
          })
          this.FilterChartData = AssigneeBoth;
        }
        else{
          this.FilterChartData = DatesInBoth;
        }

      }
      if((Assignee.assignee == "") &&((Userdate.from == "") && (Userdate.tod == ""))){
        console.log("Nothing Selected");
        this.toastr.error("please select Something To Filter");
        return
      }
      else{
      }
      console.log("Final Filtered Data ",this.FilterChartData);
      AssignedTickets = this.FilterChartData.length;
      this.FilterChartData.forEach(element => {
        if (!element.status) {
          Opentickets++
        } else if (element.status === 1) {
          ResovledTickets++
        } else if (element.status === 2) {
          ClosedTickets++
        }
      });
      console.log("all-open-resolved-closed ",AssignedTickets,Opentickets,ResovledTickets,ClosedTickets)
      this.FinalTickets = [];
      this.FinalTickets.push(
        [AssignedTickets], 
        [Opentickets],
        [ResovledTickets],
        [ClosedTickets]
      )
      this.ChartData = this.FinalTickets;
      console.log(this.ChartData, 'chart data', AssignedTickets, Opentickets, ResovledTickets,ClosedTickets)
      this. getsolvedByinfo();
      console.log("length of chartdata ",this.ChartData.length);

      
    }
    selectalert(){
      console.log("Alert Chart Goes")
      const alertdate = {
        from: this.Date.get('FromDate').value,
        tod: this.Date.get('ToDate').value,
      }
      console.log("alert dates ",alertdate);
      const Assignee = {
        assignee : this.Date.get('assignee').value
      }
      console.log("alert assignee ",Assignee);
      let AllAlerts = this.alertsData;
      AllAlerts.forEach(element => {
        element.createdAt =  this.filterdate(element.createdAt);
      });
      // console.log("all formated alerts data ",AllAlerts)
      if((Assignee.assignee != "") &&((alertdate.from == "") && (alertdate.tod == ""))){
        this.FilterAlertsData = AllAlerts;
        // console.log("only Assignees in Alerts");
        if(Assignee.assignee != 'all'){
          // console.log("Selected assignee ",Assignee.assignee);
          let SelectedAssignee = this.FilterAlertsData.filter((person) =>{
            return person.assignedTo == Assignee.assignee
          })

          this.FilterAlertsData = SelectedAssignee;
        }
        else{
          this.FilterAlertsData = AllAlerts;
        }
        // console.log("filered alert assignee data ",this.FilterAlertsData);
        
      }
      if((Assignee.assignee == "") &&((alertdate.from != "") && (alertdate.tod != ""))){
        // console.log("only dates in alerts");
        this.FilterAlertsData = AllAlerts;
        let Fildata = this.FilterAlertsData.filter((person) =>{
          if(person.createdAt >= alertdate.from && person.createdAt <= alertdate.tod){
            return person.createdAt;
          } 
        })
        this.FilterAlertsData = Fildata;
        // console.log("filtered alert datesss dataa ",this.FilterAlertsData);
        
      }
      if((Assignee.assignee != "") &&((alertdate.from != "") && (alertdate.tod != ""))){
        // console.log("both dates and assignees in alerts");
        this.FilterAlertsData = AllAlerts
        let DatesInBoth = this.FilterAlertsData.filter((person) =>{
          if(person.createdAt >= alertdate.from && person.createdAt <= alertdate.tod){
            return person.createdAt;
          } 
        })
        this.FilterAlertsData = DatesInBoth;
        if(Assignee.assignee != 'all'){
          let AssigneeBoth = this.FilterAlertsData.filter((person) =>{
            return person.assignedTo == Assignee.assignee
          })
          this.FilterAlertsData = AssigneeBoth;
        }
        else{
          this.FilterAlertsData = DatesInBoth;
        }
        // console.log("filtered Data bothhh ",this.FilterAlertsData);
        
      }
      if((Assignee.assignee == "") &&((alertdate.from == "") && (alertdate.tod == ""))){
        // console.log("Nothing In Alerts");
        this.toastr.error("please select Something To Filter");
        return
      }
      else{

      }
      console.log("final filtered alerts data ",this.FilterAlertsData);
      let OpenAlerts = 0;
      let AttendedAlerts = 0;
      let ResolvedAlerts = 0;
      let ConfirmedAlerts = 0;
      this.FilterAlertsData.forEach(element => {
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
      this.FinalAlerts = [];
      this.FinalAlerts.push(
        [OpenAlerts],
        [AttendedAlerts],
        [ResolvedAlerts],
        [ConfirmedAlerts]
      )
      this.AlertChartData = this.FinalAlerts;
      console.log(this.AlertChartData, 'alert chart data', OpenAlerts, AttendedAlerts, ResolvedAlerts, ConfirmedAlerts);
      this.getSingleAlerts();
      console.log("fooool ",this.AlertChartData.length);
    }
    filterdate(date){ 
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
  
        return [year, month, day].join('-');
     }


  }
