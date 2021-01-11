import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms"
import {Router} from "@angular/router"
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
 


  constructor(private _router:Router,public Service: Service, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  response:any;
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  showSpinner: Boolean = false;
  moveToRegister(){ 
    this.showSpinner = true;
    const userData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }
    console.log("login details ",userData);
    this.Service.Authentication(userData).subscribe(userData => {
      this.response  = userData
      console.log("user Token hereeeeeeeeeeeee",this.response.Token);
      console.log("UserDataaa ",this.response);
      
      localStorage.setItem('token',this.response.Token)
      localStorage.setItem('UserType',this.response.user.s_type)
      this.toastr.success(this.response.message);
      this.showSpinner = false;
      if(this.response.user.s_type == 'support'){
        this._router.navigate(["/dashboard"])
      }
      if(this.response.user.s_type == 'admin'){
        this._router.navigate(['/admin'])
      } 
      if(this.response.user.s_type == 'tech'){
        this._router.navigate(['/table-list'])
      }
    }, err => {
      let error = err
      console.log("error message ",error);
      this.toastr.error(error.error.message);
      this.showSpinner = false;


    })
    
  }

}
