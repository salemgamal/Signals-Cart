import { Component, inject } from '@angular/core';
import { PRODUCTS } from '../../models/product-data';
import { Product } from '../../models/product.interface';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

  private cartStore = inject(CartStore);
  products = PRODUCTS;


  addProductToCart(product: Product) {
    this.cartStore.addItem(product);
  }

}
