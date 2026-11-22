import { Pipe, PipeTransform } from '@angular/core';

/** 12500000.5 → "Rp. 12.500.000,50" */
@Pipe({ name: 'rupiah' })
export class RupiahPipe implements PipeTransform {
  transform(value: number): string {
    return 'Rp. ' + value.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
