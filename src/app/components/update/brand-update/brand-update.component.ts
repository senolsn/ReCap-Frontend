import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit,AfterViewInit {
  brandUpdateForm: FormGroup;
  brands:Brand[];
  brandId: number;
  brandCars:Car[];

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private carService:CarService
  ) {}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.getBrands();
    this.activatedRoute.params.subscribe((params) => {
      this.brandId = Number(params['brandId']);
      this.getCarsByBrand(this.brandId);
    });
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.brandId],
      brandName: ['', Validators.required],
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success('Güncelleme Tamamlandı!', 'Başarılı');
          this.brandUpdateForm.reset();
          
            this.router.navigate(['/list/brands']);
          
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage
              );
            }
          }
        }
      );
    }else{
      this.toastrService.error("Formunuz hatalı veya eksik !","Dikkat !");
    }
  }

  async delete() {
    const confirmed = await this.sweetAlertService.confirmDelete();

    if(confirmed) {
     if(this.brandCars.length > 0){
      this.toastrService.error("Bu Markaya Ait Araç Bulunmaktadır!","Hata!")
      return;
     }

     let brandModel = Object.assign({}, this.brandUpdateForm.value);
     this.brandService.delete(brandModel).subscribe(response => {
      this.toastrService.success("Marka Silindi!","Başarılı!")
      this.router.navigate(['list/brands']);
     })

    }
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.brandCars = response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response=>{
      this.brands = response.data;
    }))
  }
}
