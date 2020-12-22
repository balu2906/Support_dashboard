import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items:any[] , field:string , value:any , field2?:any , value2?:any): any[] {
    console.log("values",items,value,field);
    console.log("values2",value2,field2);
    
    if(!items){
      return [];
    }

    if(value.length<=0 && value2.length<=0){
      console.log("coming");
      
      return items;
    }
    
    if(value2.length >0 && value.length>0){
      console.log("inif" , value);
      let result:any = [];
      let re:any = [];
      for(var i = 0;i<value.length;i++){
        let arr =  items.filter(item=> item[field].toLowerCase().includes(value[i].toLocaleLowerCase()))
        arr.forEach(ele=>{
         result.push(ele);
        })
    
      }
      
      
      for(var j = 0;j<value2.length;j++){
       var arr2 = result.filter(item => item[field2].toLowerCase() == value2[j]);
       arr2.forEach(ele =>{
         re.push(ele)
       })
     }
    
     return re;
      
    }
    if(value2.length <=0 && value.length>0){
    console.log("else");
    let result:any = [];
    for(var i = 0;i<value.length;i++){
     let arr =  items.filter(item=> item[field].toLowerCase().includes(value[i].toLocaleLowerCase()));
      arr.forEach(ele=>{
        result.push(ele);
      })
    }
    console.log("yes",result);
    return result;
    }
    if(value.length <=0 && value2.length >0){
      console.log("only strikes");
      
      let strikess:any = [];
      for(var k = 0;k<value2.length;k++){
        let arr =  items.filter(item=> item[field2].toLowerCase() == value2[k]);
        console.log("strike results",arr);
        
        arr.forEach(ele=>{
          strikess.push(ele);
        })
      }
      console.log("yes",strikess);
      return strikess;
      }
   
  }

}
