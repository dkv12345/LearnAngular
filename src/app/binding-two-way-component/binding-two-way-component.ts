import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-two-way-component',
  standalone: false,
  templateUrl: './binding-two-way-component.html',
  styleUrl: './binding-two-way-component.css',
})
export class BindingTwoWayComponent {
  hsa:number=0
  hsb:number=0
  hsc:number=0
  result:string=""
  giaiPtb2()
  {
    if(this.hsa==0)
    {
      if(this.hsb==0 && this.hsc==0)
      {
        this.result="INFINITY!!!!!!!!!"
      }
      else if(this.hsb==0 && this.hsc!=0)
      {
        this.result="NO SOLUTION!"
      }
      else
      {
        this.result="No="+(-this.hsc/this.hsb)
      }
    }
    else
    {
      let delta=Math.pow(this.hsb,2)-4*this.hsa*this.hsc
      if(delta<0)
      {
        this.result="<font color='red'>No SOLUTION</font>"
      }
      else if(delta==0)
      {
        this.result="x1=x2="+(-this.hsb/2*this.hsa)
      }
      else
      {
        let x1=(-this.hsb-Math.sqrt(delta))/(2*this.hsa)
        let x2=(-this.hsb+Math.sqrt(delta))/(2*this.hsa)
        this.result="<font color='red'>X1="+x1+"</font><br/><font color='purple'>X2="+x2+"</font>"
      }
    }
  }
}
