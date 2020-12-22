import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  SharingData = new Subject(); 
  Sharingstrike = new Subject(); 
  constructor() { }

  // setMessage(data){
  //   this.SharingData =data;
  //   console.log("hfhgffhgfhg",this.SharingData);
    
  // }
  // getMessage(){
  //   return this.SharingData 
  // }
 }
