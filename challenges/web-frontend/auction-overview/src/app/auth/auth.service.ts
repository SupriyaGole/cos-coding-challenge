import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  login(email: string, password: string) {
    const url = `https://api-core-dev.caronsale.de/api/v1/authentication/${email}`;
    return this.http.put(url, {password: password});
  }
}
