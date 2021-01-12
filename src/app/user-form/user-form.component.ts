import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { Router } from "@angular/router"
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  rating: any;
  message: any;
  response: any = [];
  email: any;
  loading_spinner: Boolean = false;


  constructor(public Service: Service, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  feedback() {
    this.loading_spinner = true;
    const userData = {
      email:this.email,
      rating: this.rating,
      message: this.message,
    }
    console.log("feedback detailsssssss ", userData);
    this.Service.postfeedback(userData).subscribe(userData => {
      var dataInfo: any = userData;
      this.toastr.success(dataInfo.message)
      this.loading_spinner = false;
      this.rating = '';
      this.message = '';
      this.email=""
    }, err => {
      let error = err
      console.log("error message ", error);
      this.toastr.error(error.error.message);
    })

  }


}
