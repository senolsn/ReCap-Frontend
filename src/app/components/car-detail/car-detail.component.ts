import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carId:number;
  car:any;
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
    });
  }

  
}
