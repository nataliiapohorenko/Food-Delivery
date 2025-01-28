import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantInterface } from '../../models/restaurant.model';
import { DishInterface } from '../../models/dish.model';
import { RatingConverter } from '../../pipes/rating-pipe.pipe';
import { CardTypeEnum } from '../../models/card-type.enum';

@Component({
  selector: 'app-card',
  templateUrl: './primary-card.component.html',
  standalone: true,
  imports: [CommonModule, RatingConverter],
})
export class PrimaryCardComponent {
  @Input() data!: RestaurantInterface | DishInterface;
  @Output() favoriteToggled = new EventEmitter<{
    id: number;
    type: CardTypeEnum;
  }>();
  CardTypeEnum = CardTypeEnum;

  get restaurantData(): RestaurantInterface {
    return this.data as RestaurantInterface;
  }
  get dishData(): DishInterface {
    return this.data as DishInterface;
  }

  toggleFavorite(): void {
    this.favoriteToggled.emit({ id: this.data.id, type: this.data.type });
  }
}
