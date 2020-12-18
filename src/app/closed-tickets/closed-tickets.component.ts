import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {

  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  getclosedtickets() {
    this.Service.getclosedtickets().subscribe(data => {
      console.log("CLOSED DATA TICKETSSSSSS", data)
    }, err => {
      console.log("CLOSEDD TICKETS ERRORRRRRRRRRRRRRRR");

    })
  }
}
