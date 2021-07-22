import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private LoginURL = null;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    // console.log(this.tokenService.baseURL);
    this.LoginURL = 'http://localhost:8000/users/login';
  }

  async login(
    email: string,
    password: string
  ): Promise<{ status; description }> {
    try {
      const headers = new HttpHeaders().set('content-type', 'application/json');
      const body = { email: email, password: password };

      const result = await this.http
        .post(this.LoginURL, body, { headers: headers })
        .pipe(
          retry(3) // retry a failed request up to 3 times
          // catchError(this.handleError)  // then handle the error
        )
        .toPromise();

      if (!(result['Token'] && result['Token'].length > 0)) {
        return of({
          status: false,
          description: result['description'],
        }).toPromise();
      }

      const token = result['Token'];
      this.tokenService.userToken = token;
      this.tokenService.userID = email;

      return of({ status: true, description: '' }).toPromise();
    } catch (err) {
      return of({ status: false, description: err.error.reason }).toPromise();
    }
  }

  logout() {
    this.tokenService.invalidateToken();
  }

  get userID(): string {
    return this.tokenService.userID;
  }

  isAuthenticated(): Promise<boolean> | boolean {
    return this.tokenService.isAuthenticated();
  }
}
