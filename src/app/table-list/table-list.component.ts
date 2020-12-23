import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as _ from 'underscore';
import * as $ from 'jquery';
declare var jQuery: any;





@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  opentickets: any = [];
  selected: any;
  checkAll: any;
  Clist: any = [];

  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.gettableData();
  }

  checkAllfn(ev: any) {
    if (ev.target.checked) {
      this.Clist.push(ev.target.value);
    }
    else {
      var i = 0;
      this.Clist.forEach(ele => {
        if (ele == ev.target.value) {
          this.Clist.splice(i, 1);
        }
        i++;
      });;
    }
    console.log("clisttttttttttttttttttt", this.Clist);
  }


  gettableData() {
    this.Service.gettableData().subscribe(data => {
      // let opentickets : any = [];
      this.opentickets = data;
      console.log("ttttttttttttttttttttt", this.opentickets)
      console.log("OPEN TICKETS DATAAAA", data)
    }, err => {
      console.log("ERROR IN OPEN TICKETS DATAAAA");

    })
  }

  resolvepopup() {
    jQuery("#popup").modal("show");
  }
  rsv() {
    this.Clist.forEach(ele => {
      this.Service.getrsv(ele).subscribe(data => {
        let i = 0;
        this.opentickets.forEach(element => {
          if (element._id == ele) {
            this.opentickets.splice(i, 1);
          }
          i++;
        });
      }, err => {
        console.log("error in rsv iddddddd");
      })
    });

  }
}
