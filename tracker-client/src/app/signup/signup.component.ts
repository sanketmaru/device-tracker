import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpSuccess : boolean = false;
  observable: Observable<any>;

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    // subscribe to the observable
    this.observable = this.auth.signUpNotification$;
    this.observable.subscribe(
        data => {
          this.signUpSuccess = true;
        }
    );
  }

  onSignUp(credentials) {
    this.auth.signup(credentials);
  }

}
