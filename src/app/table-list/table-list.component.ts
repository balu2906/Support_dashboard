import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  opentickets: any = [];
  selected: any;
  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.gettableData()
  }

  gettableData() {
    this.Service.gettableData().subscribe(data => {
      this.opentickets = data;
      console.log("ttttttttttttttttttttt", this.opentickets)
      console.log("OPEN TICKETS DATAAAA", data)
    }, err => {
      console.log("ERROR IN OPEN TICKETS DATAAAA");

    })
  }

  resolvepopup(id: any) {
    this.selected = id;
    jQuery("#popup").modal("show");
  }
  
  rsv(id: any) {
    console.log("slkdfjaslkdfjlaksdfjlkasdfj");
    this.Service.getrsv(id).subscribe(data => {
      console.log("resolved ticket iddddddddd", data);
      // this.router.navigate(['/resolved-tickets']);
      window.location.reload();
    }, err => {
      console.log("error in rsv iddddddd");
    })
  }
}
