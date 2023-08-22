import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44317/api/";
  constructor(private httpClient:HttpClient) { }
  
  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "Brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ListResponseModel<Brand>> (newPath,brand);
  }

  update(brand:Brand):Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.put<ListResponseModel<Brand>>(newPath,brand);
  }


}
