import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
<<<<<<< HEAD
import {SharedService} from '../shared/shared.service'
=======
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
>>>>>>> e4166bb3a8a230ab1d3998aee31f75cd4c1a5267



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  message:any;
  filters:any[];
  strikes:any = [];
  //peoplefilter:any = [];
  strikesMap = {
    'n' : 1,
    'u' : 2,
    'su' : 3
  }
  users=[{
    id:'123',
    email:'abc@gmail.com',
    Assignee: 'Jyothi',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    strikes : '1'
    

  },{
    id:'1234',
    email:'xyz@hotmail.com',
    Assignee: 'Jyothi',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    strikes : '3'
  },{
    id:'12345',
    email:'jsgsbh@kk.com',
    Assignee: 'neha',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    strikes : '1'
  },{
    id:'123456',
    email:'test@gmail.com',
    Assignee: 'Rinki',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    strikes : '2'
  },
  {
    id:'123456',
    email:'tst@gmail.com',
    Assignee: 'Rinki',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    strikes : '3'
  }
]

  opentickets: any = [];
  selected: any;
  constructor(private http: HttpClient,
    public Service: Service,
<<<<<<< HEAD
    private fb: FormBuilder,private shared:SharedService) { }
  

  ngOnInit() : void {
      this.shared.SharingData.subscribe(data=>{
        this.filters = (Object.keys(data).filter(key=>data[key] == true));
        
        this.message = data;
      console.log("assignees",this.filters);
      
     })
     this.shared.Sharingstrike.subscribe(strike =>{
      (Object.keys(strike).filter(key=>{
         if(strike[key] == true){
           return key;
         }}
         )).forEach(ele=>{
           this.strikes.push(this.strikesMap[ele]);
         });

         this.strikes = this.strikes.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
      })
       console.log("strikes",this.strikes);
      // var peoplefilter = (this.filters,this.strikes);
      //  console.log("after",peoplefilter);
       
       
     })

  
=======
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.gettableData()
>>>>>>> e4166bb3a8a230ab1d3998aee31f75cd4c1a5267
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
