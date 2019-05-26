import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  getUrl: string = 'https://jsonplaceholder.typicode.com/users';
  getUrlCountry: string ='https://restcountries.eu/rest/v2/region/americas';
  listUser: any;
  listCountry: any;

  constructor(private http: HttpClient) { }

  getConfig() {
    this.listUser = this.http.get(this.getUrl);
    return this.listUser;
  }

  getCountry() {
    this.listCountry = this.http.get(this.getUrlCountry);
    return this.listCountry;
  }
}
