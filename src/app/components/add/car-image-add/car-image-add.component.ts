import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { FormGroup,FormBuilder,Validators, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit,AfterViewInit {
  carId: number;
  cars: Car[] = [];
  selectedFile: File;
  carImageAddForm:FormGroup;
  currentCarImagePath:any;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private carImageService: CarImageService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.carId = params["carId"];
      this.getCarImages(this.carId);
    })
    this.getCarsById(this.carId);
    this.createCarImageForm();
  }

  createCarImageForm(){
    this.carImageAddForm = this.formBuilder.group({
      carId:[this.carId,Validators.required]
    })
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onUpload(): void {
    console.log("Car Id : "+ this.carId );
    if(this.carImageAddForm.valid){
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
  }

  getCarsById(carId:number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response => {
      this.currentCarImagePath = response.data[0];
    })

  }

  deleteCarImage(){
    if (this.currentCarImagePath.imagePath !== "wwwroot\\Uploads\\Images\\") {
      this.carImageService.deleteCarImage(this.currentCarImagePath).subscribe(
        response => {
          this.toastrService.success("Resim Silindi!","Başarılı!");
          this.router.navigate(["list/cars"]);
          // Resim silindiğinde bu alanda gerekli güncellemeleri yapabilirsiniz.
        },
        responseError => {
          this.toastrService.error("Resim Silinemedi!","Hata!");
        }
      );
    } else {
      this.toastrService.warning("Varsayılan resim silinemez.","Uyarı");
    }
  }
}

