import { BrandService } from './../../services/brand.service';
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[] = [];
  currentBrand:Brand;

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    return this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
      if(brand == this.currentBrand){
      return "list-group-item active text-center"
    }else{
      return "list-group-item text-center"
    }
  }

  
}
