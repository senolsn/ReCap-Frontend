import { ListResponseModel } from 'src/app/models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44317/api/';
  constructor(private httpClient: HttpClient) {}

  getByMail(email: string): Observable<User> {
    let newPath = this.apiUrl + 'User/GetByMail?mail='+email;
    return this.httpClient.get<User>(newPath);
  }

  update(user: User): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'User/Update';
    return this.httpClient.put<ListResponseModel<User>>(newPath, user);
  }
}
