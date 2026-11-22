import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { EmployeeService, STATUS_SEVERITY } from '../core/employee';
import { RupiahPipe } from '../core/rupiah-pipe';

@Component({
  selector: 'app-employee-detail',
  imports: [DatePipe, RupiahPipe, RouterLink, AvatarModule, ButtonModule, TagModule],
  templateUrl: './employee-detail.html',
})
export class EmployeeDetail {
  private readonly service = inject(EmployeeService);

  readonly username = input.required<string>();

  protected readonly employee = computed(() => this.service.find(this.username()));
  protected readonly statusSeverity = STATUS_SEVERITY;
}
