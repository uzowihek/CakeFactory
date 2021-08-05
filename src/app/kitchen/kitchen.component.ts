import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  oven Oven;

  eggs$!: Observable<Egg[]>;
  salt$!: Observable<any>;
  butter$!: Observable<any>;

  constructor() { }

  ngOnInit() {
  }

}