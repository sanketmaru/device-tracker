import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpSuccess : boolean = false;
  signUpError : string;
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  onSignUp(credentials) {
    this.auth.signup(credentials)
    .subscribe(
        data => {
          this.signUpSuccess = true;
        },
        error => {
          this.signUpError = JSON.parse(error._body).message || error.statusText;
        }
      );;
  }

}
