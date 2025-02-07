import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RestaurantInterface,
  RestaurantDetailsInterface,
} from '../../models/restaurant.model';

@Component({
  selector: 'delivery-widget',
  template: `<div
    class="mb-2 flex items-center text-xs font-medium text-darkGray">
    <img src="assets/icons/deliveryMan.svg" alt="delivery man" />
    <span class="ml-1 mr-2">
      {{
        data.delivery.cost === 0
          ? 'free delivery'
          : '$' + data.delivery.cost + ' delivery'
      }}
    </span>
    <img src="assets/icons/clock.svg" alt="delivery man" />
    <span class="ml-1">
      {{ data.delivery.time }}-{{ data.delivery.time + 5 }} mins
    </span>
  </div>`,
  standalone: true,
  imports: [CommonModule],
})
export class DeliveryWidgetComponent {
  @Input() data!: RestaurantInterface | RestaurantDetailsInterface;
}
