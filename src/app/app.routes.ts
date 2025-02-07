import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FoodItemResolver } from './resolvers/food-item.resolver';
import { FoodItemDetailsComponent } from './pages/food-item-details/food-item-details.component';
import { RestaurantResolver } from './resolvers/restaurant.resolver';
import { RestaurantDetailsComponent } from './pages/restaurant-details/restaurant-details.component';
import { RestaurantGuard } from './guards/restaurant.guard';
import { FoodItemGuard } from './guards/food-item.guard';
import { RoutingConstants } from './constants/routes.constants';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: RoutingConstants.HOME, pathMatch: 'full' },
  { path: RoutingConstants.SIGNUP, component: SignUpComponent },
  { path: RoutingConstants.LOGIN, component: LoginComponent },
  {
    path: RoutingConstants.HOME,
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: `${RoutingConstants.RESTAURANTS}/:${RoutingConstants.ID}`,
    component: RestaurantDetailsComponent,
    canActivate: [AuthGuard, RestaurantGuard],
    resolve: { restaurant: RestaurantResolver },
  },
  {
    path: `${RoutingConstants.FOOD_ITEMS}/:${RoutingConstants.ID}`,
    component: FoodItemDetailsComponent,
    canActivate: [AuthGuard, FoodItemGuard],
    resolve: { foodItem: FoodItemResolver },
  },
  { path: '**', redirectTo: RoutingConstants.HOME },
];
