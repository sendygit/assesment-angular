import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService, SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Employee, EmployeeService, GROUPS, STATUS_SEVERITY, STATUSES } from '../core/employee';
import { RupiahPipe } from '../core/rupiah-pipe';

interface Column {
  key: keyof Employee;
  label: string;
}

@Component({
  selector: 'app-employee-list',
  imports: [
    FormsModule, RouterLink, DatePipe, RupiahPipe,
    ButtonModule, IconFieldModule, InputIconModule, InputTextModule, SelectModule, TableModule, TagModule,
  ],
  templateUrl: './employee-list.html',
})
export class EmployeeList {
  private readonly service = inject(EmployeeService);
  private readonly messages = inject(MessageService);

  protected readonly groups = GROUPS;
  protected readonly statuses = STATUSES;
  protected readonly statusSeverity = STATUS_SEVERITY;
  protected readonly columns: Column[] = [
    { key: 'username', label: 'Username' },
    { key: 'firstName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'birthDate', label: 'Birth Date' },
    { key: 'basicSalary', label: 'Salary' },
    { key: 'group', label: 'Group' },
    { key: 'status', label: 'Status' },
  ];

  protected readonly state = this.service.listState;

  /** Search fields are combined with AND. Sorting and paging are done by p-table. */
  protected readonly filtered = computed(() => {
    const term = this.state.keyword().trim().toLowerCase();
    const status = this.state.status();
    const group = this.state.group();

    return this.service.employees().filter(
      (e) =>
        (!term || `${e.username} ${e.firstName} ${e.lastName} ${e.email}`.toLowerCase().includes(term)) &&
        (!status || e.status === status) &&
        (!group || e.group === group),
    );
  });

  backToFirstPage(): void {
    this.state.first.set(0);
  }

  saveSort({ field, order }: SortEvent): void {
    this.state.sortField.set(field!);
    this.state.sortOrder.set(order!);
  }

  edit(employee: Employee): void {
    this.messages.add({ severity: 'warn', summary: 'Edit', detail: `Edit clicked for ${employee.username}.` });
  }

  remove(employee: Employee): void {
    this.messages.add({ severity: 'error', summary: 'Delete', detail: `Delete clicked for ${employee.username}.` });
  }
}
