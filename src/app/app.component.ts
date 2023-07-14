import { BrandService } from './services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ColorService } from './services/color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReCapProject-Frontend';
  brandOptions: any[] = [];
  colorOptions: any[] = []; 

 
  constructor(
    private brandService:BrandService,
    private colorService:ColorService) {}

  ngOnInit(): void {
    this.getBrandOptions();
    this.getColorOptions();
  }


  getBrandOptions(){
    return this.brandService.getBrands().subscribe(response => {
      this.brandOptions = response.data;
    });
  }

  getColorOptions(){
    return this.colorService.getColors().subscribe(response => {
      this.colorOptions = response.data;
    });
  }

}