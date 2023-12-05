import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

//import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  passwordValidator(control: FormControl): {[key: string]: any} | null {
    const password = control.value;
    if (password.length < 6) {
      return { 'lengthError': 'Password must be at least 6 characters long' };
    }
    if ((password.match(/[^a-zA-Z0-9]/g) || []).length < 2) {
      return { 'specialCharError': 'Password must contain at least 2 special characters' };
    }
    return null;
  }

  //constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
    // Implement your login logic here
    console.log('Login attempt:', this.username, this.password);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  //login() {
    // Call the AuthService to authenticate the user
   //this.authService.login(this.username, this.password).subscribe(
     // (response) => {
        // Authentication successful, handle redirection or other actions
    //  },
     // (error) => {
        // Authentication failed, handle error messages
     // }
   // );
  //}
}
