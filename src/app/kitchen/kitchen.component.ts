import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  oven: Oven;
  smallbowl: Smallbowl;
  bigbowl: Bigbowl;

  eggs$!: Observable<Egg[]>;
  salt$!: Observable<any>;
  butter$!: Observable<any>;

  constructor(private cupcakeFactory: CupcakeFactory) {
    this.oven.preheat(100);
  }

  ngOnInit() {}
}

class Oven {
  temperature: BigInteger;
  public preheat(temp) {
    this.temperature = temp;
  }
}

class Smallbowl {}

class Bigbowl {}

class CupcakeFactory {}

class Egg {}
