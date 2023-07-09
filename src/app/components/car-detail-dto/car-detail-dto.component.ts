import { CarDetailDtoService } from './../../services/car-detail-dto.service';
import { Component,OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/carDetailDto';

@Component({
  selector: 'app-car-detail-dto',
  templateUrl: './car-detail-dto.component.html',
  styleUrls: ['./car-detail-dto.component.css']
})
export class CarDetailDtoComponent implements OnInit {
  carDetailDtos: CarDetailDto[] = [];
  constructor(private carDetailDtoService:CarDetailDtoService) { }

  ngOnInit(): void {
    this.getCarDetailsDto();
  }

  getCarDetailsDto(){
    return this.carDetailDtoService.getCarDetailsDto().subscribe(response => {
      this.carDetailDtos = response.data;
    });
  }

}
