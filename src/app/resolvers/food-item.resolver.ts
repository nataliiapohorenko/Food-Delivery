import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { FoodItemsService } from '../services/food-items.service';
import { FoodItemInterface } from '../shared/models/food-item.model';

@Injectable({
  providedIn: 'root',
})
export class FoodItemResolver implements Resolve<FoodItemInterface> {
  private foodItemsService: FoodItemsService = inject(FoodItemsService);

  resolve(route: ActivatedRouteSnapshot): Observable<FoodItemInterface> {
    const id = route.paramMap.get('id');
    return this.foodItemsService.items$.pipe(
      take(1),
      switchMap(items => {
        if (items && items.length > 0) {
          const foundItem = items.find(item => item._id === id);
          if (foundItem) {
            return of(foundItem);
          }
        }
        return this.foodItemsService.getItemById(id!);
      })
    );
  }
}
