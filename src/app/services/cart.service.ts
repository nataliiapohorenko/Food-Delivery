import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodItemInterface } from '../shared/models/food-item.model';
import { AddonInterface } from '../shared/models/addon.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemCounts = new BehaviorSubject<Map<string, number>>(new Map());
  itemCounts$ = this.itemCounts.asObservable();

  constructor() {
    this.initializeFoodItemCounts();
  }

  private initializeFoodItemCounts() {
    const counts = new Map<string, number>();
    this.itemCounts.next(counts);
  }

  addFoodItem(item: FoodItemInterface) {
    const counts = new Map(this.itemCounts.getValue());
    if (!counts.has(item._id)) {
      counts.set(item._id, 1);
    }
    this.itemCounts.next(counts);
  }

  increment(item: FoodItemInterface | AddonInterface) {
    const counts = new Map(this.itemCounts.getValue());
    const key = item._id;
    counts.set(key, (counts.get(key) || 0) + 1);
    this.itemCounts.next(new Map(counts));
    console.log(counts);
  }

  decrement(item: FoodItemInterface | AddonInterface) {
    const counts = new Map(this.itemCounts.getValue());
    const key = item._id;
    if (counts.has(key)) {
      const newCount = (counts.get(key) || 0) - 1;
      if (newCount > 0) {
        counts.set(key, newCount);
      } else {
        counts.delete(key);

        if ('countable' in item && item.countable) {
          const checkbox = document.querySelector(
            `input[type='checkbox'][data-addon='${item._id}']`
          ) as HTMLInputElement;
          if (checkbox) {
            checkbox.checked = false;
          }
        }
      }
      this.itemCounts.next(new Map(counts));
    }
  }

  toggleAddon(addon: AddonInterface) {
    const counts = new Map(this.itemCounts.getValue());
    const key = addon._id;

    if (counts.has(key)) {
      counts.delete(key);
    } else {
      counts.set(key, 1);
    }
    console.log(counts);

    this.itemCounts.next(new Map(counts));
  }

  getCount(item: FoodItemInterface | AddonInterface): number {
    const key = item._id;
    return this.itemCounts.getValue().get(key) || 0;
  }
}
