import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const USERID_KEY = 'user_id';
const TOKEN_KEY = 'user_token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {}

  isAuthenticated(): Promise<boolean> | boolean {
    const token = this.storage.get(TOKEN_KEY);
    return token !== null;
  }

  get userToken() {
    return this.storage.get(TOKEN_KEY);
  }

  set userToken(token: string) {
    this.storage.set(TOKEN_KEY, token);
  }

  get userID() {
    return this.storage.get(USERID_KEY);
  }

  set userID(email: string) {
    this.storage.set(USERID_KEY, email);
  }

  invalidateToken() {
    this.storage.set(TOKEN_KEY, null);
    this.storage.set(USERID_KEY, null);
  }
}
