import { Component, input, output } from '@angular/core';
import { CartItem } from '../../models/cart-item.interface';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  item = input.required<CartItem>();

  quantityChanged = output<{ id: string; quantity: number }>();
  removed = output<string>();

  increase() {
    this.quantityChanged.emit({ id: this.item().id, quantity: this.item().quantity + 1 });
  }

  decrease() {
    if(this.item().quantity <= 1) {
      this.removed.emit(this.item().id);
      return;
    }
    this.quantityChanged.emit({ id: this.item().id, quantity: this.item().quantity - 1 });
  }

  remove() {
    this.removed.emit(this.item().id);
  }

}
