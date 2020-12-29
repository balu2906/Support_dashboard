import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-closed-alerts',
  templateUrl: './closed-alerts.component.html',
  styleUrls: ['./closed-alerts.component.css']
})
export class ClosedAlertsComponent implements OnInit {
  confirmdata: any = [];
  closeddata: any = [];


  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getclosedalerts();
  }

  getclosedalerts() {
    this.Service.getclosedalerts().subscribe(data => {
      this.confirmdata = data;
      console.log("CLOSED ALERTS DATAAAAAAAAA", this.confirmdata);
     
  

    },
      err => {
        console.log("CLOSED ALERTS ERRORRRRRR");
      })
  }

}
