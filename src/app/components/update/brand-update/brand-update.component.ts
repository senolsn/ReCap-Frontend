import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brands:Brand[];
  brandId: number;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.activatedRoute.params.subscribe((params) => {
      this.brandId = Number(params['brandId']);
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

  getBrands(){
    this.brandService.getBrands().subscribe((response=>{
      this.brands = response.data;
    }))
  }
}
