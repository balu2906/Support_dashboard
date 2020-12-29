import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
// <<<<<<< HEAD
import {SharedService} from '../shared/shared.service'
// =======
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
  message:any;
  filters:any[];
  strikes:any = [];
  //peoplefilter:any = [];
  strikesMap = {
    'n' : 1,
    'u' : 2,
    'su' : 3
  }
//   users=[{
//     id:'123',
//     email:'abc@gmail.com',
//     Assignee: 'Jyothi',
//     Description : 'ksdjhfkjsadf',
//     date:'12/12/2020',
//     remainingtime : '23:0:0',
//     strikes : '1'
    

//   },{
//     id:'1234',
//     email:'xyz@hotmail.com',
//     Assignee: 'Jyothi',
//     Description : 'ksdjhfkjsadf',
//     date:'12/12/2020',
//     remainingtime : '23:0:0',
//     strikes : '3'
//   },{
//     id:'12345',
//     email:'jsgsbh@kk.com',
//     Assignee: 'neha',
//     Description : 'ksdjhfkjsadf',
//     date:'12/12/2020',
//     remainingtime : '23:0:0',
//     strikes : '1'
//   },{
//     id:'123456',
//     email:'test@gmail.com',
//     Assignee: 'Rinki',
//     Description : 'ksdjhfkjsadf',
//     date:'12/12/2020',
//     remainingtime : '23:0:0',
//     strikes : '2'
//   },
//   {
//     id:'123456',
//     email:'tst@gmail.com',
//     Assignee: 'Rinki',
//     Description : 'ksdjhfkjsadf',
//     date:'12/12/2020',
//     remainingtime : '23:0:0',
//     strikes : '3'
//   }
// ]

  opentickets: any = [];
  selected: any;
  checkAll: any = false;
  Clist: any = [];


  constructor(private http: HttpClient, private toastr: ToastrService,
    public Service: Service,
// <<<<<<< HEAD
    private fb: FormBuilder,private shared:SharedService, private router: Router) { }
  

  ngOnInit() : void {
    this.gettableData();
      this.shared.SharingData.subscribe(data=>{
        this.filters = (Object.keys(data).filter(key=>data[key] == true));
        
        this.message = data;
      console.log("assignees",this.filters);
      
     })
     this.shared.Sharingstrike.subscribe(strike =>{
      (Object.keys(strike).filter(key=>{
         if(strike[key] == true){
           return key;
         }}
         )).forEach(ele=>{
           this.strikes.push(this.strikesMap[ele]);
         });
        })

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
         this.strikes = this.strikes.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
      })
       console.log("strikes",this.strikes);
      // var peoplefilter = (this.filters,this.strikes);
      //  console.log("after",peoplefilter);
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
    jQuery("#popup").modal("show");
  }
  rsv() {
    this.Clist.forEach(ele => {
      this.Service.getrsv(ele).subscribe(data => {
        let i = 0;
        this.opentickets.forEach(element => {
          if (element._id == ele) {
            this.opentickets.splice(i, 1);
          }
          i++;
        });
        this.toastr.success("Ticket is resolved successful.");
      }, err => {
        this.toastr.error("Failed to resolve ticket.");
        console.log("error in rsv iddddddd");
      })
    });

  }
}
