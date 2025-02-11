import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoodItemInterface } from '../../shared/models/food-item.model';
import { LikeButtonComponent } from '../../shared/components/like-button/like-button.component';
import { RatingWidgetComponent } from '../../shared/components/rating-widget/rating-widget.component';
import { RoutingConstants } from '../../constants/routes.constants';
import { LoaderService } from '../../services/loader.service';

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
export class FoodItemDetailsComponent {
  private loaderService: LoaderService = inject(LoaderService);
  loading = this.loaderService.loading;
  routingConstants = RoutingConstants;
  foodItem: FoodItemInterface =
    inject(ActivatedRoute).snapshot.data['foodItem'];
}
