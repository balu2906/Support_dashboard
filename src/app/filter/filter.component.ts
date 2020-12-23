import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service'
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
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
  filterdata :any ;
  filterstrike :any;
  constructor(private shared:SharedService) {
    this.shared.SharingData.subscribe((res:any) =>{
        this.filterdata = res;
    })
    this.shared.Sharingstrike.subscribe((res:any) =>{
      this.filterstrike =res;
     // console.log("dfgh",this.filterstrike);
      
    })
   }
   
 
  ngOnInit(): void {
   
  }
  change(){
    //console.log("stikres",this.strikes);
    
    this.shared.SharingData.next(this.assignee);
    this.shared.Sharingstrike.next(this.strikes);
    
  }
}
 