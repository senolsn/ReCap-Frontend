import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = "https://localhost:44317/api/"
  constructor(private httpClient:HttpClient) { }

  getImagesByCarId():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + ""
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
