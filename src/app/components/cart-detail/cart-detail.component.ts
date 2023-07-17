import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartItems:CartItem[] = [];
  baseUrl: string = 'https://localhost:44317/Uploads/Images/'
  constructor(private toastrService:ToastrService,
    private cartService:CartService) { }
  ngOnInit(): void {
  this.getCartItems();
  }

  getCartItems(){
    this.cartItems =  this.cartService.list();
  }

  getCarImageUrl(imagePath: string): string {
    if (imagePath && imagePath !== null) {
      return this.baseUrl + imagePath;
    }
    return this.baseUrl + 'default.jpg';
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, cartItem) => {
      const totalPrice = cartItem.car.dailyPrice * cartItem.day;
      return total + totalPrice;
    }, 0);
  }

  pay(){
    this.toastrService.success("Ödeme Sayfasına Yönlendiriliyorsunuz !");
  }

}
