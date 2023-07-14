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

  //Ana sayfadaki arabalar
  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"Cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  //Ana Sayfa Marka Filtresi 
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getcarsdtobybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  //Ana Sayfa Renk Filtresi
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getcarsdtobycolorid?id="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  //Car-Detail sayfasında Kullanılıyor.
  getCarDetail(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "Cars/getcardetail?id=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  


}
