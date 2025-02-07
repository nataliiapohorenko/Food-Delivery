import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  RestaurantInterface,
  RestaurantDetailsInterface,
  RestaurantDetailsResponseInterface,
} from '../shared/models/restaurant.model';
import { FoodItemInterface } from '../shared/models/food-item.model';
import { environment } from '../../environments/environment';
import { CardTypeEnum } from '../shared/models/card-type.enum';
import { BaseService } from './base.service';
import { RoutingConstants } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService extends BaseService<RestaurantInterface> {
  protected apiUrl = `${environment.apiUrl}/${RoutingConstants.RESTAURANTS}`;
  protected restaurantDetailsSubject: BehaviorSubject<RestaurantDetailsInterface> =
    new BehaviorSubject<RestaurantDetailsInterface>(
      {} as RestaurantDetailsInterface
    );
  restaurantDetails$ = this.restaurantDetailsSubject.asObservable();

  override getItems(): Observable<RestaurantInterface[]> {
    return super.getItems().pipe(
      map(response =>
        response.map(
          restaurant =>
            ({
              ...restaurant,
              type: CardTypeEnum.Restaurant,
            }) as RestaurantInterface
        )
      ),
      tap(restaurants => this.itemsSubject.next(restaurants))
    );
  }

  public setRestaurantDetails(details: RestaurantDetailsInterface): void {
    this.restaurantDetailsSubject.next(details);
  }

  getItemById(id: string): Observable<RestaurantDetailsInterface> {
    return this.http
      .get<RestaurantDetailsResponseInterface>(`${this.apiUrl}/${id}`)
      .pipe(
        map(
          response =>
            ({
              ...response.restaurant,
              foodItems: response.foodItems.map(
                foodItem =>
                  ({
                    ...foodItem,
                    type: CardTypeEnum.FoodItem,
                  }) as FoodItemInterface
              ),
              type: CardTypeEnum.Restaurant,
            }) as RestaurantDetailsInterface
        ),
        tap(restaurant => this.restaurantDetailsSubject.next(restaurant))
      );
  }

  toggleRestaurantDetailsFavourite(id: string, type: CardTypeEnum): void {
    const currentDetails = this.restaurantDetailsSubject.getValue();
    if (!currentDetails) {
      return;
    }
    let updatedDetails: RestaurantDetailsInterface;
    if (type === CardTypeEnum.FoodItem) {
      updatedDetails = {
        ...currentDetails,
        foodItems: currentDetails.foodItems.map(item =>
          item._id === id ? { ...item, isFavourite: !item.isFavourite } : item
        ),
      };
    } else {
      updatedDetails = {
        ...currentDetails,
        isFavourite: !currentDetails.isFavourite,
      };
    }
    this.restaurantDetailsSubject.next(updatedDetails);
  }
}
