import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  
  
  ngOnInit(): void {
  }

  constructor(
    private authService:AuthService,
    private toastrService:ToastrService
  ) {}


  isAuth():boolean{
    return this.authService.isAuthenticated();
  }


  logOut(){
    localStorage.removeItem("token");
    this.toastrService.warning("Çıkış Yapılıyor...,","Başarılı")
  }
}
