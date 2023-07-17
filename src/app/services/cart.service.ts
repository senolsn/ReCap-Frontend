import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CartItems } from '../models/carItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastrService: ToastrService) {}
  cartItems: CartItem[] = [];
  addToCart(cartItem: CartItem) {
    let item = CartItems.find((c) => c.car === cartItem.car);
    if (item) {
      this.toastrService.error('Bu araç zaten sepetinizde mevcut !');
    } else {
      CartItems.push(cartItem);
    }
  }

  removeFromCart(index: number) {
    if (index >= 0 && index < CartItems.length) {
      CartItems.splice(index, 1);
    }
  }

  list(): CartItem[] {
    return CartItems;
  }

  
}
