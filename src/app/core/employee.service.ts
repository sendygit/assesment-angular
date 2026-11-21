import { Injectable, signal } from '@angular/core';

export interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export const GROUPS = [
  'Engineering', 'Finance', 'Human Resources', 'Marketing', 'Sales',
  'Operations', 'Legal', 'Product', 'Design', 'Customer Support',
];

export const STATUSES = ['Active', 'Probation', 'Inactive'];

export const STATUS_SEVERITY: Record<string, 'success' | 'info' | 'secondary'> = {
  Active: 'success',
  Probation: 'info',
  Inactive: 'secondary',
};

const FIRST_NAMES = [
  'Andi', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hadi', 'Indah', 'Joko',
  'Kartika', 'Lina', 'Made', 'Nina', 'Oka', 'Putri', 'Rizky', 'Sari', 'Tono', 'Wulan',
];
const LAST_NAMES = [
  'Pratama', 'Santoso', 'Wijaya', 'Saputra', 'Lestari', 'Nugroho', 'Hidayat', 'Kurniawan', 'Putra', 'Rahayu',
  'Setiawan', 'Gunawan', 'Halim', 'Siregar', 'Harahap', 'Tanjung', 'Susanto', 'Wibowo', 'Utami', 'Permana',
];

/** Deterministic dummy data, so the list looks the same on every reload. */
function createDummyEmployees(count: number): Employee[] {
  return Array.from({ length: count }, (_, i) => {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 7 + Math.floor(i / FIRST_NAMES.length)) % LAST_NAMES.length];
    const username = `${firstName}.${lastName}${i + 1}`.toLowerCase();
    const group = GROUPS[(i * 3) % GROUPS.length];
    return {
      username,
      firstName,
      lastName,
      email: `${username}@company.com`,
      birthDate: new Date(1970 + ((i * 3) % 35), (i * 5) % 12, 1 + ((i * 11) % 28)),
      basicSalary: 4_500_000 + ((i * 37) % 60) * 250_000 + (i % 4) * 0.25,
      status: STATUSES[i % STATUSES.length],
      group,
      description: `${group} team member since ${2015 + (i % 10)}.`,
    };
  });
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  readonly employees = signal(createDummyEmployees(120));

  // Lives here (not in the list page) so search/sort/paging survive visiting the detail page.
  readonly listState = {
    keyword: signal(''),
    status: signal<string | null>(null),
    group: signal<string | null>(null),
    first: signal(0),
    rows: signal(10),
    sortField: signal('username'),
    sortOrder: signal(1),
  };

  find(username: string): Employee | undefined {
    return this.employees().find((e) => e.username === username);
  }

  add(employee: Employee): void {
    this.employees.update((list) => [employee, ...list]);
  }
}
