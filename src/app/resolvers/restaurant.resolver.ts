import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { RestaurantsService } from '../services/restaurants.service';
import {
  RestaurantDetailsInterface,
  RestaurantInterface,
} from '../shared/models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantResolver implements Resolve<RestaurantDetailsInterface> {
  private restaurantsService: RestaurantsService = inject(RestaurantsService);

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<RestaurantDetailsInterface> {
    const id = route.paramMap.get('id');

    return this.restaurantsService.restaurantDetails$.pipe(
      take(1),
      switchMap(details => {
        if (details && details._id === id && details.foodItems) {
          return of(details);
        }
        return this.restaurantsService.getItemById(id!);
      })
    );
  }
}
