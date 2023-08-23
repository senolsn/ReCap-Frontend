import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {
  cars:Car[];
  constructor(
    private carService:CarService,
    private sweetAlertService: SweetAlertService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    return this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    });
  }

  async deleteCar(car:Car) {
    const confirmed = await this.sweetAlertService.confirmDelete();

    if (confirmed) {
     this.carService.delete(car).subscribe(response => {
      this.toastrService.success("Deleted !");
      console.log(car);

     },responseError => {
      this.toastrService.error("Error !");
      console.log(car);
     })
    }
  }

}
