import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-closed-alerts',
  templateUrl: './closed-alerts.component.html',
  styleUrls: ['./closed-alerts.component.css']
})
export class ClosedAlertsComponent implements OnInit {
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

  constructor(private http:HttpClient,
    public Service: Service,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getclosedalerts();
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
      this.closedalerts = data;
      console.log("closed alerts" , this.closedalerts);
      console.log("CLOSED ALERTS DATAAAAAAAAA", data);
    },
    err => {
      console.log("CLOSED ALERTS ERRORRRRRR");
    })
  }

}
