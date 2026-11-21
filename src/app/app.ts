import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './core/auth';
import { ThemeToggle } from './core/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ButtonModule, ToastModule, ThemeToggle],
  template: `
    @if (auth.loggedIn()) {
      <header class="sticky top-0 z-40 bg-slate-900 shadow-md dark:border-b dark:border-slate-800">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <a routerLink="/employees" class="flex items-center gap-2.5 font-semibold text-white">
            <span class="grid size-9 place-items-center rounded-xl bg-primary text-primary-contrast shadow-sm">
              <i class="pi pi-users"></i>
            </span>
            <span class="hidden sm:inline">Employee Management</span>
          </a>
          <div class="flex items-center gap-1">
            <app-theme-toggle />
            <button pButton type="button" severity="secondary" [text]="true" class="text-slate-300! hover:bg-white/10! hover:text-white!" (click)="logout()">
              <i class="pi pi-sign-out"></i> Logout
            </button>
          </div>
        </div>
      </header>
    }
    <main class="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <router-outlet />
    </main>
    <p-toast position="top-right" />
  `,
})
export class App {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
