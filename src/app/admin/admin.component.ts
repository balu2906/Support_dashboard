import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery: any;
import { Service } from '../service/service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showSpinner = false;
  name: any;
  email: any;
  password: any;
  teammembers: any = [];
  teammemberStatic: any = [];
  checkAll: any;
  Clist: any = [];
  typeCheck: any = ''





  constructor(private http: HttpClient, public Service: Service, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getteammembers();
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
      s_type: this.typeCheck
    }
    console.log(user)
    this.Service.postteammember(user).subscribe(userData => {
      console.log("team member dataaa is herrrrreeeee",userData);
      this.toastr.success("Team member created Successfully");
      jQuery("#preview").modal("hide");
      this.loading_spinners = false;

      this.getteammembers();
      this.name = '';
      this.email = '';
      this.password = '';
      this.typeCheck = '';

    }, err => {
      console.log("error", err);

      this.toastr.error("Error while creating team member");

    })
  }
  getteammembers() {
    this.showSpinner = true;

    this.Service.getteammembers().subscribe(data => {
      this.showSpinner = false;
      this.teammembers = data;
      this.teammemberStatic = data;
      console.log("teamMemberstaticcccccccccc", this.teammemberStatic);
      console.log("getteammembersssssssss", data);

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
    this.checkAll = event.target.checked
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

      this.toastr.success("TeamMember has been deleted successful.");
      this.getteammembers();


    }, err => {
      this.toastr.error("Failed to delete TeamMember.");
    })

  }
  selectType(event: any) {
    if (this.typeCheck) {
      this.teammembers = _.filter(this.teammemberStatic, (ele: any) => {
        return ele.s_type === this.typeCheck
      })
    }
    console.log("typecheckchecktypecheck", this.typeCheck);
  }


}
