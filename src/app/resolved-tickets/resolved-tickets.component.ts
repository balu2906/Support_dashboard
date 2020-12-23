import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import * as $ from 'jquery';
declare var jQuery: any;


@Component({
  selector: 'app-resolved-tickets',
  templateUrl: './resolved-tickets.component.html',
  styleUrls: ['./resolved-tickets.component.css']
})
export class ResolvedTicketsComponent implements OnInit {

  Checklist: any = [];


 resolvedtickets:any =[];
 selected:any;
  asigne:any =[];
  strike:any = [];
  // query = "'Assignee':asigne";
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

    private fb: FormBuilder,
    private router: Router) {

     }

  ngOnInit(): void {
    this.getresolvedtickets();
  }


  checkAllfn(ev: any) {
    if (ev.target.checked) {
      this.Checklist.push(ev.target.value);
    }
    else {
      var i = 0;
      this.Checklist.forEach(ele => {
        if (ele == ev.target.value) {
          this.Checklist.splice(i, 1);
        }
        i++;
      });;
    }
    console.log("checklistttttttttttttt", this.Checklist);
  }


  getresolvedtickets() {
    this.Service.getresolvedtickets().subscribe(data => {
      this.resolvedtickets = data;
      console.log("resolved dataaaaa", this.resolvedtickets);
      console.log("RESOLVED DATA TICKETSSSSSS", data);
    }, err => {
      console.log("RESOLVEDDD ERRORRRRRRRRRRRRRRR");

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
    
    // this.shared.SharingData.next(this.assignee);
    // this.shared.Sharingstrike.next(this.strikes);
    
  
  

  closepopup() {
    jQuery("#popup").modal("show");
  }
  closed() {
    this.Checklist.forEach(element => {
      this.Service.getclose(element).subscribe(data => {
        let i = 0;
        this.resolvedtickets.forEach(ele => {
          if (ele._id == element) {
            this.resolvedtickets.splice(i, 1);
          }
          i++;
        });
      }, err => {
        console.log("error in closedticket iddddddd");
      })

    });

  }}
  