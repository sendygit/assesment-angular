import { Component, effect, inject, Injectable, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

const STORAGE_KEY = 'theme';
// Same class PrimeNG watches (darkModeSelector) and Tailwind's `dark:` variant targets.
const DARK_CLASS = 'app-dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly dark = signal(this.initialDark());

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle(DARK_CLASS, this.dark());
      localStorage.setItem(STORAGE_KEY, this.dark() ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.dark.update((dark) => !dark);
  }

  private initialDark(): boolean {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule],
  template: `
    <button
      pButton
      type="button"
      severity="secondary"
      [text]="true"
      [rounded]="true"
      [iconOnly]="true"
      class="text-slate-300! hover:bg-white/10! hover:text-white!"
      [attr.aria-label]="theme.dark() ? 'Switch to light mode' : 'Switch to dark mode'"
      (click)="theme.toggle()"
    >
      <i class="pi" [class]="theme.dark() ? 'pi-sun' : 'pi-moon'"></i>
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
