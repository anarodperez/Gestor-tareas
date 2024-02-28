import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials, User } from '../models/user.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  login(credentials: LoginCredentials) {
    return this.http.post(`${this.baseUrl}/api/login`, credentials);
  }
}
