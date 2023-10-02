import { BrandUpdateComponent } from './components/update/brand-update/brand-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { BrandAddComponent } from './components/add/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add/color-add/color-add.component';
import { CarAddComponent } from './components/add/car-add/car-add.component';
import { CarImageAddComponent } from './components/add/car-image-add/car-image-add.component';
import { ListCarsComponent } from './components/list/list-cars/list-cars.component';
import { ListBrandComponent } from './components/list/list-brand/list-brand.component';
import { ListColorComponent } from './components/list/list-color/list-color.component';
import { ColorUpdateComponent } from './components/update/color-update/color-update.component';
import { CarUpdateComponent } from './components/update/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cars', component: CarComponent },
  { path: 'colors', component: ColorComponent, canActivate: [LoginGuard] },
  { path: 'brands', component: BrandComponent},
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'cart-detail', component: CartDetailComponent },
  { path: 'payment', component: PaymentComponent,canActivate: [LoginGuard] },
  { path: 'brand/add', component: BrandAddComponent,canActivate: [LoginGuard] },
  { path: 'color/add', component: ColorAddComponent,canActivate: [LoginGuard] },
  { path: 'car/add', component: CarAddComponent,canActivate: [LoginGuard] },
  { path: 'carImage/add/:carId', component: CarImageAddComponent,canActivate: [LoginGuard] },
  { path: 'list/cars', component: ListCarsComponent,canActivate: [LoginGuard] },
  { path: 'list/brands', component: ListBrandComponent,canActivate: [LoginGuard] },
  { path: 'list/colors', component: ListColorComponent,canActivate: [LoginGuard] },
  { path: 'color/update', component: ColorUpdateComponent,canActivate: [LoginGuard] },
  { path: 'brand/update/:brandId', component: BrandUpdateComponent,canActivate: [LoginGuard] },
  { path: 'color/update/:colorId', component: ColorUpdateComponent,canActivate: [LoginGuard] },
  { path: 'car/update/:id', component: CarUpdateComponent,canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: "settings",component:SettingsComponent, canActivate: [LoginGuard]},
  { path: "register", component:RegisterComponent},
  { path: "about-us", component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
