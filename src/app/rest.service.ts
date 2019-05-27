import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Users } from './models/users.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  listUser: any;
  listCountry: any;

  constructor(private http: HttpClient) { }

  getConfig() {
    this.listUser = this.http.get<Users>(environment.getUrl);
    return this.listUser;
  }

  getCountry() {
    this.listCountry = this.http.get(environment.getUrlCountry);
    return this.listCountry;
  }
}
