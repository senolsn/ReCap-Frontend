import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
    user:User;
    settingsForm:FormGroup;
    currentMail:string;
  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService
    ) {}


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { email: string } = jwtDecode(token);
      this.userService.getByMail(decodedToken.email).subscribe(response => {
        this.user = response;
        
        this.settingsForm.patchValue({
          firstName: response.firstName,
          lastName:response.lastName,
          password:'',
          email:response.email,
          id:response.id
        })
      });
    } else {
      console.error('Token bulunamadı veya geçersiz.');
    }
    this.createSettingsForm();
  }


  createSettingsForm() {
    this.settingsForm = this.formBuilder.group({
      id: ["", Validators.required],
      email: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(3)]], // Validators.minLength'ü buradan kaldırın
    });
  }
  

  update(){
    if(this.settingsForm.valid){
        const userModel:User = Object.assign({},this.settingsForm.value);
        this.userService.update(userModel).subscribe(response => {
          this.toastrService.success('Profil bilgileri güncellendi', 'Başarılı');
        }, responseError => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
            }
          }
        })
      
    }else{
      this.toastrService.error('Formunuz Eksik !', 'Hata');
    }
  }
}
