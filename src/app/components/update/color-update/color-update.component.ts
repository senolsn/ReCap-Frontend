import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  colors: Color[];
  colorUpdateForm: FormGroup;
  colorId:Number;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.colorId = params["colorId"];
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

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
