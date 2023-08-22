import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css']
})
export class ListBrandComponent implements OnInit {
  brands:Brand[];
  constructor(private brandService:BrandService) {}
  
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    return this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    });
  }

  

}
