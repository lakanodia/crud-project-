import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IApiData {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  password: string;
  roleID: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  registerUser(data: IApiData) {
    return this.http.post<IApiData>('http://localhost:3000/usersList/', data);
  }

  getUsers() {
    return this.http.get<any>('http://localhost:3000/usersList/');
  }
}
