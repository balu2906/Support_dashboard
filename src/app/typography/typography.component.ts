import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import * as HighCharts from 'highcharts';
import * as _ from 'underscore';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    // series: [{
    //   data: [1, 2, 3],
    //   type: 'line'
    // }]
    chart: {
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: 'Browser market shares at a specific website, 2014'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',

        dataLabels: {
          enabled: false
        },

        showInLegend: true
      }
    },
    series: [{
      type: 'pie',
      name: 'Browser share',
      data: [
        ['Opentickets', 45.0],
        ['Resolvedtickets', 26.8],
        {
          name: 'Chrome',
          y: 12.8,
          sliced: true,
          selected: true
        },
        ['Safari', 8.5],
        ['Opera', 6.2],
        ['Others', 0.7]
      ]
    }]
  };
  // chartOptionsBar: Highcharts.Options = {
  //   // series: [{
  //   //   data: [1, 2, 3],
  //   //   type: 'line'
  //   // }]
  //   chart: {
  //     type: 'bar'
  //   },
  //   title: {
  //     text: 'Historic World Population by Region'
  //   },
  //   subtitle: {
  //     text: 'Source: Wikipedia.org'
  //   },
  //   legend: {
  //     layout: 'vertical',
  //     align: 'left',
  //     verticalAlign: 'top',
  //     x: 250,
  //     y: 100,
  //     floating: true,
  //     borderWidth: 1,
  //   },
  //   xAxis: {
  //     categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
  //       text: null
  //     }
  //   },
  //   yAxis: {
  //     min: 0, title: {
  //       text: 'Population (millions)', align: 'high'
  //     },
  //     labels: {
  //       overflow: 'justify'
  //     }
  //   },
  //   tooltip: {
  //     valueSuffix: ' millions'
  //   },
  //   plotOptions: {
  //     bar: {
  //       dataLabels: {
  //         enabled: true
  //       }
  //     },
  //     series: {
  //       stacking: 'normal'
  //     }
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Year 1800',
  //       data: [107, 31, 635, 203, 2]
  //     },
  //     {
  //       name: 'Year 1900',
  //       data: [133, 156, 947, 408, 6]
  //     },
  //     {
  //       name: 'Year 2008',
  //       data: [973, 914, 4054, 732, 34]
  //     }
  //   ]
  // };


  constructor(public Service: Service,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) { }


  ngOnInit() {
  }
  // barChartPopulation() {
  //   HighCharts.chart('barChart', {
  //     chart: {
  //       type: 'bar'
  //     },
  //     title: {
  //       text: 'Covid Information Highcharts'
  //     },
  //     xAxis: {
  //       categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania', 'India'],
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: 'Population (millions)',
  //         align: 'high'
  //       },
  //     },
  //     tooltip: {
  //       valueSuffix: ' millions'
  //     },
  //     plotOptions: {
  //       bar: {
  //         dataLabels: {
  //           enabled: true
  //         },
  //         states: {
  //           inactive: {
  //             opacity: 1
  //           }
  //         },
  //       }
  //     },
  //     series: [
  //       // {
  //       // type: undefined,
  //       // name: 'Year 1800',
  //     //   data: [107, 31, 635, 203, 2]
  //     // }, {
  //     //   type: undefined,
  //     //   name: 'Year 1900',
  //     //   data: [133, 156, 947, 408, 6]
  //     // }, 
  //     {
  //       type: undefined,
  //       name: 'Active Cases',
  //       data: this.activeData
  //     },
  //      {
  //       type: undefined,
  //       name: 'Death Cases',
  //       data: this.deathData
  //     },
  //     {
  //       type: undefined,
  //       name: 'Recovery Cases',
  //       data: this.recoveredData
  //     }
  //   ]
  //   });
  // }



  // getChartinfo() {
  //   this.Service.getChartinfo().subscribe((data:any) => {
  //     console.log(data, 'data is here')
  //     this.activeData = _.pluck(data.data, 'active')
  //     this.deathData = _.pluck(data.data, 'deaths')
  //     this.recoveredData = _.pluck(data.data, 'recovered')
  //     this.barChartPopulation();
  //   })
  // }

}
