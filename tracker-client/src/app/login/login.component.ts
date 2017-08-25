import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from "../services/auth.shared-service"

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
  loggedInUser: boolean = false;
  username: string;
  password: string;
  loginError: string = '';

  constructor(private auth: AuthService, private router: Router, private _sharedService: SharedService) {
  }

  ngOnInit() {
    this.loggedInUser = this.auth.getLoggedInUser();
    if (this.loggedInUser) {
      this.router.navigate(['map']);
    }
  }

  onLogin(credentials) {
    this.auth.login(credentials).subscribe(
      data => {
        //TODO move this to persistence service
        let user = { 'token': data.token, username: data.username, _id: data._id };
        localStorage.setItem('user', JSON.stringify(user));
        this._sharedService.sendMessage("User Logged in Successfully!");
        this.router.navigate(['map']);
      },
      error => {
        this.loginError = JSON.parse(error._body).message || error.statusText;
      }
    );;
  }

}
