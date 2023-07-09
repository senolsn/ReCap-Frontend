import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44317/api/customers/getall";
  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<CustomerResponseModel>{

    return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
}
