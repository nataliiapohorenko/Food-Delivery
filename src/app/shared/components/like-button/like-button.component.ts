import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantInterface } from '../../models/restaurant.model';
import { FoodItemInterface } from '../../models/food-item.model';
import { CardTypeEnum } from '../../models/card-type.enum';

@Component({
  selector: 'like-button',
  template: `<div class="absolute right-2 top-2 z-10">
    <button
      [ngClass]="{
        'flex h-[28px] w-[28px] items-center justify-center rounded-full shadow-md transition hover:bg-opacity-50': true,
        'bg-primary': data.isFavourite,
        'bg-[rgba(255,255,255,0.2)] backdrop-blur-sm hover:bg-primary':
          !data.isFavourite,
      }"
      (click)="favouriteButtonClicked($event)">
      <img
        [src]="
          !data.isFavourite
            ? 'assets/icons/grey-heart.svg'
            : 'assets/icons/heart.svg'
        "
        alt="like"
        class="opacity-100 transition" />
    </button>
  </div>`,
  standalone: true,
  imports: [CommonModule],
})
export class LikeButtonComponent {
  @Input() data!: RestaurantInterface | FoodItemInterface;
  @Output() toggleFavorite = new EventEmitter<{
    id: string;
    type: CardTypeEnum;
  }>();

  favouriteButtonClicked(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit({ id: this.data._id, type: this.data.type });
  }
}
