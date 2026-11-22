import { Component, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { EmployeeService, GROUPS, STATUSES } from '../core/employee';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-employee-add',
  imports: [
    ReactiveFormsModule, RouterLink,
    ButtonModule, DatePickerModule, FluidModule, InputNumberModule, InputTextModule, MessageModule, SelectModule, TextareaModule,
  ],
  templateUrl: './employee-add.html',
})
export class EmployeeAdd {
  private readonly service = inject(EmployeeService);
  private readonly messages = inject(MessageService);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly statuses = STATUSES;
  protected readonly groups = GROUPS;
  protected readonly today = new Date();

  protected readonly form = this.fb.group({
    username: ['', [Validators.required, this.uniqueUsername.bind(this)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    birthDate: this.fb.control<Date | null>(null, [Validators.required, this.notInFuture.bind(this)]),
    basicSalary: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
    status: ['', Validators.required],
    group: ['', Validators.required],
    description: ['', Validators.required],
  });

  isInvalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.touched && control.invalid;
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messages.add({ severity: 'error', summary: 'Not saved', detail: 'Please complete all required fields.' });
      return;
    }
    const value = this.form.getRawValue();
    this.service.add({ ...value, birthDate: value.birthDate!, basicSalary: value.basicSalary! });
    this.messages.add({ severity: 'success', summary: 'Saved', detail: `Employee ${value.username} added.` });
    this.router.navigate(['/employees']);
  }

  private uniqueUsername(control: AbstractControl<string>): ValidationErrors | null {
    return this.service.find(control.value.trim()) ? { taken: true } : null;
  }

  private notInFuture(control: AbstractControl<Date | null>): ValidationErrors | null {
    return control.value && control.value > this.today ? { future: true } : null;
  }
}
