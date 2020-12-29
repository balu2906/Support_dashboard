import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// <<<<<<< HEAD
import * as _ from 'underscore';
// =======

// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
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
popupForm: FormGroup = this.fb.group({
  description: [''],
  solvedby: [''],
});
  
  constructor(private http: HttpClient,
// <<<<<<< HEAD
    public Service: Service,private toastr:ToastrService,
// =======


// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
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
// <<<<<<< HEAD
        // this.resolvedtickets.forEach(ele => {
        //   if (ele._id == element) {
        //     this.resolvedtickets.splice(i, 1);
        //   }
        //   i++;
        // });
        this.toastr.success("Ticket is resolved successful.");
// =======
        console.log("entered post id");
        // this.resolvedtickets.forEach(ele => {
          
          
        //   if (ele._id == element) {
        //     this.resolvedtickets.splice(i, 1);
        //   }
        //   i++;
        // });
        // console.log("closing id",element);
        
// >>>>>>> 6cdf65251da3713bd7f400622f6cb982a73f285b
      }, err => {
        this.toastr.error("Failed to resolve ticket.");
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
  