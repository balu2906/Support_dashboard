import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery';
declare var jQuery: any;



@Component({
  selector: 'app-resolved-tickets',
  templateUrl: './resolved-tickets.component.html',
  styleUrls: ['./resolved-tickets.component.css']
})
export class ResolvedTicketsComponent implements OnInit {
  resolvedtickets: any = [];
  selected: any;
  Checklist: any = [];


  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder,
    private router: Router) { }

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

  closepopup() {
    jQuery("#popup").modal("show");
  }
  closed() {
    this.Checklist.forEach(element => {
      this.Service.getclose(element).subscribe(data => {
        let i = 0;
        this.resolvedtickets.forEach(ele => {
          if (ele._id == element) {
            this.resolvedtickets.splice(i, 1);
          }
          i++;
        });
      }, err => {
        console.log("error in closedticket iddddddd");
      })

    });

  }

}
