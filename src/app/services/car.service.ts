import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44317/api/";
  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"Cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getcarsbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getcarsbycolorid?id="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetail(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "Cars/getcardetail?id=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }


}
