import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RestaurantInterface,
  RestaurantDetailsInterface,
} from '../../models/restaurant.model';
import { FoodItemInterface } from '../../models/food-item.model';
import { RatingConverter } from '../../pipes/rating-pipe.pipe';

@Component({
  selector: 'rating-widget',
  template: `<div class="flex items-center">
    <img src="assets/icons/star.svg" alt="stars" *ngIf="type === 'page'" />
    <span class="mr-1 text-xs font-semibold">
      {{ data.rating }}
    </span>
    <img src="assets/icons/star.svg" alt="stars" *ngIf="type === 'component'" />
    <span class="ml-0.5 text-[8px] text-[#9796A1]">
      ({{ data.feedbacks | RatingConverter }})
    </span>
    <span *ngIf="type === 'page'" class="ml-1 text-xs text-primary">
      See review >
    </span>
  </div>`,
  standalone: true,
  imports: [CommonModule, RatingConverter],
})
export class RatingWidgetComponent {
  @Input() data!:
    | RestaurantInterface
    | FoodItemInterface
    | RestaurantDetailsInterface;
  @Input() type!: string;
}
