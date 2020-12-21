import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-resolved-tickets',
  templateUrl: './resolved-tickets.component.html',
  styleUrls: ['./resolved-tickets.component.css']
})
export class ResolvedTicketsComponent implements OnInit {
  resolvedtickets: any = [];
  selected: any;

  constructor(private http: HttpClient,
    public Service: Service,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.getresolvedtickets();
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

  closepopup(id: any) {
    this.selected = id;
    jQuery("#popup").modal("show");
  }

  closed(id: any) {
    console.log("fdfggrtytghfvhbghmbnbnbvnbnb");
    this.Service.getclose(id).subscribe(data => {
      // this.router.navigate(['/closed-tickets']);
      window.location.reload();
      console.log("closedd ticket iddddddddd", data);
    }, err => {
      console.log("error in closedticket iddddddd");
    })
  }

}
