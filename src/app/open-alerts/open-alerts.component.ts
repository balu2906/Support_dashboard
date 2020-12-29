import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import * as _ from 'underscore';
declare var jQuery: any;

@Component({
  selector: 'app-open-alerts',
  templateUrl: './open-alerts.component.html',
  styleUrls: ['./open-alerts.component.css']
})
export class OpenAlertsComponent implements OnInit {
  allalerts: any = [];
  Checklist: any = [];
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

  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getallalerts();
  }


  getallalerts() {
    this.Service.getallalerts().subscribe(data => {
      this.allalerts = data;
      this.tempAllAlerts = data;
      console.log("OPEN ALERTS DATAAA", this.allalerts);
      if (this.alertType != 'all') {
        console.log(this.alertType, "alert type issssss");
        console.log(this.submitType, "submit type issssss");
        console.log(this.buttonType, "button type isssss");
        this.submitType = this.submitType == 'attended' ? 'resolved' : this.submitType == 'resolved' ? 'confirmed' : this.submitType;
        console.log("after checking submit type issss", this.submitType);
        this.allalerts = this.tempAllAlerts.filter((ele: any) => {
          ele.checked = false;
          if (this.buttonType == 'opened') {// defaultly, button type is opened, so that the alerts data will be filtered with in if condition
            return ele['attended'] == false && ele['resolved'] == false && ele['confirmed'] == false;
          }
          else if (this.alertType == 'attended') {
            return ele['attended'] == true && ele['resolved'] == false;
          }
          else if (this.submitType == 'resolved') {
            return ele['attended'] == true && ele['resolved'] == true && ele['confirmed'] == false;
          }
          else if (this.submitType == 'confirmed') {
            return ele['attended'] == true && ele['resolved'] == true && ele['confirmed'] == true;
          }
        });
        this.isAttended = true;
        this.isConfirmed = true;
        this.isResolved = true;
        this.checkAll = false;
      }
    }, err => {
      console.log("OPEN ALERTS ERRORRRRRRRRRRRRRRR");
    })
  }


  alertsbuttonA(type: any, event: any, type2: any, event2: any, alrtname: any) {
    // this.alertType = type;
    this.submitType = type2;
    console.log("sssssssssssssssssssssssss", this.submitType);
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
        this.alertType == 'confirmed'
      }
    }
    // type = type == 'opened' ? 'attended' : type;
    console.log("alerttypealerttype attended", this.alertType);
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
    // this.alertType = type;
    this.submitType = type;
    this.buttonType = btn;
    console.log("sssssssssssssssssssssssss", this.submitType);
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
    // type = type == 'opened' ? 'opened' : type;
    if (type == 'attended') {
      if (event == false) {
        this.alertType = 'opened'
      } else if (event == true) {
        this.alertType = 'attended'
      }
    }

    // this.alertType = 'opened'
    // this.alertType = type == 'opened'?'opened':type == 'attended'?'attended':'confirmed'
    // this.alertType = type == 'resolved' ? 'confirmed' : type;
    console.log(this.alertType, "alert type isssss");
    this.allalerts = this.tempAllAlerts.filter((ele: any) => {
      // console.log("eeeeeeeeeeeeeeeee", ele)
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


  //popups
  openPopup() {
    // jQuery(`'#${this.alertType}'`).modal("show");
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
    const body: any = {
      ids: this.Checklist,
      solvedIn: this.solvedIn
    }
    console.log("Post payload for moveing to attend", body);

    this.Service.saveAttendalert(body).subscribe(data => {
      console.log("Moved to attended successful");
      this.getallalerts();
    }, err => {
      console.log("error in resolveticket iddddddd");
    })


  }

  saveToResolve() {
    const body: any = {
      ids: this.Checklist,
      reason: this.reason
    }
    console.log("Post payload for moveing to resolve", body);

    this.Service.saveResolvealert(body).subscribe(data => {
      console.log("Moved to resolve successful");
      this.getallalerts();
    }, err => {
      console.log("error in resolveticket iddddddd");
    })
  }

  saveConfirmalert() {
    const body: any = {
      ids: this.Checklist,
    }
    console.log("Post payload for moveing to confirm", body);

    this.Service.saveConfirmalert(body).subscribe(data => {
      console.log("Moved to Confirm successful");
      this.alertType = 'resolved';
      this.getallalerts();
    }, err => {
      console.log("error in confirm ticket iddddddd");
    })
  }

  checkAllfn(event: any) {
    this.Checklist = [];
    this.allalerts.forEach((element: any, index: any) => {
      element.checked = event.target.checked;
      this.Checklist.push(element.alert._id);
    });
    this.checkAll = event.target.checked;
    this.isAttended = this.checkAll ? false : true;
    this.isConfirmed = this.checkAll ? false : true;
    this.isResolved = this.checkAll ? false : true;
    console.log(this.allalerts, "clicked in checkallfunction");
  }

  singleCheckFn(event: any, item: any, id: any) {
    console.log("itemitemitem", item)
    if (event.target.checked == true) {
      this.allalerts[id]['checked'] = true;
      this.Checklist.push(item.alert._id);
    } else {
      this.Checklist = _.filter(this.Checklist, (e: any) => {
        return e != item._id
      })
    }
    console.log("checklisstttttttttttttttttttttt", this.Checklist);

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
