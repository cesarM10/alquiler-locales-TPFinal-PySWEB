import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siNo',
  standalone: true
})
export class SiNoPipe implements PipeTransform {

  transform(value: boolean): unknown {
    return value ? 'Sí' : 'No';
  }

}
