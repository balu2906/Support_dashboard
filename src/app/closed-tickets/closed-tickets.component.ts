import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {
  showSpinner = false;
  closedtickets : any = [];
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
    public Service: Service,
    private fb: FormBuilder,private _router:Router) { }

  ngOnInit(): void {
    this.getclosedtickets();
    var auth  = localStorage.getItem('token')
    console.log("existing users ",auth);
    if(!auth){
      this._router.navigate(["/login"])
    }
    
  }

  getclosedtickets() {
    this.showSpinner = true;
    this.Service.getclosedtickets().subscribe(data => {
      this.showSpinner = false;
      this.closedtickets = data;
      console.log("closed tickets dataaaaa", this.closedtickets);
      console.log("CLOSED DATA TICKETSSSSSS", data)
    }, err => {
      console.log("CLOSEDD TICKETS ERRORRRRRRRRRRRRRRR");

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


}
