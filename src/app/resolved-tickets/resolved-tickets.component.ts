import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import * as $ from 'jquery';
declare var jQuery: any;


@Component({
  selector: 'app-resolved-tickets',
  templateUrl: './resolved-tickets.component.html',
  styleUrls: ['./resolved-tickets.component.css']
})
export class ResolvedTicketsComponent implements OnInit {
//   resolvedtickets: any = [];
//   selected: any;
  Checklist: any = [];
  checkAll: any = false;

 resolvedtickets:any =[];
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
    public Service: Service,private toastr:ToastrService,
    private fb: FormBuilder,
    private router: Router) {

     }


  ngOnInit(): void {
    this.getresolvedtickets();
  }


  // checkAllfn(ev: any) {
  //   if (ev.target.checked) {
  //     this.Checklist.push(ev.target.value);
  //   }
  //   else {
  //     var i = 0;
  //     this.Checklist.forEach(ele => {
  //       if (ele == ev.target.value) {
  //         this.Checklist.splice(i, 1);
  //       }
  //       i++;
  //     });;
  //   }
  //   console.log("checklistttttttttttttt", this.Checklist);
  // }

  checkAllfn(event: any) {
    this.resolvedtickets.map((el: any) => {
      el.checked = event.target.checked
    })
    console.log(this.resolvedtickets);
    this.checkAll = event.target.checked
  }
  checkSingle(item: any, i: any, event: any) {
    const checkedArray = _.filter(this.resolvedtickets, (e: any) => {
      return e.checked == true
    })
    console.log(checkedArray, "checked items isssssss")
    this.checkAll = checkedArray.length === this.resolvedtickets.length ? true : false
    console.log(this.checkAll);
    console.log(this.resolvedtickets);
    if (event.target.checked) {
      this.Checklist.push(item._id);
    }
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
        this.toastr.success("Ticket is resolved successful.");
      }, err => {
        this.toastr.error("Failed to resolve ticket.");
        console.log("error in closedticket iddddddd");
      })

    });

  }

}