import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery';
declare var jQuery: any;


@Component({
  selector: 'app-resolved-tickets',
  templateUrl: './resolved-tickets.component.html',
  styleUrls: ['./resolved-tickets.component.css']
})
export class ResolvedTicketsComponent implements OnInit {

  Checklist: any = [];
  loading_spinner: Boolean = false;


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
popupForm: FormGroup = this.fb.group({
  description: [''],
  solvedby: [''],
});
  
  constructor(private http: HttpClient,
    public Service: Service,

    private fb: FormBuilder,
    private router: Router,private toastr: ToastrService) {

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
    if(this.Checklist.length == 0){
      this.toastr.error("please select atleast one ticket");
      // console.log("please click at least one checkbox");
      return false;
      
    }else{
      jQuery("#popup").modal("show");
    }
  }
  closed() {
    // this.Checklist.forEach(element => {
      // console.log("enter to closed",element);
      const popdata ={
        reason :  this.popupForm.get('description').value,
        closedBy : this.popupForm.get('solvedby').value,
        ids : this.Checklist

      }
      console.log("popupdata",popdata);
      this.Service.getclose(popdata).subscribe(data => {
        let i = 0;
        console.log("entered post id");
        // this.resolvedtickets.forEach(ele => {
          
          
        //   if (ele._id == element) {
        //     this.resolvedtickets.splice(i, 1);
        //   }
        //   i++;
        // });
        // console.log("closing id",element);
        
      }, err => {
        console.log("error in closedticket iddddddd");
      })

    // });

  }
  // postpopup(){
  //   this.loading_spinner = true;

  //   const popdata ={
  //     reason :  this.popupForm.get('description').value,
  //     closedBy : this.popupForm.get('solvedby').value
  //   }
  //   console.log("popupdata",popdata);
  //   this.Service.postpopup(popdata).subscribe(popdata => {
  //     console.log("popdata is here",popdata);
  //     // this.toastr.success("popup created successfully");
  //     // this.loading_spinner = false;
  //   }, err => {
  //     console.log("error in popdata", err);

  //     // this.toastr.error("Error while creating popticket");

  //   })
    
  // }
}
  