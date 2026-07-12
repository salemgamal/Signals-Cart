import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CartItem } from '../models/cart-item.interface';

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const CartStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => ({
    totalCount: computed(() =>
      store.items().reduce((sum, i) => sum + i.quantity, 0)
    ),
    totalPrice: computed(() =>
      store.items().reduce((sum, i) => sum + i.price * i.quantity, 0)
    ),
  })),

  withMethods((store) => ({
    addItem(product: { id: string; name: string; price: number }) {
      const existingItem = store.items().find((i) => i.id === product.id);
      if (existingItem) {
        this.updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        patchState(store, {
          items: [...store.items(), { ...product, quantity: 1 }],
        });
      }
    },

    updateQuantity(id: string, quantity: number) {
      patchState(store, {
        items: store.items().map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
              }
            : item
        ),
      });
    },

    removeItem(id: string) {
      patchState(store, {
        items: store.items().filter((i) => i.id !== id),
      });
    },
  }))
);
