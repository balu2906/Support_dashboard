import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-closed-alerts',
  templateUrl: './closed-alerts.component.html',
  styleUrls: ['./closed-alerts.component.css']
})
export class ClosedAlertsComponent implements OnInit {
  confirmdata: any = [];
  closeddata: any = [];
  closedalerts:any=[]
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
    public Service: Service,
    private fb: FormBuilder,private _router:Router) { }

  ngOnInit(): void {
    this.getclosedalerts();
    var auth  = localStorage.getItem('token')
    console.log("existing users ",auth);
    if(!auth){
      this._router.navigate(["/login"])
    }
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
  getclosedalerts() {
    this.Service.getclosedalerts().subscribe(data => {

      this.confirmdata = data;
      this.confirmdata.forEach(element => {
        Object.keys(element.alert).forEach(key=>{
          element[key] = element.alert[key];  
        })
      });
      console.log("Fomated confirmed Data: ",this.confirmdata);
      console.log("CLOSED ALERTS DATAAAAAAAAA", this.confirmdata);
    },
      err => {
        console.log("CLOSED ALERTS ERRORRRRRR");
      })
  }

}
