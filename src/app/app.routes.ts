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
import { LayoutComponent } from './layout/layout.component';
import { RouteConfigInterface } from './shared/models/route-config.model';
import { RouteButtonActionEnum } from './shared/models/route-button-action.enum';

export const routes: Routes = [
  { path: RoutingConstants.SIGNUP, component: SignUpComponent },
  { path: RoutingConstants.LOGIN, component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: RoutingConstants.HOME, pathMatch: 'full' },
      {
        path: RoutingConstants.HOME,
        canActivate: [AuthGuard],
        component: HomeComponent,
        data: {
          displayHeader: true,
          buttonAction: {
            type: RouteButtonActionEnum.SideBar,
          },
          headerTitle: 'Deliver to',
          headerAddress: '4102  Pretty View Lane',
          displayImg: 'assets/images/avatar.png',
          displayFooter: true,
        } as RouteConfigInterface,
      },
      {
        path: `${RoutingConstants.RESTAURANTS}/:${RoutingConstants.ID}`,
        component: RestaurantDetailsComponent,
        canActivate: [AuthGuard, RestaurantGuard],
        resolve: { restaurant: RestaurantResolver },
        data: {
          displayHeader: false,
          buttonAction: {
            type: RouteButtonActionEnum.Router,
            link: RoutingConstants.HOME,
          },
          displayFooter: false,
        } as RouteConfigInterface,
      },
      {
        path: `${RoutingConstants.FOOD_ITEMS}/:${RoutingConstants.ID}`,
        component: FoodItemDetailsComponent,
        canActivate: [AuthGuard, FoodItemGuard],
        resolve: { foodItem: FoodItemResolver },
        data: {
          displayHeader: false,
          buttonAction: {
            type: RouteButtonActionEnum.Router,
          },
          displayFooter: false,
        } as RouteConfigInterface,
      },
    ],
  },
  { path: '**', redirectTo: RoutingConstants.HOME },
];
