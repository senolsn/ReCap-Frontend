import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44317/api/";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+ "colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/add";
    return this.httpClient.post<ListResponseModel<Color>>(newPath,color);

  }

  update(color:Color):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/update";
    return this.httpClient.put<ListResponseModel<Color>>(newPath,color);
  }

  delete(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/delete";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color);
  }
}
