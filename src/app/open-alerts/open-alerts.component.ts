import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-open-alerts',
  templateUrl: './open-alerts.component.html',
  styleUrls: ['./open-alerts.component.css']
})
export class OpenAlertsComponent implements OnInit {

  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  getopenalerts() {
    this.Service.getopenalerts().subscribe(data => {
      console.log("OPEN ALERTS DATAAA", data)
    }, err => {
      console.log("OPEN ALERTS ERRORRRRRRRRRRRRRRR");

    })
  }

}
