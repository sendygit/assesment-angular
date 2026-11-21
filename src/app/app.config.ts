import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

const AppTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}',
    },
    // Use teal-600 (#0D9488) as the main colour instead of Aura's default 500.
    colorScheme: {
      light: { primary: { color: '{primary.600}', hoverColor: '{primary.700}', activeColor: '{primary.800}' } },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    providePrimeNG({
      // Free PrimeUI Community License key (https://primeui.dev/licenses/community).
      license:
        'eyJpZCI6Ijg3YmRiNWYzLWIyZmYtNDUzNS04MzZkLTczZWJkNWEyOTVjOCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTUyMzYxNTksImV4cCI6MTgyNjc3MjE1OX0.7Ed7ApCaCs9QEp9DoEG8SScOJ1ATxrRFD-jhi1x-ZGnvfl8ko6YxJGmHrCfRDgbc-vqyAXjlHIDKenZPTKdZCg',
      theme: {
        preset: AppTheme,
        // Light theme only: '.app-dark' is never applied.
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: { name: 'primeng', order: 'theme, base, primeng' },
        },
      },
    }),
    MessageService,
  ],
};
