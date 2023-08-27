import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CarService } from 'src/app/services/car.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit,AfterViewInit {
  brands: Brand[];
  colors: Color[];
  carUpdateForm: FormGroup;
  carId: number;
  currentCar: any;
  currentCarImagePath:any[];

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private carImageService:CarImageService
  ) {}

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['id'];
      this.getCarById(this.carId);
      this.getCarImages(this.carId);
    });
    this.getBrands();
    this.getColors();
    this.createCarUpdateForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.carId, Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      const carModel: Car = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success('Araba güncellendi', 'Başarılı');
          this.router.navigate(['list/cars']);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik !', 'Hata');
    }
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.currentCar = response.data;
      this.carUpdateForm.patchValue(this.currentCar); 
    });
  }

  async deleteCar() {
    const confirmed = await this.sweetAlertService.confirmDelete();
  
    if (confirmed) {
      if (this.currentCarImagePath.length > 0) {
        if (this.currentCarImagePath[0].imagePath !== "wwwroot\\Uploads\\Images\\") {
          this.toastrService.warning("Araç görseli bulunuyor, silme işlemi iptal edildi.", "Uyarı");
          return; 
        }
      }
      
      // Resim yolu varsayılan yolu ise veya resim yoksa
      let newCar = Object.assign({}, this.carUpdateForm.value);
  
      this.carService.delete(newCar).subscribe(
        (response) => {
          this.toastrService.success("Araç Başarıyla Silindi !", "Dikkat!");
          this.router.navigate(['list/cars']);
        },
        (responseError) => {
          this.toastrService.error("Araç Silinemedi!", "Hata!");
        }
      );
    }
  }
  


  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response => {
      //İlerleyen zamanda birden fazla resim için burasını foreach ile dönerek carousel'e basabilirsin.
      this.currentCarImagePath = response.data;
    })
    
  }
}