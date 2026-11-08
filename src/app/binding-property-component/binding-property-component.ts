import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-property-component',
  standalone: false,
  templateUrl: './binding-property-component.html',
  styleUrl: './binding-property-component.css',
})
export class BindingPropertyComponent {
  public name: string = 'Nguyễn Thị Long Lanh'
  public email: string = 'longlanh@uel.edu.vn'
  public nameid:string='nameid'
  public emailid:string='emailid'
  public isDisabled: boolean = false
  public hello: string = 'Welcome to K24411E hehehe!!!!'
  public red_color: string = 'red'
  public advanced_message: string = '<font color="blue">This is advanced message</font>'
}
