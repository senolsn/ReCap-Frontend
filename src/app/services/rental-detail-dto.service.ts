import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { RentalDetailDtoResponseModel } from '../models/rentalDetailDtoResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailDtoService {
  apiUrl = "https://localhost:44317/api/rentals/getrentaldetails";
  constructor(private httpClient: HttpClient) { }

  getRentalDetailDtos():Observable<RentalDetailDtoResponseModel>{

    return this.httpClient.get<RentalDetailDtoResponseModel>(this.apiUrl);

  }
}
