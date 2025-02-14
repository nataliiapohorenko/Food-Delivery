import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FoodItemInterface } from '../shared/models/food-item.model';
import { environment } from '../../environments/environment';
import { CardTypeEnum } from '../shared/models/card-type.enum';
import { BaseService } from './base.service';
import { RoutingConstants } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class FoodItemsService extends BaseService<FoodItemInterface> {
  protected apiUrl = `${environment.apiUrl}/${RoutingConstants.FOOD_ITEMS}`;
  protected foodItemDetailsSubject: BehaviorSubject<FoodItemInterface> =
    new BehaviorSubject<FoodItemInterface>({} as FoodItemInterface);
  foodItemDetails$ = this.foodItemDetailsSubject.asObservable();

  override getItems(): Observable<FoodItemInterface[]> {
    return super.getItems().pipe(
      map(response =>
        response
          .map(
            foodItem =>
              ({
                ...foodItem,
                type: CardTypeEnum.FoodItem,
              }) as FoodItemInterface
          )
          .sort((a, b) => a.price - b.price)
      ),
      tap(foodItems => this.itemsSubject.next(foodItems))
    );
  }

  getItemById(id: string): Observable<FoodItemInterface> {
    return this.http.get<FoodItemInterface>(`${this.apiUrl}/${id}`);
  }

  public setFoodItemDetails(details: FoodItemInterface): void {
    this.foodItemDetailsSubject.next(details);
  }

  toggleFoodItemDetailsFavourite(): void {
    const currentDetails = this.foodItemDetailsSubject.getValue();
    if (!currentDetails) {
      return;
    }
    const updatedDetails: FoodItemInterface = {
      ...currentDetails,
      isFavourite: !currentDetails.isFavourite,
    };
    this.foodItemDetailsSubject.next(updatedDetails);
  }
}
