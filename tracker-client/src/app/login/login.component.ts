import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Observable} from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  observable: Observable<any>;
  loggedInUser : boolean = false;
  username: string;
  password: string;

  constructor(private auth: AuthService,private route: ActivatedRoute,
        private router: Router) {

  }

  ngOnInit() {
    // subscribe to the observable
    this.observable = this.auth.loginNotification$;
    this.observable.subscribe(
        data => {
          this.router.navigate(['map']);
        }
    );

    this.loggedInUser = this.auth.getLoggedInUser();
    if(this.loggedInUser) {
      this.router.navigate(['map']);
    }
  }

  onLogin(credentials) {
    this.auth.login(credentials);
  }

}
