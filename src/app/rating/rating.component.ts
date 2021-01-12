import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import * as Highcharts from 'highcharts';



@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratings: any = [];
  Highcharts: typeof Highcharts = Highcharts;

  RatingchartOptions: Highcharts.Options;
  RatingChartData: any = [];


  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder, private _router: Router) { }

  ngOnInit(): void {
    this.getratings();
  }

  getRatingChartsList() {
    this.RatingchartOptions = {
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Rating'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          colors: ['#699100', '#e66771', '#007D91', '#FF0000', '#00ff00'],
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
            this.RatingChartData

        }]
    };
  }


  getratings() {
    this.Service.getratings().subscribe((data: any) => {
      this.ratings = data;
      console.log("ratingsssssss: ", this.ratings);
      let Average = 0;
      let Bad = 0;
      let Good = 0;
      let Best = 0;
      let Excellent = 0;

      this.ratings.forEach(element => {
        if (element.rating == "bad") {
          Bad++
        }
        if (element.rating == "average") {
          Average++
        }
        if (element.rating == "good") {
          Good++
        }
        if (element.rating == "best") {
          Best++
        }
        if (element.rating == "excellent") {
          Excellent++
        }
      });
      this.RatingChartData.push(['Bad', +((Bad / (this.ratings.length)) * 100).toFixed(1)],
        ['Average', +((Average / (this.ratings.length)) * 100).toFixed(1)],
        ['Good', +((Good / (this.ratings.length)) * 100).toFixed(1)],
        ['Best', +((Best / (this.ratings.length)) * 100).toFixed(1)],
        ['Excellent', +((Excellent / (this.ratings.length)) * 100).toFixed(1)],

      )
      console.log(this.RatingChartData, 'Rating chart data', Bad, Average, Good, Best, Excellent)
      this.getRatingChartsList();
    })
  }
}
