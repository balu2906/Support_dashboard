import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery: any;
import { Service } from '../service/service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Router} from "@angular/router"
import { auth } from 'googleapis/build/src/apis/redis';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showSpinner = false;
  showAdmin: Boolean = false;
  name: any;
  email: any;
  password: any;
  teammembers: any = [];
  teammemberStatic: any = [];
  checkAll: any;
  Clist: any = [];
  typeCheck: any = ''
  selectedDevice:any = '';
  token:any;
  Users:any = [];

  constructor(private _router:Router,private http: HttpClient, public Service: Service, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getteammembers();
    var auth  = localStorage.getItem('token')
    var user = localStorage.getItem('UserType')
    // console.log("existing users ",auth);
    if(!auth){
      this._router.navigate(["/login"])
    }
    if(user == "admin"){
      this.showAdmin = true;
    }
    // if()
    
  }

  create() {
    jQuery("#preview").modal("show");
  }

  loading_spinners: Boolean = false;
  teammember() {
    this.loading_spinners = true;
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      s_type: this.typeCheck,
    }
    const httpHeaders:HttpHeaders = new HttpHeaders(
      {Authorization:`Bearer ${this.token}`}
    )
    // headers.append("Authorization","Bearer "+ t)
    console.log("headersss ",httpHeaders);
    console.log(user)
    this.Service.postteammember(user).subscribe(userData => {
      console.log("team member dataaa is herrrrreeeee", userData);
      jQuery("#preview").modal("hide");
      this.loading_spinners = false;
      var dataInfo: any = userData;
      this.toastr.success(dataInfo.message);
      this.getteammembers();
      this.name = '';
      this.email = '';
      this.password = '';
      this.typeCheck = '';

    }, err => {
      console.log("error", err);
      this.toastr.error(err.error.message);

    })
  }
  getteammembers() {
    this.showSpinner = true;
    // var t = localStorage.getItem('token')
    // const httpHeaders:HttpHeaders = new HttpHeaders(
    //   {Authorization:`Bearer ${t}`}
    // )
    // // headers.append("Authorization","Bearer "+ t)
    // console.log("headersss ",httpHeaders);
    // // var headers = new Headers();
    
    this.Service.getteammembersAdmin().subscribe(data => {
      this.showSpinner = false;
      this.teammembers = data;
      this.teammemberStatic = data;
      // const users =[]
      // this.teammembers.forEach(element => {
      //   if(element.s_type !='admin'){
      //     users.push(element.name)
      //   }
        
      // });
      // console.log("Users", users)
      // // console.log("teamMemberstaticcccccccccc", this.teammemberStatic);
      // // console.log("getteammembersssssssss", data, users);
      // // localStorage.setObj(users)
      // localStorage.setItem("users", JSON.stringify(users));
      const users =[]
      this.teammembers.forEach(element => {
        if(element.s_type != 'admin'){
          users.push(element.name)
        }
      // let users = this.teammembers.filter((person) =>{
      //       return person.admin != 'admin'
      })
      this.Users = users
      console.log("Users", this.Users)
      localStorage.setItem("users", JSON.stringify(users));
    }, err => {
      console.log("ERROR IN TEAM MEMBERS DATAAAA");

    })
  }
  
  deletepopup() {
    if (this.Clist.length == 0) {
      this.toastr.error("please select atleast one checkbox");
      return false;
    }
    else {
      jQuery("#popup").modal("show");

    }
  }

  checkAllfn(event: any) {
    this.teammembers.map((el: any) => {
      el.checked = event.target.checked
    })
    console.log(this.teammembers);
    // console.log("length ",this.checkAll.length)
    // this.checkAll = event.target.checked
  }

  checkSingle(item: any, i: any, event: any) {
    const checkedArray = _.filter(this.teammembers, (e: any) => {
      return e.checked == true
    })
    console.log(checkedArray, "checked items isssssss")

    this.checkAll = checkedArray.length === this.teammembers.length ? true : false
    console.log(this.checkAll);
    console.log(this.teammembers);
    if (event.target.checked) {
      this.Clist.push(item._id);
    }else{
      const index = this.Clist.findIndex(list => list == item._id);//Find the index of stored id
      this.Clist.splice(index, 1); // Then remove
    }
    console.log("clisttttttttttttttttttt", this.Clist);
  }

  loading_spinner: Boolean = false;
  postdelete() {
    this.loading_spinner = true;
    console.log("kjhdkjdfjkgkj", this.Clist);
    const delid = {
      ids: this.Clist
    }
    console.log("deleted id's ", delid);
    this.Service.postdelete(delid).subscribe(data => {
      let i = 0;
      jQuery("#popup").modal("hide");
      this.loading_spinner = false;
      let dataInfo: any = data;
      this.toastr.success(dataInfo.message);
      this.getteammembers();


    }, err => {
      console.log("errorrrrr", err);
      this.toastr.error(err.error.message);
    })
  }
  // selectType(event: any) {
  //   if (this.typeCheck) {
  //     this.teammembers = _.filter(this.teammemberStatic, (ele: any) => {
  //       return ele.s_type === this.typeCheck
  //     })
  //   }
  //   console.log("typecheckchecktypecheck", this.typeCheck);
  // }
  
  onChange(newValue) {
    console.log(newValue);
    this.selectedDevice = newValue;
    console.log("selectiondevice ",this.selectedDevice)
    if(this.selectedDevice != 'all'){
      this.teammembers = _.filter(this.teammemberStatic, (ele: any) => {
        return ele.s_type === this.selectedDevice
      })
      console.log("selected person's data ",this.selectedDevice);
  
    }else{
      this.teammembers = _.filter(this.teammemberStatic, (ele: any) => {
        return ele.s_type
      })
    }
    // console.log("selected person's data ",this.teammember);
    
    
    // ... do other stuff here ...
  }
}
