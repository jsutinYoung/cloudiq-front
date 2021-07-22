import { Component, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!]).{8,}$/
    ),
  ]);

  constructor(private router: Router, private authService: AuthService) {}
  //Error message for invalid input
  getErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('minlength')) {
      return 'You must enter at least 8 character';
    }

    //character mix requirements
    return 'Must include at least 1 digit, 1 lower case , 1 upper case, 1 special character';
  }

  getErrorEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onClickLogin(user, pass) {
    // const { status, description } = this.authService.login(user, pass);
    // if (status === true) {
    //   this.router.navigate(['home']);
    // }

    this.authService.login(user, pass).then((res) => {
      if (res.status == true) {
        this.router.navigate(['home']);
      }
    });
  }
}
