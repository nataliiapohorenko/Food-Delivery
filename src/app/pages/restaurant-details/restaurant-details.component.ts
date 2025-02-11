import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RestaurantDetailsInterface } from '../../shared/models/restaurant.model';
import { PrimaryCardComponent } from '../../shared/components/primary-card/primary-card.component';
import { SecondaryCardComponent } from '../../shared/components/secondary-card/secondary-card.component';
import { RestaurantsService } from '../../services/restaurants.service';
import { FoodItemInterface } from '../../shared/models/food-item.model';
import { CardTypeEnum } from '../../shared/models/card-type.enum';
import { LikeButtonComponent } from '../../shared/components/like-button/like-button.component';
import { RatingWidgetComponent } from '../../shared/components/rating-widget/rating-widget.component';
import { DeliveryWidgetComponent } from '../../shared/components/delivery-widget/delivery-widget.component';
import { RoutingConstants } from '../../constants/routes.constants';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryCardComponent,
    SecondaryCardComponent,
    RatingWidgetComponent,
    RouterModule,
    LikeButtonComponent,
    DeliveryWidgetComponent,
    MatProgressBarModule,
  ],
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit {
  routingConstants = RoutingConstants;
  private restaurantData: RestaurantDetailsInterface =
    inject(ActivatedRoute).snapshot.data['restaurant'];
  private restaurantsService: RestaurantsService = inject(RestaurantsService);
  private loaderService: LoaderService = inject(LoaderService);

  restaurantDetails$!: Observable<RestaurantDetailsInterface>;
  sortedFoodItems$!: Observable<FoodItemInterface[]>;
  loading = this.loaderService.loading;

  ngOnInit() {
    this.getRestaurantData();
    this.sortFeaturedItems();
  }

  getRestaurantData() {
    this.restaurantsService.setRestaurantDetails(this.restaurantData);
    this.restaurantDetails$ = this.restaurantsService.restaurantDetails$;
  }

  sortFeaturedItems() {
    this.sortedFoodItems$ = this.restaurantDetails$.pipe(
      map(details =>
        details && details.foodItems
          ? [...details.foodItems]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
          : []
      )
    );
  }

  toggleFavourite(id: string, type: CardTypeEnum): void {
    this.restaurantsService.toggleRestaurantDetailsFavourite(id, type);
  }
}
