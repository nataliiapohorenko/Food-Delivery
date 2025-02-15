// restaurant.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantsService } from '../services/restaurants.service';
import { catchError, map } from 'rxjs/operators';
import { RoutingConstants } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantGuard implements CanActivate {
  routingConstants = RoutingConstants;
  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const id = route.paramMap.get('id');
    if (!id) {
      return of(this.router.createUrlTree([this.routingConstants.HOME]));
    }
    return this.restaurantsService.getItems().pipe(
      map(restaurants => {
        const restaurantExists = restaurants.some(
          restaurant => restaurant._id === id
        );
        if (restaurantExists) {
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
