import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: any;
  @Output() onView = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  view(value) {
    this.onView.emit(value);
  }



}
