import { Component, effect, inject } from '@angular/core';
import { ProductListComponent } from "../product-list/product-list.component";
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartStore } from '../../store/cart.store';
@Component({
  selector: 'app-cart-page',
  imports: [ProductListComponent, CartSummaryComponent, CartItemComponent],
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent {

  private cartStore = inject(CartStore);
  cartItems = this.cartStore.items;

  constructor() {
    effect(() => {
      const items = this.cartStore.items();

      console.log('[cart] items changed:', items);

      document.title =
        `Cart (${this.cartStore.totalCount()})`;

      localStorage.setItem(
        'cart',
        JSON.stringify(items)
      );
    });
  }


  onQuantityChanged(event: { id: string; quantity: number }) {
    this.cartStore.updateQuantity(event.id, event.quantity);
  }

  onRemoved(id: string) {
    this.cartStore.removeItem(id);
  }
}
