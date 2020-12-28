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
        this.allalerts = this.tempAllAlerts.filter((ele: any) => {
          ele.checked = false;
          return ele[this.alertType] == (this.alertType == 'opened') ? false : true;
        })
      }

    }, err => {
      console.log("OPEN ALERTS ERRORRRRRRRRRRRRRRR");

    })
  }

  alertsbutton(type: any, event: any, alrtname: any) {
    this.alertType = type;
    this.submitType = type;
    console.log(this.submitType);
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
    type = type == 'opened' ? 'attended' : type;
    this.alertType = type == 'resolved' ? 'confirmed' : type;
    console.log(this.alertType, "alert type isssss");
    this.allalerts = this.tempAllAlerts.filter((ele: any) => {
      console.log("eeeeeeeeeeeeeeeee", ele)
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
    console.log(this.Checklist);

    const checkItems = _.filter(this.allalerts, (e: any) => {
      return e['checked'] == true;
    });
    console.log(checkItems, "selcted items list");
    this.checkAll = checkItems.length === this.allalerts.length ? true : false;
    console.log(this.checkAll);
    console.log(this.allalerts);
  }

}
