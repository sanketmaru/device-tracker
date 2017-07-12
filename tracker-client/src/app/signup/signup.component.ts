import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpSuccess : boolean = false;

  constructor(private auth: AuthService) {
    debugger;
  }

  ngOnInit() {
  }

  onSignUp(credentials) {
    this.auth.signup(credentials).subscribe(function(resp){
      this.signUpSuccess = true;
    });
  }

}
