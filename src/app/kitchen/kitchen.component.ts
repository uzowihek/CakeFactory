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
  milk$!: Observable<any>;

  constructor(private cupcakeFactory: CupcakeFactory) {
    this.flour$.subscribe({
      next: function(value: any) {
        this.mediumBowl.add(value);
      },

      error: function() {
        console.log('Error at flour');
      },

      complete: function() {
        this.bakingPowder$ = cupcakeFactory.getBakingPowder();
      }
    });

    this.bakingPowder$.subscribe({
      next: function(value: any) {
        this.mediumBowl.add(value);
      },

      error: function() {
        console.log('Error at baking powder');
      },

      complete: function() {
        this.salt$ = cupcakeFactory.getSalt();
      }
    });

    this.salt$.subscribe({
      next: function(value: any) {
        this.mediumBowl.add(value);
      },

      error: function() {
        console.log('Error at salt');
      },

      complete: function() {
        this.mediumBowl.mix();
      }
    });

    this.butter$.subscribe({
      next: function(value: any) {
        this.bigBowl.add(value);
      },

      error: function() {
        console.log('Error at butter');
      },

      complete: function() {
        this.sugar$ = cupcakeFactory.getSugar();
      }
    });
    this.sugar$.subscribe({
      next: function(value: any) {
        this.bigBowl.add(value);
      },

      error: function() {
        console.log('Error at sugar');
      },

      complete: function() {
        this.oil$ = cupcakeFactory.getOil();
      }
    });
    this.oil$.subscribe({
      next: function(value: any) {
        this.bigBowl.add(value);
      },

      error: function() {
        console.log('Error at oil');
      },

      complete: function() {
        this.vanilla$ = cupcakeFactory.getVanilla();
      }
    });
    this.vanilla$.subscribe({
      next: function(value: any) {
        this.bigBowl.add(value);
      },

      error: function() {
        console.log('Error at vanilla');
      },

      complete: function() {
        this.bigBowl.mix();
      }
    });

    for (var i = 0; i < 2; i++) {
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

    this.oven.bake(this.cupcakePan);
  }

  ngOnInit() {
    this.oven.preheat(350);
    this.flour$ = this.cupcakeFactory.getFlour();
    this.butter$ = this.cupcakeFactory.getButter();
  }
}

class CupcakeFactory {
  public makeCupCakes() {}

  public getSalt(): any {
    return;
  }

  public getButter(): any {
    return;
  }

  public getSugar(): any {
    return;
  }

  public getFlour(): any {
    return;
  }

  public getBakingPowder(): any {
    return;
  }

  public getOil(): any {
    return;
  }

  public getVanilla(): any {
    return;
  }

  public getMilk(): any {
    return;
  }

  public getEggs(): Egg[] {
    return Egg[2];
  }
}

class Oven {
  temperature!: number;
  cupcakePan!: cupcakePan;

  public preheat(temp: number) {
    this.temperature = temp;
  }

  public bake(cupcakePan$: cupcakePan) {}

  public turnOff() {
    this.temperature = 0;
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
  isCracked!: boolean;

  constructor() {
    this.isCracked = false;
  }

  public crack() {
    this.isCracked = true;
  }
}
