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
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  opentickets: any = [];
  selected: any;
  checkAll: any = false;
  Clist: any = [];


  constructor(private http: HttpClient, private toastr: ToastrService,
    public Service: Service,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.gettableData();
  }

  // checkAllfn(ev: any) {
  //   if (ev.target.checked) {
  //     this.Clist.push(ev.target.value);
  //   }
  //   else {
  //     var i = 0;
  //     this.Clist.forEach(ele => {
  //       if (ele == ev.target.value) {
  //         this.Clist.splice(i, 1);
  //       }
  //       i++;
  //     });;
  //   }
  //   console.log("clisttttttttttttttttttt", this.Clist);
  //   this.checkAll = ev.target.checked
  // }

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
    }
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
        this.toastr.success("Ticket is resolved successful.");
      }, err => {
        this.toastr.error("Failed to resolve ticket.");
        console.log("error in rsv iddddddd");
      })
    });

  }
}
