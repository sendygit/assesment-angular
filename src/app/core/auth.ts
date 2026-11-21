import { inject, Injectable, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Hardcoded on purpose: the assessment has no backend.
const CREDENTIALS = { username: 'admin', password: 'admin123' };
const SESSION_KEY = 'logged-in';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly loggedIn = signal(sessionStorage.getItem(SESSION_KEY) === 'true');

  login(username: string, password: string): boolean {
    const valid = username === CREDENTIALS.username && password === CREDENTIALS.password;
    if (valid) sessionStorage.setItem(SESSION_KEY, 'true');
    this.loggedIn.set(valid);
    return valid;
  }

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
    this.loggedIn.set(false);
  }
}

/** Only logged-in users may enter; others go to /login. */
export const authGuard: CanActivateFn = () =>
  inject(AuthService).loggedIn() || inject(Router).createUrlTree(['/login']);
