import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {
  deviceList : Array<any>;
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {

    this.userService.get().subscribe(data => {
      this.deviceList = data;
    });

  }

  viewDevice(user) {
    this.userService.setSelectedUser(user);
    this.router.navigate(['map']);
  }

}
