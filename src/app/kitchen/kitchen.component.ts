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
  eggsNeeded$!: number;
  salt$!: Observable<any>;
  butter$!: Observable<any>;
  sugar$!: Observable<any>;
  flour$!: Observable<any>;
  bakingPowder$!: Observable<any>;
  oil$!: Observable<any>;
  vanilla$!: Observable<any>;
  milk$!: Observable<any>;

  constructor(private cupcakeFactory: CupcakeFactory) {
    cupcakeFactory.makeCupCakes();

    this.oven.preheat(350);
    this.mediumBowl.add(this.flour$);
    this.mediumBowl.add(this.bakingPowder$);
    this.mediumBowl.add(this.salt$);
    this.mediumBowl.mix();

    this.bigBowl.add(this.butter$);
    this.bigBowl.add(this.sugar$);
    this.bigBowl.add(this.oil$);
    this.bigBowl.add(this.vanilla$);
    this.bigBowl.mix();

    for (var i = 0; i < this.eggsNeeded$; i++) {
      this.eggs$[i].crack();
      this.bigBowl.add(this.eggs$[i]);
      this.bigBowl.mix();
    }

    this.bigBowl.add(
      this.mediumBowl.half(0, this.mediumBowl.content$.length / 2)
    );
    this.bigBowl.mix();

    this.bigBowl.add(this.milk$);
    this.bigBowl.mix();

    this.bigBowl.add(
      this.mediumBowl.half(
        this.mediumBowl.content$.length / 2,
        this.mediumBowl.content$.length
      )
    );
    this.bigBowl.mix();
  }

  ngOnInit() {}
}

class CupcakeFactory {
  public makeCupCakes() {}
}

class Oven {
  temperature$!: number;
  cupcakePan$!: cupcakePan;

  public preheat(temp$: number) {
    this.temperature$ = temp$;
  }

  public bake(cupcakePan$: cupcakePan) {}

  public turnOff() {
    this.temperature$ = 0;
  }
}

class Bowl {
  content$!: Array<any>;
  isMixed!: boolean;

  public add(ingredient$: any) {
    this.content$.push(ingredient$);
    this.isMixed = false;
  }

  public mix() {
    this.isMixed = true;
  }

  public half(startIndex: number, endIndex: number): Array<any> {
    return this.content$.slice(startIndex, endIndex);
  }
}

class cupcakePan {
  filled$!: boolean;
  baked$!: boolean;
}

class Egg {
  isCracked$!: boolean;

  public crack() {
    this.isCracked$ = true;
  }
}
