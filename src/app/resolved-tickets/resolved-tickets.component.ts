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
  Checklist: any = [];
  filteredId: any = [];
  checkAll: any = false;
  showSpinner = false;



  resolvedtickets: any = [];
  selected: any;
  asigne: any = [];
  strike: any = [];
  query = "'Assignee':asigne";



  assignee = {
    "jyothi": '',
    "Rinki": '',
    "neha": '',
  }
  strikes = {
    'n': '',
    'u': '',
    'su': ''
  }
  strikesMap = {
    'n': 1,
    'u': 2,
    'su': 3
  }
  popupForm: FormGroup = this.fb.group({
    description: [''],
    solvedby: [''],
  });
  users:any = [];
  fool:any = [];
  constructor(private http: HttpClient,
    public Service: Service, private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getresolvedtickets();
    var auth  = localStorage.getItem('token')
    console.log("existing users ",auth);
    if(!auth){
      this.router.navigate(["/login"])
    }
    this.users = localStorage.getItem('users')
    this.users = JSON.parse(this.users)
  }
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
    } else {
      const index = this.Checklist.findIndex(list => list == item._id);//Find the index of stored id
      this.Checklist.splice(index, 1); // Then remove
    }
    console.log("this checklist ", this.Checklist);

  }



  getresolvedtickets() {
    this.showSpinner = true;
    this.Service.getresolvedtickets().subscribe(data => {
      this.showSpinner = false;
      this.resolvedtickets = data;
      console.log("resolved dataaaaa", this.resolvedtickets);
      console.log("RESOLVED DATA TICKETSSSSSS", data);
    }, err => {
      console.log("RESOLVEDDD ERRORRRRRRRRRRRRRRR");

    })
  }
  changestrike() {
    this.strike = [];
    Object.keys(this.strikes).filter(key => this.strikes[key] == true)
      .forEach(ele => {
        this.strike.push(this.strikesMap[ele]);
      });
    console.log("str on ch", this.strikes, this.strike);

    this.strike = this.strike.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    })
  }
    changeassignee(item ,event:any) {
      // this.asigne = (Object.keys(this.assignee).filter(key => this.assignee[key] == true))
      // console.log("assignees", this.asigne)
      console.log("hellooooo",item);
      if(event.target.checked){
        this.fool.push(item)
      }else {
        const index = this.fool.findIndex(list => list == item);//Find the index of stored id
        this.fool.splice(index, 1); // Then remove
      }
      this.asigne = this.fool.filter((element) =>{
        return element
      })
      console.log("asigne ",this.asigne);
    }
  closepopup() {
    if (this.Checklist.length == 0) {
      this.toastr.error("please select atleast one ticket");
      return false;

    } else {
      jQuery("#popup").modal("show");
    }
  }

  loading_spinner: Boolean = false;
  closed() {
    this.loading_spinner = true;
    const popdata = {
      reason: this.popupForm.get('description').value,
      closedBy: this.popupForm.get('solvedby').value,
      ids: this.Checklist

    }
    console.log("popupdata", popdata);
    this.Service.getclose(popdata).subscribe(data => {
      let i = 0;
      jQuery("#popup").modal("hide");
      this.loading_spinner = false;
      var dataInfo: any = data;
      this.toastr.success(dataInfo.message);
      console.log("entered post id");

    }, err => {
      this.toastr.error(err.error.message);
      console.log("error in closedticket iddddddd");
    })

  }

}
