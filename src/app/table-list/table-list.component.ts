import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
//import {SharedService} from '../shared/shared.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import * as _ from 'underscore';
import * as $ from 'jquery';
declare var jQuery: any;


// =======
// // >>>>>>> e4166bb3a8a230ab1d3998aee31f75cd4c1a5267
// import * as $ from 'jquery'
// declare var jQuery:any;
// >>>>>>> main




@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  resolvedtickets:any =[];
  opentickets: any = [];
// <<<<<<< HEAD
//   selected: any;
//   checkAll: any = false;
//   Clist: any = [];


//   constructor(private http: HttpClient, private toastr: ToastrService,
// =======

  checkAll: any;
  Clist: any = [];

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
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
    public Service: Service,
// <<<<<<< HEAD
    private fb: FormBuilder, private router: Router,private toastr: ToastrService) { }
  

// <<<<<<< HEAD
  ngOnInit() : void {
    this.gettableData();
//       this.shared.SharingData.subscribe(data=>{
//         this.filters = (Object.keys(data).filter(key=>data[key] == true));
// // =======
//   ngOnInit() : void {
// <<<<<<< HEAD
//       this.shared.SharingData.subscribe(data=>{
//         this.filters = (Object.keys(data).filter(key=>data[key] == true));
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
        
//         this.message = data;
//       console.log("assignees",this.filters);
      
// <<<<<<< HEAD
//      })
//      this.shared.Sharingstrike.subscribe(strike =>{
//       (Object.keys(strike).filter(key=>{
//          if(strike[key] == true){
//            return key;
//          }}
//          )).forEach(ele=>{
//            this.strikes.push(this.strikesMap[ele]);
//          });
//         })
// =======
//      })
//      this.shared.Sharingstrike.subscribe(strike =>{
//       (Object.keys(strike).filter(key=>{
//          if(strike[key] == true){
//            return key;
//          }}
//          )).forEach(ele=>{
//            this.strikes.push(this.strikesMap[ele]);
//          });
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b

// <<<<<<< lakshmi-tcheckbox
      }
      
        

  // checkAllfn(ev: any) {
  //   if (ev.target.checked) {
  //     this.Clist.push(ev.target.value);
  //   }
  //   else {
  //     var i = 0;
  //     this.Clist.forEach(ele => {
  //       if (ele == ev.target.value) {
  //         this.Clist.splice(i, 1);
  //       }
  //       i++;
  //     });;
  //   }
  //   console.log("clisttttttttttttttttttt", this.Clist);
  //   this.checkAll = ev.target.checked
  // }

  checkAllfn(event: any) {
    this.opentickets.map((el: any) => {
      el.checked = event.target.checked
    })
    console.log(this.opentickets);
    this.checkAll = event.target.checked
  }
  checkSingle(item: any, i: any, event: any) {
    const checkedArray = _.filter(this.opentickets, (e: any) => {
      return e.checked == true
    })
    console.log(checkedArray, "checked items isssssss")
    this.checkAll = checkedArray.length === this.opentickets.length ? true : false
    console.log(this.checkAll);
    console.log(this.opentickets);
    if (event.target.checked) {
      this.Clist.push(item._id);
    }
    console.log("clisttttttttttttttttttt", this.Clist);
// =======
      // var peoplefilter = (this.filters,this.strikes);
      //  console.log("after",peoplefilter);
// <<<<<<< HEAD
  }


  gettableData() {
    this.Service.gettableData().subscribe(data => {
      // let opentickets : any = [];
      this.opentickets = data;
      console.log("ttttttttttttttttttttt", this.opentickets)
      console.log("OPEN TICKETS DATAAAA", data)
    }, err => {
      console.log("ERROR IN OPEN TICKETS DATAAAA");

    })
  }

  resolvepopup() {
    if(this.Clist.length == 0){
      this.toastr.error("please select atleast one ticket");
      // console.log("please click at least one checkbox");
      return false;
    }
    else{
      jQuery("#popup").modal("show");
    }
  }
  rsv() {
    console.log("kjhdkjdfjkgkj");
    // console.log("resolving id's",this.Clist);
    
    const rsvid ={
     ids : this.Clist
    }
    console.log("resolved id's ",rsvid);
    
    this.Clist.forEach(ele => {
// <<<<<<< HEAD
      this.Service.getrsv(ele).subscribe(data => {
        let i = 0;
        this.opentickets.forEach(element => {
          if (element._id == ele) {
            this.opentickets.splice(i, 1);
          }
          i++;
        });
        this.toastr.success("Ticket is resolved successful.");
// =======
//       console.log("jhjhjh");
      
//       this.Service.getrsv(rsvid).subscribe(data => {
//         // let i = 0;
//         // this.opentickets.forEach(element => {
//         //   if (element._id == ele) {
//         //     this.opentickets.splice(i, 1);
//         //   }
//         //   i++;
//         // });
//         console.log("entered to resolve dataa ");
        
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
      }, err => {
        this.toastr.error("Failed to resolve ticket.");
        console.log("error in rsv iddddddd");
      })
    });

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
