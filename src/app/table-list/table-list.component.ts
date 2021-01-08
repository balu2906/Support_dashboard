import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import * as _ from 'underscore';
import * as $ from 'jquery';
declare var jQuery: any;
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  popupForm: FormGroup = this.fb.group({
    assignedto: [''],
    problemtype: [''],
  });
  showSpinner = false;
  resolvedtickets: any = [];
  opentickets: any = [];
  checkAll: any;
  Clist: any = [];
  tickets: any;
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
  checkarray: any = []
  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.gettableData();
  }

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
    } else {
      const index = this.Clist.findIndex(list => list == item._id);//Find the index of stored id
      this.Clist.splice(index, 1); // Then remove
    }
    console.log("clisttttttttttttttttttt", this.Clist);
  }


  gettableData() {
    this.showSpinner = true;

    this.Service.gettableData().subscribe(data => {
      this.showSpinner = false;
      this.opentickets = data;
      this.tickets = this.opentickets.length;
      console.log("ttttttttttttttttttttt", this.opentickets)
      console.log("OPEN TICKETS DATAAAA", data)
    }, err => {
      console.log("ERROR IN OPEN TICKETS DATAAAA");

    })
  }

  resolvepopup() {
    if (this.Clist.length == 0) {
      this.toastr.error("please select atleast one ticket");
      return false;
    }
    else {
      jQuery("#popup").modal("show");
    }
  }
  alertpopup() {
    if (this.Clist.length == 0) {
      this.toastr.error("please select atleast one ticket");
      return false;
    }
    else {
      jQuery("#alertpopup").modal("show");
    }
  }

  loading_spinners: Boolean = false;
  rsv() {
    this.loading_spinners = true;
    const rsvid = {
      ids: this.Clist
    }
    console.log("resolved id's ", rsvid);
    this.Service.postresolve(rsvid).subscribe(data => {
      let i = 0;
      jQuery("#popup").modal("hide");
      this.loading_spinners = false;
      var dataInfo: any = data;
      this.toastr.success(dataInfo.message);
      this.gettableData();

    }, err => {
      this.toastr.error(err.error.message);
    })
  }

  loading_spinner: Boolean = false;
  sendalert() {
    this.loading_spinner = true;
    console.log("post alerting ids");
    const postalert = {
      assignedTo: this.popupForm.get('assignedto').value,
      problemType: this.popupForm.get('problemtype').value,
      ids: this.Clist
    }
    console.log("alerting id's ", postalert);
    this.Service.postalert(postalert).subscribe(data => {
      let i = 0;
      jQuery("#alertpopup").modal("hide");
      this.loading_spinner = false;
      var dataInfo: any = data;
      this.toastr.success(dataInfo.message);
      console.log("entered to alert id");

    }, err => {
      this.toastr.error(err.error.message);
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

  changeassignee() {
    this.asigne = (Object.keys(this.assignee).filter(key => this.assignee[key] == true))
    console.log("assignees", this.asigne);


  }
  closed() {
    const popdata = {
      assignedTo: this.popupForm.get('assignedto').value,
      problemType: this.popupForm.get('problemtype').value,
      ids: this.Clist

    }
    console.log("popupdata", popdata);

  }
}
