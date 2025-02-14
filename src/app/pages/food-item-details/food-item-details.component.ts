import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FoodItemInterface } from '../../shared/models/food-item.model';
import { LikeButtonComponent } from '../../shared/components/like-button/like-button.component';
import { RatingWidgetComponent } from '../../shared/components/rating-widget/rating-widget.component';
import { RoutingConstants } from '../../constants/routes.constants';
import { LayoutService } from '../../services/layout.service';

interface Addon {
  name: string;
  price: number;
  countable: boolean;
}

@Component({
  selector: 'app-food-item-details',
  standalone: true,
  imports: [
    CommonModule,
    LikeButtonComponent,
    RouterModule,
    RatingWidgetComponent,
  ],
  templateUrl: './food-item-details.component.html',
})
export class FoodItemDetailsComponent implements OnInit {
  routingConstants = RoutingConstants;
  itemCounts = new Map();
  foodItem: FoodItemInterface =
    inject(ActivatedRoute).snapshot.data['foodItem'];
  private layoutService: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.setBackButtonLink();
  }

  increment(item: FoodItemInterface | Addon) {
    const defaultValue = item === this.foodItem ? 1 : 0;
    this.itemCounts.set(item, (this.itemCounts.get(item) ?? defaultValue) + 1);
  }

  decrement(item: FoodItemInterface | Addon) {
    const currentCount = this.itemCounts.get(item) || 0;
    if (currentCount > 1) {
      this.itemCounts.set(item, currentCount - 1);
    } else {
      this.itemCounts.delete(item);
    }
  }

  toggleAddon(addon: Addon) {
    if (this.itemCounts.has(addon)) {
      this.itemCounts.delete(addon);
    } else {
      this.itemCounts.set(addon, 1);
    }
  }

  setBackButtonLink(): void {
    if (this.foodItem?.restaurantId) {
      const restaurantLink = `/${RoutingConstants.RESTAURANTS}/${this.foodItem.restaurantId}`;
      this.layoutService.setBackButtonLink(restaurantLink);
    }
  }
}
