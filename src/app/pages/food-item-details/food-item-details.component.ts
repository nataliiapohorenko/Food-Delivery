import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoodItemInterface } from '../../shared/models/food-item.model';
import { LikeButtonComponent } from '../../shared/components/like-button/like-button.component';
import { RatingWidgetComponent } from '../../shared/components/rating-widget/rating-widget.component';
import { RoutingConstants } from '../../constants/routes.constants';
import { LoaderService } from '../../services/loader.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-food-item-details',
  standalone: true,
  imports: [
    CommonModule,
    LikeButtonComponent,
    RouterModule,
    RatingWidgetComponent,
    MatProgressBarModule,
  ],
  templateUrl: './food-item-details.component.html',
})
export class FoodItemDetailsComponent implements OnInit {
  routingConstants = RoutingConstants;
  foodItem: FoodItemInterface =
    inject(ActivatedRoute).snapshot.data['foodItem'];
  private loaderService: LoaderService = inject(LoaderService);
  private layoutService: LayoutService = inject(LayoutService);
  loading = this.loaderService.loading;

  ngOnInit(): void {
    if (this.foodItem?.restaurantId) {
      const restaurantLink = `/${RoutingConstants.RESTAURANTS}/${this.foodItem.restaurantId}`;
      this.layoutService.setBackButtonLink(restaurantLink);
    }
  }
}
