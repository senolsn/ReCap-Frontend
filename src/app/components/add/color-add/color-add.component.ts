import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  
  colorAddForm:FormGroup;
  
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private router:Router) {}
  
  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName: ["",Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(response =>{
        this.toastrService.success("Renk Eklendi !","Başarılı");
        this.colorAddForm.reset();
        this.router.navigate(["list/colors"]);
      }, responseError => {
        if(responseError.error.Errors.length > 0){
          for(let i = 0; i < responseError.error.Erorrs.length; i++){
            this.toastrService.error(responseError.error.Erorrs[i]);
          }
        }
      });
    }else{
      this.toastrService.error("Formunuz Eksik !","Dikkat !")
    }
  }
}
