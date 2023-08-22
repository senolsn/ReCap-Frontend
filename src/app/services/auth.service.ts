import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

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

  register(){

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
