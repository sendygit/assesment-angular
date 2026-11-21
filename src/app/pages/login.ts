import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputPasswordModule } from 'primeng/inputpassword';
import { AuthService } from '../core/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonModule, FluidModule, IconFieldModule, InputIconModule, InputPasswordModule, InputTextModule, MessageModule,
  ],
  template: `
    <div class="fixed inset-0 flex items-center justify-center overflow-y-auto bg-linear-to-br from-slate-900 via-slate-800 to-teal-700 p-4">
      <form class="card animate-fade-in w-full max-w-sm border-0 p-8 shadow-2xl" [formGroup]="form" (ngSubmit)="submit()">
        <div class="mb-7 text-center">
          <span class="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-primary text-xl text-primary-contrast shadow-md">
            <i class="pi pi-users"></i>
          </span>
          <h1 class="text-xl font-semibold text-slate-900">Welcome back</h1>
          <p class="text-sm text-slate-500">Sign in to manage employees</p>
        </div>

        <p-fluid class="flex flex-col gap-4">
          <div>
            <label class="label" for="username">Username</label>
            <input pInputText id="username" formControlName="username" autocomplete="username" [invalid]="isInvalid('username')" />
            @if (isInvalid('username')) {
              <p-message severity="error" variant="simple" size="small">Username is required.</p-message>
            }
          </div>

          <div>
            <label class="label" for="password">Password</label>
            <p-iconfield>
              <input
                pInputPassword
                id="password"
                formControlName="password"
                autocomplete="current-password"
                [(mask)]="masked"
                [invalid]="isInvalid('password')"
              />
              <p-inputicon>
                <button
                  type="button"
                  class="cursor-pointer"
                  [attr.aria-label]="masked() ? 'Show password' : 'Hide password'"
                  (click)="masked.set(!masked())"
                >
                  <i class="pi" [class]="masked() ? 'pi-eye' : 'pi-eye-slash'"></i>
                </button>
              </p-inputicon>
            </p-iconfield>
            @if (isInvalid('password')) {
              <p-message severity="error" variant="simple" size="small">Password is required.</p-message>
            }
          </div>

          @if (error()) {
            <p-message severity="error" icon="pi pi-times-circle">{{ error() }}</p-message>
          }

          <button pButton type="submit" class="mt-2"><i class="pi pi-sign-in"></i> Login</button>
        </p-fluid>

        <p class="mt-5 text-center text-xs text-slate-400">Demo: admin / admin123</p>
      </form>
    </div>
  `,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly error = signal('');
  protected readonly masked = signal(true);
  protected readonly form = inject(NonNullableFormBuilder).group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  isInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.touched && control.invalid;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, password } = this.form.getRawValue();
    if (this.auth.login(username, password)) {
      this.router.navigate(['/employees']);
    } else {
      this.error.set('Invalid username or password.');
    }
  }
}
