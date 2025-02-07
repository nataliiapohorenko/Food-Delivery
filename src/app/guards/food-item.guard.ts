import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FoodItemsService } from '../services/food-items.service';
import { RoutingConstants } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class FoodItemGuard implements CanActivate {
  routingConstants = RoutingConstants;
  constructor(
    private foodItemsService: FoodItemsService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const id = route.paramMap.get('id');
    if (!id) {
      return of(this.router.createUrlTree([this.routingConstants.HOME]));
    }
    return this.foodItemsService.getItems().pipe(
      map(foodItems => {
        const foodItemExists = foodItems.some(
          foodItems => foodItems._id === id
        );
        if (foodItemExists) {
          return true;
        } else {
          return this.router.createUrlTree([this.routingConstants.HOME]);
        }
      }),
      catchError(() => {
        return of(this.router.createUrlTree([this.routingConstants.HOME]));
      })
    );
  }
}
