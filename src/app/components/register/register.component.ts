import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm:FormGroup;
  
  constructor(
    private authService:AuthService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
  ){}
  
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }



  register() {
    if (this.registerForm.valid) {
      const password = this.registerForm.get('password').value;
      const confirmPassword = this.registerForm.get('confirmPassword').value;
  
      if (password === confirmPassword) {
        let registerModel = Object.assign({}, this.registerForm.value);
        this.authService.register(registerModel).subscribe(
          (response) => {
            this.toastrService.success("Kayıt Oluşturuluyor...", "Başarılı");
            console.log(response)
            localStorage.setItem("token", response.token);
            this.router.navigate(["/cars"]);
          },
          (responseError) => {
            this.toastrService.error(responseError.error);
          }
        );
      } else {
        this.toastrService.error("Şifreler uyuşmuyor.", "Hata");
      }
    }else{
      this.toastrService.error("Formunuz Eksik veya Hatalı","Hata")
    }
  }
  

}
