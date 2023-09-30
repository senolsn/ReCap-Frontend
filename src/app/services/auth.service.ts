import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44317/api/";
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl+ "auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel):Observable<TokenModel>{
    let newPath = this.apiUrl+ "auth/register";
    return this.httpClient.post<TokenModel>(newPath,registerModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token"))
    {
      return true;
    }else{
      return false;
    }
  }
  
}
