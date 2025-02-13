import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import { FoodItemsService } from '../../services/food-items.service';
import { RestaurantInterface } from '../../shared/models/restaurant.model';
import { FoodItemInterface } from '../../shared/models/food-item.model';
import { PrimaryCardComponent } from '../../shared/components/primary-card/primary-card.component';
import { SecondaryCardComponent } from '../../shared/components/secondary-card/secondary-card.component';
import { CardTypeEnum } from '../../shared/models/card-type.enum';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RoutingConstants } from '../../constants/routes.constants';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    PrimaryCardComponent,
    SecondaryCardComponent,
    CommonModule,
    RouterModule,
  ],
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  restaurants$!: Observable<RestaurantInterface[]>;
  foodItems$!: Observable<FoodItemInterface[]>;
  private router: Router = inject(Router);
  private restaurantsService: RestaurantsService = inject(RestaurantsService);
  private foodItemsService: FoodItemsService = inject(FoodItemsService);
  private authService: AuthService = inject(AuthService);
  private layoutService: LayoutService = inject(LayoutService);
  private destroy$ = new Subject<void>();

  isOpen = false;

  ngOnInit(): void {
    this.subscribeToDataChanges();
  }
  subscribeToDataChanges(): void {
    this.restaurants$ = this.restaurantsService.items$;
    this.foodItems$ = this.foodItemsService.items$;

    this.restaurantsService
      .getItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.foodItemsService.getItems().pipe(takeUntil(this.destroy$)).subscribe();

    this.layoutService.sidebarToggle$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isOpen = !this.isOpen;
      });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  closeSidebar(event: Event) {
    if ((event.target as HTMLElement).id === 'overlay') {
      this.isOpen = false;
    }
  }

  toggleFavourite(id: string, type: CardTypeEnum): void {
    switch (type) {
      case CardTypeEnum.Restaurant:
        this.restaurantsService.toggleFavorite(id);
        break;
      case CardTypeEnum.FoodItem:
        this.foodItemsService.toggleFavorite(id);
        break;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([RoutingConstants.LOGIN]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
