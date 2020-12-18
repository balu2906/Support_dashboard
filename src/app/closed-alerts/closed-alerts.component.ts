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

  constructor(private http:HttpClient,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  getclosedalerts() {
    this.Service.getclosedalerts().subscribe(data => {
      console.log("CLOSED ALERTS DATAAAAAAAAA", data);
    },
    err => {
      console.log("CLOSED ALERTS ERRORRRRRR");
    })
  }

}
