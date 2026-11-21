import { Routes } from '@angular/router';
import { authGuard } from './core/auth';

// Pages are lazy-loaded so each one only ships the PrimeNG components it uses.
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login').then((m) => m.Login), title: 'Login' },
  {
    path: 'employees',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/employee-list').then((m) => m.EmployeeList), title: 'Employees' },
      { path: 'new', loadComponent: () => import('./pages/employee-add').then((m) => m.EmployeeAdd), title: 'Add Employee' },
      { path: ':username', loadComponent: () => import('./pages/employee-detail').then((m) => m.EmployeeDetail), title: 'Employee Detail' },
    ],
  },
  { path: '**', redirectTo: 'employees' },
];
