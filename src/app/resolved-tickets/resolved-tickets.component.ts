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
<<<<<<< HEAD
  asigne:any =[];
  strike:any = [];
  query = "'Assignee':asigne";
  users=[{
    id:'123',
    email:'abc@gmail.com',
    Assignee: 'Jyothi',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    Strikes : '1'
    
=======
  resolvedtickets: any = [];
  selected: any;
>>>>>>> e4166bb3a8a230ab1d3998aee31f75cd4c1a5267

  },{
    id:'1234',
    email:'xyz@hotmail.com',
    Assignee: 'Jyothi',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    Strikes : '3'
  },{
    id:'12345',
    email:'jsgsbh@kk.com',
    Assignee: 'neha',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    Strikes : '1'
  },{
    id:'123456',
    email:'test@gmail.com',
    Assignee: 'Rinki',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    Strikes : '2'
  },
  {
    id:'123456',
    email:'tst@gmail.com',
    Assignee: 'Rinki',
    Description : 'ksdjhfkjsadf',
    date:'12/12/2020',
    remainingtime : '23:0:0',
    Strikes : '3'
  }
]
assignee = {
  "jyothi" : '',
  "Rinki" : '',
  "neha" : '',
}
strikes = {
    'n' : '',
    'u' : '',
    'su' : ''
}
strikesMap = {
  'n' : 1,
  'u' : 2,
  'su' : 3
}

  
  constructor(private http: HttpClient,
    public Service: Service,
<<<<<<< HEAD
    private fb: FormBuilder) {

     }
=======
    private fb: FormBuilder,
    private router: Router) { }
>>>>>>> e4166bb3a8a230ab1d3998aee31f75cd4c1a5267

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
  changestrike(){
    this.strike = [];
    Object.keys(this.strikes).filter(key=>this.strikes[key] == true)
    .forEach(ele=>{
      this.strike.push(this.strikesMap[ele]);
    });
console.log("str on ch",this.strikes,this.strike);

    this.strike = this.strike.filter(function(elem, index, self) {
     return index === self.indexOf(elem);
    })
  }

  changeassignee(){
    this.asigne = (Object.keys(this.assignee).filter(key=>this.assignee[key] == true))
    console.log("assignees",this.asigne);

    
  }  
    
    // this.shared.SharingData.next(this.assignee);
    // this.shared.Sharingstrike.next(this.strikes);
    
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

