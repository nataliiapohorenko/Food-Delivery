import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FoodItemInterface } from '../../shared/models/food-item.model';
import { LikeButtonComponent } from '../../shared/components/like-button/like-button.component';
import { RatingWidgetComponent } from '../../shared/components/rating-widget/rating-widget.component';
import { RoutingConstants } from '../../constants/routes.constants';
import { LayoutService } from '../../services/layout.service';

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

  ngOnInit(): void {
    this.setBackButtonLink();
  }

  setBackButtonLink(): void {
    if (this.foodItem?.restaurantId) {
      const restaurantLink = `/${RoutingConstants.RESTAURANTS}/${this.foodItem.restaurantId}`;
      this.layoutService.setBackButtonLink(restaurantLink);
    }
  }
}
