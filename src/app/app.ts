import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './core/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ButtonModule, ToastModule],
  template: `
    @if (auth.loggedIn()) {
      <header class="sticky top-0 z-40 bg-slate-900 shadow-md">
        <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a routerLink="/employees" class="flex items-center gap-2.5 font-semibold text-white">
            <span class="grid size-9 place-items-center rounded-xl bg-primary text-primary-contrast shadow-sm">
              <i class="pi pi-users"></i>
            </span>
            <span class="hidden sm:inline">Employee Management</span>
          </a>
          <p-button label="Logout" icon="pi pi-sign-out" severity="secondary" [text]="true" styleClass="text-slate-300! hover:bg-white/10! hover:text-white!" (onClick)="logout()" />
        </div>
      </header>
    }
    <main class="mx-auto max-w-6xl px-4 py-6 sm:py-8">
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
