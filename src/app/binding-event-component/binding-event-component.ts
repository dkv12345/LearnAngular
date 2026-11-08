import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-event-component',
  standalone: false,
  templateUrl: './binding-event-component.html',
  styleUrl: './binding-event-component.css',
})
export class BindingEventComponent {
  a:number=5
  b:number=10
  result:string="result here"
  doSolution(hsa:string,hsb:string):void{
    this.a=parseFloat(hsa)
    this.b=parseFloat(hsb)
    if(this.a==0 && this.b==0)
    {
      this.result="tùm lum nghiệm"
    }
    else if(this.a==0 && this.b!=0)
    {
      this.result="Không có nghiệm"
    }
    else
    {
      this.result="x="+(-this.b/this.a)
    }
  }
}
