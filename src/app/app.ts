import { Component, signal } from '@angular/core';
import { CartPageComponent } from './components/cart-page/cart-page.component';

@Component({
  selector: 'app-root',
  imports: [CartPageComponent],
  template: `
    <div class="w-150 px-10 py-5 mx-auto my-10 bg-amber-50 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800 mx-auto">{{ title() }}</h1>
      <hr class="my-5 border-gray-300" />
      <app-cart-page class="my-5"></app-cart-page>
    </div>
  `
})
export class App {
  protected readonly title = signal('🛒 Signals Cart');
}
