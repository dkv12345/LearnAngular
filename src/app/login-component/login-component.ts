import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface UserLogin {
  username: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login-component.html',
})
export class LoginComponent {
  readonly user: UserLogin = {
    username: '',
    password: '',
    rememberMe: false,
  };

  loginMessage = '';

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.loginMessage = `Login form submitted for ${this.user.username}.`;
  }
}
