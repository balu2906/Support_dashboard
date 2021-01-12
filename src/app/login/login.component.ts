import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { Service } from '../service/service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private _router: Router, public Service: Service, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  response: any;
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  showSpinner: Boolean = false;
  moveToRegister() {
    this.showSpinner = true;
    const userData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }
    console.log("login details ", userData);
    this.Service.Authentication(userData).subscribe(userData => {
      this.response = userData;
      console.log("userdata is hereeeeeeeeeeeee", this.response.Token);
      console.log("sssssssssuserrrrrrrrrrrr", this.response.user)
      localStorage.setItem('token', this.response.Token)
      localStorage.setItem('user', JSON.stringify(this.response.user))
      this.toastr.success(this.response.message);
      this.showSpinner = false;
      this._router.navigate(["/dashboard"])
    }, err => {
      let error = err
      console.log("error message ", error);
      this.toastr.error(error.error.message);
      this.showSpinner = false;


    })

  }

}
