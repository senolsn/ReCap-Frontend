import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItems } from 'src/app/models/carItems';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent{
  
  @Input() name: string;
  @Input() cardNumber: string;
  @Input() expiration: string;
  @Input() securityCode: string;
 

constructor(
  private toastrService:ToastrService,
  private paymentService:PaymentService){}

  formatCardNumber() {
    if (this.cardNumber) {
      // Remove any existing spaces from the input
      this.cardNumber = this.cardNumber.replace(/\s/g, '');
  
      // Insert a space after every 4 digits
      this.cardNumber = this.cardNumber.replace(/(.{4})/g, '$1 ');
  
      // Trim the string to a maximum length of 19 characters
      this.cardNumber = this.cardNumber.slice(0, 19);
    }
  }


  formatExpiration() {
    if (this.expiration) {
      // Remove any existing non-digit characters from the input
      this.expiration = this.expiration.replace(/\D/g, '');
  
      // Insert a "/" after the second digit
      if (this.expiration.length > 2) {
        this.expiration = this.expiration.slice(0, 2) + '/' + this.expiration.slice(2);
      }
  
      // Trim the string to a maximum length of 5 characters
      this.expiration = this.expiration.slice(0, 5);
    }
  }


  formatSecurityCode() {
    if (this.securityCode) {
      // Remove any existing non-digit characters from the input
      this.securityCode = this.securityCode.replace(/\D/g, '');
  
      // Trim the string to a maximum length of 3 characters
      this.securityCode = this.securityCode.slice(0, 3);
    }
  }

  makePayment() {
    const paymentData: Payment = {
      userId: 1,
      fullName: this.name,
      cardNumber: this.cardNumber,
      cvv: this.securityCode,
      expiryMonth: this.expiration.substring(0, 2),
      expiryYear: this.expiration.slice(3)
    };

    this.paymentService.pay(paymentData).subscribe(
      (response: ListResponseModel<Payment>) => {
      
        console.log(response); 
        console.log(paymentData)
        this.resetCart();
        this.toastrService.success('Ödeme başarılı!');
      },
      (error) => {
        console.log(error);
        this.toastrService.error('Ödeme başarısız!');
      }
    );
   
  }

  resetCart() {
    CartItems.length = 0;
  }

}
