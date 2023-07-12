import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  baseUrl: string = "https://localhost:44317/Uploads/Images/";

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    });
  }

  //Resim URL'sini aldığımız data
  getCarImageUrl(imagePath: string): string {
    if (imagePath !== null) {
      return this.baseUrl + imagePath;
    }
    return this.baseUrl + "default.jpg";
  }
}
