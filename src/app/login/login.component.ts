import { Component, OnInit } from '@angular/core';
//import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  //constructor(private authService: AuthService) { }

  ngOnInit(): void {
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
