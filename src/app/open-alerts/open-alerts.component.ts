import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as _ from 'underscore';

import { ToastrService } from 'ngx-toastr';
declare var jQuery: any;

@Component({
  selector: 'app-open-alerts',
  templateUrl: './open-alerts.component.html',
  styleUrls: ['./open-alerts.component.css']
})
export class OpenAlertsComponent implements OnInit {

  showSpinner = false;
  allalerts: any = [];
  Checklist: any = [];
  alertId:any=""
  tempAllAlerts: any = [];
  popupbutton: any = "Attend";
  state: any = "All Alerts";
  button_disabled: Boolean = false;
  checkAll: any = false;
  solvedIn: any = '';
  alertType: any = 'all';
  reason: any = '';
  submitType: any = '';
  buttonType: any = '';
  isAttended: any = true;
  isResolved: any = true;
  isConfirmed: any = true;

  openalerts: any = []
  selected: any;
  asigne: any = [];
  strike: any = [];
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
  constructor(private http: HttpClient,private router: Router, private toastr: ToastrService,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getallalerts();
  }

  action(){
    this.router.navigate([ '/table-list']);
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
  getallalerts() {
    this.showSpinner = true;
    this.Service.getallalerts().subscribe(data => {
      this.showSpinner = false;
      console.log("DFRTHER", data);
      this.allalerts = data;
      console.log("all alerts dataaaaaaa", this.allalerts);
      console.log("Fomated Data: ", this.allalerts);
      this.tempAllAlerts = data;
      console.log(this.tempAllAlerts,"temp-all")
      console.log("llllllllllllllllllllllll", this.allalerts.length);
      console.log("OPEN ALERTS DATAAA", this.allalerts);
      if (this.alertType != 'all') {
        console.log(this.alertType, "alert type issssss");
        console.log(this.submitType, "submit type issssss");
        console.log(this.buttonType, "button type isssss");
        this.submitType = this.submitType == 'attended' ? 'resolved' : this.submitType == 'resolved' ? 'confirmed' : this.submitType;
        console.log("after checking submit type issss", this.submitType);
        this.allalerts = this.tempAllAlerts.filter((ele: any) => {
          ele.checked = false;
          if (this.buttonType == 'opened') {
            return ele['attended'] == false && ele['resolved'] == false && ele['confirmed'] == false;
          }
          else if (this.buttonType == 'attended') {
            return ele['attended'] == true && ele['resolved'] == false && ele['confirmed'] == false;
          }
          else if (this.buttonType == 'resolved') {
            return ele['attended'] == true && ele['resolved'] == true && ele['confirmed'] == false;
          }
          else if (this.buttonType == 'confirmed') {
            return ele['attended'] == true && ele['resolved'] == true && ele['confirmed'] == true;
          }
        });
        this.isAttended = true;
        this.isConfirmed = true;
        this.isResolved = true;
        this.checkAll = false;
      }
    })

  }

alertsbuttonA(type: any, event: any, type2: any, event2: any, alrtname: any) {
    this.submitType = type;
    this.buttonType = type;
    console.log("submitytyp2 issss", this.submitType);
    this.button_disabled = true;
    if (type != "resolved" && alrtname != "attended") {
      if (type != 'confirmed') {
        this.popupbutton = event == false ? "Attend" : "Resolve",
          this.state = event == false ? "Opened alerts" : "Attended alerts"
      } else {
        this.popupbutton = "confirmed";
        this.button_disabled = false;
        this.state = "confirmed alerts";
      }
    } else {
      this.popupbutton = "Confirm",
        this.state = "Resolved alerts"
    }
    console.log("selected button isss", event)
    if (type == 'attended') {
      if (event == true) {
        this.alertType = 'attended'
      }
    }
    if (type == 'resolved') {
      if (event == true) {
        this.alertType = 'confirmed'
      }
    }
    // type = type == 'opened' ? 'attended' : type;
    console.log("alerttypealerttype ", this.alertType);
    // this.alertType = type == 'resolved' ? 'confirmed' : type;
    console.log(this.alertType, "alert type isssss");
    this.allalerts = this.tempAllAlerts.filter((ele: any) => {
      // console.log("eeeeeeeeeeeeeeeee", ele)
      return ele[type] == event && ele[type2] == event2;
    })
    console.log("alll alertsssssssssss", this.allalerts);

    this.checkAll = false;
    this.allalerts.forEach((element: any) => {
      element.checked = false;

    });
    this.Checklist = [];
    this.solvedIn = '';
    this.reason = '';
    this.isAttended = true;
    this.isConfirmed = true;
    this.isResolved = true;
    this.checkAll = false;
  }

  alertsbutton(type: any, event: any, alrtname: any, btn: any) {
    this.submitType = type;
    this.buttonType = btn;
    console.log("submit type issssssssss", this.submitType);
    console.log("button type issssssssss", this.buttonType);
    this.button_disabled = true;
    if (type != "resolved" && alrtname != "attended") {
      if (type != 'confirmed') {
        this.popupbutton = event == false ? "Attend" : "Resolve",
          this.state = event == false ? "Opened alerts" : "Attended alerts"
      } else {
        this.popupbutton = "confirmed";
        this.button_disabled = false;
        this.state = "confirmed alerts";
      }
    } else {
      this.popupbutton = "Confirm",
        this.state = "Resolved alerts"
    }
    console.log("selected button isss", event)
    if (type == 'attended') {
      if (event == false) {
        this.alertType = 'opened'
      } else if (event == true) {
        this.alertType = 'attended'
      }
    }

    console.log(this.alertType, "alert type isssss");
    console.log(this.tempAllAlerts,"temp")
    this.allalerts = this.tempAllAlerts.filter((ele: any) => {
      return ele[type] == event;
    })
    console.log("alll alertsssssssssss", this.allalerts);

    this.checkAll = false;
    this.allalerts.forEach((element: any) => {
      element.checked = false;

    });
    this.Checklist = [];
    this.solvedIn = '';
    this.reason = '';
    this.isAttended = true;
    this.isConfirmed = true;
    this.isResolved = true;
    this.checkAll = false;
  }


  openPopup() {
    if (this.alertType == 'attended') {
      jQuery('#attended').modal("show");
    } else if (this.alertType == 'opened') {
      jQuery('#opened').modal("show");
    } else {
      console.log("ssssssssssss", this.alertType)
      this.alertType = 'confirmed';
      jQuery('#confirmed').modal("show");
    }
  }

  resolvepopup() {
    jQuery("#popup").modal("show");
  }

  saveToAttend() {
    const body = {
      solvedIn: this.solvedIn
    }
    console.log("Post payload for moveing to attend", body);

    this.Service.saveAttendalert(this.alertId,body).subscribe(data => {
      this.toastr.success("Moved to attended successfully");

      this.getallalerts();
      this.solvedIn = '';
    }, err => {
      this.toastr.error("Error while moved to attended");
    })


  }

  saveToResolve() {
    const body = {
      reason: this.reason
    }
    console.log("Post payload for moveing to resolve", body);

    this.Service.saveResolvealert(this.alertId,body).subscribe(data => {
      this.toastr.success("Moved to Resolved successfully");

      this.getallalerts();
      this.reason = '';
    }, err => {
      this.toastr.error("Error while moved to resolved");

    })
  }

  saveConfirmalert() {
    this.Service.saveConfirmalert(this.alertId).subscribe(data => {
      this.toastr.success("Moved to Confirm successfully");
      this.getallalerts();
    }, err => {
      this.toastr.error("Error while moved to confirm");

    })
  }

  checkAllfn(event: any) {
    this.Checklist = [];
    this.allalerts.forEach((element: any, index: any) => {
      element.checked = event.target.checked;
    });
    this.checkAll = event.target.checked;
    this.isAttended = this.checkAll ? false : true;
    this.isConfirmed = this.checkAll ? false : true;
    this.isResolved = this.checkAll ? false : true;
    console.log(this.allalerts, "clicked in checkallfunction");
  }

  singleCheckFn(event: any, item: any, id: any) {
    this.alertId = item._id;
    const checkItems = _.filter(this.allalerts, (e: any) => {
      return e['checked'] == true;
    });
    console.log(checkItems, "selcted items list");
    this.checkAll = checkItems.length === this.allalerts.length ? true : false;
    if (checkItems.length == 0) {
      this.isAttended = true;
      this.isConfirmed = true;
      this.isResolved = true;
    } else if (checkItems.length > 0) {
      this.isAttended = false;
      this.isConfirmed = false;
      this.isResolved = false;
    }
    console.log(this.checkAll);
    console.log(this.allalerts);
  }

}
