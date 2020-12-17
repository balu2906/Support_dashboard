import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit() {

  }


  gettableData() {
    this.Service.gettableData().subscribe(data => {
      console.log("sssssssssssssssssssssssss", data)
    }, err => {
      console.log("sdfghjkl");

    })
  }
}
