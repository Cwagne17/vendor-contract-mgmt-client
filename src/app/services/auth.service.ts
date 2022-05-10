import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'presence';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public headers = new HttpHeaders();

  constructor(
    private cookie: CookieService
  ) {}

  private deleteToken() {
    // These parameters are now required by the library. The '/' is just so that we can access the cookie for our domain. We are not allowed to delete cookies from other domains
    this.cookie.delete('presence', '/', environment.host, false, 'Lax');
    // Since the cookie.delete doesn't seem to want to cooperate in prod I'm explicitly setting it to empty using good old fashioned JS
    document.cookie =
      'presence=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  public initHeaders() {
    const token = this.cookie.get(TOKEN_KEY);
    if (token !== null && token !== undefined && token !== '') {
      this.headers = new HttpHeaders().append('Authorization', `${'Bearer ' + token}`);
    }
  }

  /**
   * This method clears the authorization header after the user logs out.
   * This prevents errors when the user logs out and attempts to log back in
   */
  private clearAuthHeader() {
    this.headers = new HttpHeaders().delete('Authorization');
  }
}