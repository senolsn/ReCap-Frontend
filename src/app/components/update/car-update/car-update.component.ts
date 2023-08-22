import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  carUpdateForm: FormGroup;
  carId: number;
  currentCar: any;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['id'];
      this.getCarById(this.carId);
    });
    this.getBrands();
    this.getColors();
    this.createCarUpdateForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
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
}
