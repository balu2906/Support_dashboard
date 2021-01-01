import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  mobilenumber = "^(\\+\\d{1,3}[- ]?)?\\d{10}$";
  profileForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    mobilenumber: ['', [Validators.required, Validators.pattern(this.mobilenumber)]],
    email: ['', Validators.required],
    problemtype: ['select', Validators.required],
    assignee: ['select', Validators.required],
    description: ['', Validators.required]
  });


  constructor(public Service: Service, private toastr: ToastrService, private fb: FormBuilder) {
  }

  ngOnInit() {
  

  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }

  get f() {
    return this.profileForm.controls;
  }

  loading_spinner: Boolean = false;
  postticket() {
    this.loading_spinner = true;

    console.log(this.profileForm.value, this.profileForm.get('username').value);

    const userData = {
      name: this.profileForm.get('username').value,
      mobileNumber: this.profileForm.get('mobilenumber').value,
      email: this.profileForm.get('email').value,
      problemtype: this.profileForm.get('problemtype').value,
      assignee: this.profileForm.get('assignee').value,
      description: this.profileForm.get('description').value,
    }
    this.Service.postticket(userData).subscribe(userData => {
      console.log("userdata is hereeeeeeeeeeeee", userData);
      this.toastr.success("Ticket created successfully");
      this.loading_spinner = false;
    }, err => {
      console.log("error", err);

      this.toastr.error("Error while create ticket");

    })
  }

}
