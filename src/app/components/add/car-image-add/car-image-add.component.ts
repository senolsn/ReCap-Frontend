import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service'; // Import the CarImageService

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {
  carId: number;
  cars: Car[] = [];
  selectedFile: File;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onUpload(): void {
    if (!this.carId || !this.selectedFile) {
      this.toastrService.error("Resim Bulunamadı","Hata");
      return;
    }

    this.carImageService.addCarImage(this.carId, this.selectedFile).subscribe(
      (response) => {
        if (response.success) {
          this.toastrService.success("Resim Yüklendi!", "Başarılı");
        } else {
          this.toastrService.error("Resim Yüklenmedi!", "Hata");
        }
      },
      (error) => {
        this.toastrService.error("Resim Yüklenmedi!", "Hata");
      }
    );
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
}

