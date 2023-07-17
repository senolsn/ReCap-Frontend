import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = "https://localhost:44317/api/"
  constructor(private httpClient:HttpClient) { }

  pay(payment:Payment):Observable<ListResponseModel<Payment>>{
    let newPath = this.apiUrl +"payments/pay";
    return this.httpClient.post<ListResponseModel<Payment>>(newPath,payment);

  }

}
