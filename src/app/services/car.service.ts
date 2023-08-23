import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/ResponseModel';

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

  getCarsByBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getcarsdtobybrandandcolorid?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/add"
    return this.httpClient.post<ListResponseModel<Car>>(newPath,car);
  }

  update(car:Car):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/update";
    return this.httpClient.put<ListResponseModel<Car>>(newPath,car);
  }

  delete(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl +"Cars/delete";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
  

  getCarById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbyid?id="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  


}
