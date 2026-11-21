import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { EmployeeService, STATUS_SEVERITY } from '../core/employee.service';
import { RupiahPipe } from '../core/rupiah.pipe';

@Component({
  selector: 'app-employee-detail',
  imports: [DatePipe, RupiahPipe, RouterLink, AvatarModule, ButtonModule, TagModule],
  template: `
    <section class="animate-fade-in mx-auto max-w-2xl">
      @if (employee(); as e) {
        <div class="card overflow-hidden">
          <div class="flex items-center gap-4 border-b border-slate-100 bg-linear-to-r from-primary-50 to-white p-6">
            <p-avatar [label]="e.firstName[0] + e.lastName[0]" size="xlarge" shape="circle" class="shrink-0 bg-primary! text-primary-contrast!" />
            <div class="min-w-0">
              <h1 class="truncate text-xl font-semibold text-slate-900">{{ e.firstName }} {{ e.lastName }}</h1>
              <p class="truncate text-sm text-slate-500">&#64;{{ e.username }}</p>
            </div>
            <p-tag class="ml-auto" [value]="e.status" [severity]="statusSeverity[e.status]" [rounded]="true" />
          </div>

          <dl class="grid gap-x-6 gap-y-5 p-6 sm:grid-cols-2">
            @for (item of [
              { icon: 'pi-envelope', label: 'Email', value: e.email },
              { icon: 'pi-sitemap', label: 'Group', value: e.group },
              { icon: 'pi-calendar', label: 'Birth Date', value: e.birthDate | date: 'd MMMM yyyy' },
              { icon: 'pi-wallet', label: 'Basic Salary', value: e.basicSalary | rupiah },
            ]; track item.label) {
              <div class="flex gap-3">
                <i class="pi mt-1 text-slate-400" [class]="item.icon"></i>
                <div class="min-w-0">
                  <dt class="text-xs tracking-wide text-slate-500 uppercase">{{ item.label }}</dt>
                  <dd class="mt-0.5 font-medium break-all text-slate-800">{{ item.value }}</dd>
                </div>
              </div>
            }
            <div class="flex gap-3 sm:col-span-2">
              <i class="pi pi-align-left mt-1 text-slate-400"></i>
              <div>
                <dt class="text-xs tracking-wide text-slate-500 uppercase">Description</dt>
                <dd class="mt-0.5 text-slate-800">{{ e.description }}</dd>
              </div>
            </div>
          </dl>

          <div class="flex justify-end border-t border-slate-100 p-4">
            <a pButton class="px-8" routerLink="/employees">OK</a>
          </div>
        </div>
      } @else {
        <div class="card p-10 text-center">
          <i class="pi pi-user-minus mb-3 block text-3xl text-slate-300"></i>
          <p class="mb-5 text-slate-500">Employee "{{ username() }}" not found.</p>
          <a pButton routerLink="/employees">OK</a>
        </div>
      }
    </section>
  `,
})
export class EmployeeDetail {
  private readonly service = inject(EmployeeService);

  /** Bound from the :username route param. */
  readonly username = input.required<string>();

  protected readonly employee = computed(() => this.service.find(this.username()));
  protected readonly statusSeverity = STATUS_SEVERITY;
}
