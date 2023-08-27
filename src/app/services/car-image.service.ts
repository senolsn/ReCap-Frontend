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

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "CarImages/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  addCarImage(carId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('carId', carId.toString());
    formData.append('file', file);
    
    let newPath = this.apiUrl + "carImages/add";
    return this.httpClient.post<any>(newPath, formData);
  }

  deleteCarImage(carImage: CarImage,) {
    let newPath = this.apiUrl + "CarImages/Delete";
    return this.httpClient.post(newPath,carImage)

  }
}
