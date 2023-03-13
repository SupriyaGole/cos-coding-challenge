import { Component } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private tokenKey = 'token';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            this.errorMessage = error.error.message.replace(/"\"/, this.email);
          } else {
            this.errorMessage = "An error occurred.";
          }
          return of('error');
        })
      )
      .subscribe(response => {
        if(response !== 'error'){
          this.router.navigate(['/dashboard']);
          // @ts-ignore
          localStorage.setItem('userId', response?.userId);
          // @ts-ignore
          localStorage.setItem(this.tokenKey, response?.token);
        }
      });
  }
}
