import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  oven: Oven;
  mediumBowl: Bowl;
  bigBowl: Bowl;
  cupcakePan: cupcakePan;

  eggs$!: Observable<Egg[]>;
  salt$!: Observable<any>;
  butter$!: Observable<any>;
  sugar$!: Observable<any>;
  flour$!: Observable<any>;
  bakingPowder$!: Observable<any>;
  oil$!: Observable<any>;
  vanilla$!: Observable<any>;

  constructor(private cupcakeFactory: CupcakeFactory) {
    this.oven.preheat(350);
    this.mediumBowl.add(this.flour$);
    this.mediumBowl.add(this.bakingPowder$);
    this.mediumBowl.add(this.salt$);
    this.mediumBowl.mix();

    this.bigBowl.add(this.butter$);
    this.bigBowl.add(this.sugar$);
    this.bigBowl.add(this.oil$);
    this.bigBowl.add(this.vanilla$);
  }

  ngOnInit() {}
}

class Oven {
  temperature$: number;

  public preheat(temp$: number) {
    this.temperature$ = temp$;
  }
}

class Bowl {
  content$!: Array<any>;

  public add(ingredient$: any) {
    this.content$.push(ingredient$);
  }

  public mix() {}
}

class Bigbowl {
  public add(butter$: any, sugar$: any, oil$: any, vanilla$: any) {}
}

class cupcakePan {}

class CupcakeFactory {}

class Egg {}
