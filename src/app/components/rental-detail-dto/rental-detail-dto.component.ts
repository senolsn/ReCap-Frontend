import { RentalDetailDtoService } from './../../services/rental-detail-dto.service';
import { Component, OnInit } from '@angular/core';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';

@Component({
  selector: 'app-rental-detail-dto',
  templateUrl: './rental-detail-dto.component.html',
  styleUrls: ['./rental-detail-dto.component.css']
})
export class RentalDetailDtoComponent implements OnInit {
  rentalDetailDtos:RentalDetailDto[] = [];
  constructor(private rentalDetailDtoService: RentalDetailDtoService) { }
    
  ngOnInit(): void {
  
    this.getRentalDetailsDto();
  }


  getRentalDetailsDto(){
    return this.rentalDetailDtoService.getRentalDetailDtos().subscribe(response => {
      this.rentalDetailDtos = response.data;
    });
  }

  }
  

