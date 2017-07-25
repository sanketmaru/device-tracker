import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpSuccess : boolean = false;
  signUpError : string;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onSignUp(credentials) {
    this.userService.save(credentials)
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
