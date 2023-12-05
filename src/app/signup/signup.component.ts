import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  signupForm: FormGroup;
  showPassword: boolean = false;

  // Replace this with the actual URL of your backend API
  apiUrl = 'https://example.com/api/register';

  constructor(private fb: FormBuilder, private http: HttpClient) {this.signupForm = this.fb.group({
    fullName: ['', Validators.required],
    mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator]],
    confirmPassword: ['']
  }, { validator: this.matchPasswords('password', 'confirmPassword') });
}
passwordValidator(control: FormControl): {[key: string]: any} | null {
  const password = control.value;
  if ((password.match(/[^a-zA-Z0-9]/g) || []).length < 2) {
    return { 'specialCharError': 'Password must contain at least 2 special characters' };
  }
  return null;
}
matchPasswords(password: string, confirmPassword: string) {
  return (group: FormGroup) => {
    let pass = group.controls[password];
    let confirmPass = group.controls[confirmPassword];

    return pass.value === confirmPass.value ? null : { 'mismatch': true };
  };
}

  onSubmit() {
    const userData = {
      fullName: this.fullName,
      mobileNumber: this.mobileNumber,
      email: this.email,
      password: this.password
    };

    this.http.post(this.apiUrl, userData).subscribe(
      (response) => {
        console.log('Registration successful', response);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
