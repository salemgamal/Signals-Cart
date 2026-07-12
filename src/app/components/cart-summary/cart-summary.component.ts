import { Component, computed, effect, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart-item.interface';
import { CartStore } from '../../store/cart.store';

const FREE_SHIPPING_THRESHOLD = 50;

@Component({
  selector: 'app-cart-summary',
  imports: [],
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent {
  private cartStore = inject(CartStore);

  private previousTotal = 0;
  items = input.required<CartItem[]>();
  totalCount = this.cartStore.totalCount;
  totalPrice = this.cartStore.totalPrice;

  constructor() {
    effect(() => {
      const newTotal = this.totalPrice();

      if (
        this.previousTotal < FREE_SHIPPING_THRESHOLD &&
        newTotal >= FREE_SHIPPING_THRESHOLD
      ) {
        alert('Free shipping unlocked!');
      }

      this.previousTotal = newTotal;
    });
  }
}
