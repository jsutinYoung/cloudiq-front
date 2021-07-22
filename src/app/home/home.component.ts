import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    try {
      const headers = new HttpHeaders().set('content-type', 'application/json');
      this.http
        .get('http://localhost:8000/hello')
        .pipe(
          retry(3) // retry a failed request up to 3 times
          // catchError(this.handleError)  // then handle the error
        )
        .subscribe((result) => {
          if (result['status'] && result['data'].length > 0) {
            console.log(result);
          }
        });
    } catch (err) {
      console.log('get Hello error');
    }
  }

  ngOnInit(): void {}

  async logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
