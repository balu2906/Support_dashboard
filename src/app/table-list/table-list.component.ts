import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
//import {SharedService} from '../shared/shared.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery'
declare var jQuery:any;



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  resolvedtickets:any =[];
  opentickets: any = [];
  selected:any;
   asigne:any =[];
   strike:any = [];
   query = "'Assignee':asigne";
 assignee = {
   "jyothi" : '',
   "Rinki" : '',
   "neha" : '',
 }
 strikes = {
     'n' : '',
     'u' : '',
     'su' : ''
 }
 strikesMap = {
   'n' : 1,
   'u' : 2,
   'su' : 3
 }
  constructor(private http: HttpClient,
    public Service: Service,
// <<<<<<< HEAD
    private fb: FormBuilder, private router: Router) { }
  

  ngOnInit() : void {
    
    this.gettableData()

  }

  gettableData() {
    this.Service.gettableData().subscribe(data => {
      this.opentickets = data;
      console.log("ttttttttttttttttttttt", this.opentickets)
      console.log("OPEN TICKETS DATAAAA", data)
    }, err => {
      console.log("ERROR IN OPEN TICKETS DATAAAA");

    })
  }

  resolvepopup(id: any) {
    this.selected = id;
    jQuery("#popup").modal("show");
  }
  
  rsv(id: any) {
    console.log("slkdfjaslkdfjlaksdfjlkasdfj");
    this.Service.getrsv(id).subscribe(data => {
      console.log("resolved ticket iddddddddd", data);
      // this.router.navigate(['/resolved-tickets']);
      window.location.reload();
    }, err => {
      console.log("error in rsv iddddddd");
    })
  }
  changestrike(){
    this.strike = [];
    Object.keys(this.strikes).filter(key=>this.strikes[key] == true)
    .forEach(ele=>{
      this.strike.push(this.strikesMap[ele]);
    });
console.log("str on ch",this.strikes,this.strike);

    this.strike = this.strike.filter(function(elem, index, self) {
     return index === self.indexOf(elem);
    })
  }

  changeassignee(){
    this.asigne = (Object.keys(this.assignee).filter(key=>this.assignee[key] == true))
    console.log("assignees",this.asigne);

    
  }  
}
