import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit,AfterViewInit {
  colors: Color[];
  colorUpdateForm: FormGroup;
  colorId:number;
  colorCars:Car[]

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private sweetAlertService:SweetAlertService,
    private carService:CarService
  ) {}
  
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.colorId = params["colorId"];
      this.getCarsByColor(this.colorId);
    })
    this.getColors();
    this.createColorUpdateForm();
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.colorId, Validators.required],
      colorName: ['', Validators.required],
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success('Güncelleme Tamamlandı!', 'Başarılı');
          this.colorUpdateForm.reset();
          this.router.navigate(["list/colors"])
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
      if(this.colorCars.length > 0){
        this.toastrService.error("Bu Renge Ait Araç Bulunmaktadır!","Hata!")
      return;
      }

      let colorModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.delete(colorModel).subscribe(response => {
      this.toastrService.success("Renk Silindi!","Başarılı!")
      this.router.navigate(['list/colors']);
      })
    }
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe((response) => 
    {
      this.colorCars = response.data;
      console.log(this.colorCars);
    })
  }
}
