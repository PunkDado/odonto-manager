import { Pipe, PipeTransform } from '@angular/core';
import { Dentista } from 'src/app/shared/models/dentista.model';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {
  

    return value ? list.filter(item => item.dataAtendimento === value) : list;

    }

}

/* transform(list: any[], filters: Object) {
    const keys = Object.keys(filters).filter(key => filters[key]);
    const filterDentista = dentista => keys.every(key => dentista[key] === filters[key]);

    return keys.length ? list.filter(filterDentista) : list;
  }
  */