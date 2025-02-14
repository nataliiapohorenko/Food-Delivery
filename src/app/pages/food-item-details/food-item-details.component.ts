import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FoodItemInterface } from '../../shared/models/food-item.model';
import { LikeButtonComponent } from '../../shared/components/like-button/like-button.component';
import { RatingWidgetComponent } from '../../shared/components/rating-widget/rating-widget.component';
import { RoutingConstants } from '../../constants/routes.constants';
import { LayoutService } from '../../services/layout.service';
import { FoodItemsService } from '../../services/food-items.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AddonInterface } from '../../shared/models/addon.model';

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
  foodItem: FoodItemInterface =
    inject(ActivatedRoute).snapshot.data['foodItem'];
  private layoutService: LayoutService = inject(LayoutService);
  private foodItemsService: FoodItemsService = inject(FoodItemsService);
  private cartService: CartService = inject(CartService);

  foodItemDetails$!: Observable<FoodItemInterface>;
  itemCounts$ = this.cartService.itemCounts$;

  ngOnInit(): void {
    this.setBackButtonLink();
    this.foodItemsService.setFoodItemDetails(this.foodItem);
    this.foodItemDetails$ = this.foodItemsService.foodItemDetails$;
    console.log(this.foodItemDetails$);
    this.cartService.addFoodItem(this.foodItem);
  }

  increment(item: FoodItemInterface | AddonInterface) {
    this.cartService.increment(item);
  }

  decrement(item: FoodItemInterface | AddonInterface) {
    this.cartService.decrement(item);
  }

  getCount(item: FoodItemInterface | AddonInterface): number {
    return this.cartService.getCount(item);
  }

  toggleAddon(addon: AddonInterface) {
    this.cartService.toggleAddon(addon);
  }

  toggleFavourite(): void {
    this.foodItemsService.toggleFoodItemDetailsFavourite();
  }

  setBackButtonLink(): void {
    if (this.foodItem?.restaurantId) {
      const restaurantLink = `/${RoutingConstants.RESTAURANTS}/${this.foodItem.restaurantId}`;
      this.layoutService.setBackButtonLink(restaurantLink);
    }
  }
}
