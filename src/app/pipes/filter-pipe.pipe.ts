import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filter:string): Car[] {
    if(!filter || filter.trim() === ''){
      return value;
    }

    filter = filter.toLowerCase();
    return value.filter(car => 
      car.brandName.toLowerCase().includes(filter) ||
      car.colorName.toLowerCase().includes(filter) ||
      car.description.toLowerCase().includes(filter)
    )
  }

}
