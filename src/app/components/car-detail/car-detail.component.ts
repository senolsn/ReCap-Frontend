import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carId:number;
  car:any;
  baseUrl: string = "https://localhost:44317/Uploads/Images/";

  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params=>{
      this.carId = params["id"];
      this.getCarDetail();
    }))
  }

  getCarDetail(): void {
    this.carService.getCarDetail(this.carId).subscribe(response => {
      this.car = response.data;
      console.log("", this.car);
    });
  }

  getCarImageUrl(imagePath: string): string {
    if (imagePath && imagePath !== null) {
      return this.baseUrl + imagePath;
    }
    return this.baseUrl + 'default.jpg';
  }

  
}
