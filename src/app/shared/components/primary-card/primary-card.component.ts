import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantInterface } from '../../models/restaurant.model';
import { FoodItemInterface } from '../../models/food-item.model';
import { CardTypeEnum } from '../../models/card-type.enum';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { RatingWidgetComponent } from '../rating-widget/rating-widget.component';
import { DeliveryWidgetComponent } from '../delivery-widget/delivery-widget.component';

@Component({
  selector: 'app-card',
  templateUrl: './primary-card.component.html',
  standalone: true,
  imports: [
    CommonModule,
    LikeButtonComponent,
    RatingWidgetComponent,
    DeliveryWidgetComponent,
  ],
})
export class PrimaryCardComponent {
  @Input() data!: RestaurantInterface | FoodItemInterface;
  @Output() favouriteToggled = new EventEmitter<{
    id: string;
    type: CardTypeEnum;
  }>();

  CardTypeEnum = CardTypeEnum;

  get restaurantData(): RestaurantInterface {
    return this.data as RestaurantInterface;
  }
  get foodItemData(): FoodItemInterface {
    return this.data as FoodItemInterface;
  }

  toggleFavourite(event: { id: string; type: CardTypeEnum }): void {
    this.favouriteToggled.emit(event);
  }
}
