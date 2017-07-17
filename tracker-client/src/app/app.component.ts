import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Device Tracker!';
  loggedInUser : any;
  isLoggedIn : boolean = false;

  constructor(private auth:AuthService, private router:Router){

  }

  ngOnInit() {
    this.loggedInUser = this.auth.getLoggedInUser();
    if(this.loggedInUser) {
      this.isLoggedIn = true;
    }
  }

  logout(){
    this.auth.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
