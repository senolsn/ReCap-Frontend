import { PaymentComponent } from './components/payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';

const routes: Routes = [
  { path: '', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'colors', component: ColorComponent },
  { path: 'brands', component: BrandComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'cart-detail', component: CartDetailComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'brand/add', component: BrandAddComponent },
  { path: 'color/add', component: ColorAddComponent },
  { path: 'car/add', component: CarAddComponent },
  { path: 'car/image/add', component: CarImageAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
