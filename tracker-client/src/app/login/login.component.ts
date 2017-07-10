import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  username: string;
  password: string;

  constructor(private auth: AuthService) {
    debugger;
  }

  ngOnInit() {
  }

  onLogin(credentials) {
    this.auth.login(credentials);
  }

}
