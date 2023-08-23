import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPalette, faLiraSign, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { BrandAddComponent } from './components/add/brand-add/brand-add.component';
import { CarAddComponent } from './components/add/car-add/car-add.component';
import { ColorAddComponent } from './components/add/color-add/color-add.component';
import { CarImageAddComponent } from './components/add/car-image-add/car-image-add.component';
import { ListCarsComponent } from './components/list/list-cars/list-cars.component';
import { ListBrandComponent } from './components/list/list-brand/list-brand.component';
import { ListColorComponent } from './components/list/list-color/list-color.component';
import { BrandUpdateComponent } from './components/update/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/update/color-update/color-update.component';
import { CarUpdateComponent } from './components/update/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


library.add(faPalette, faLiraSign, faCalendarAlt);
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    FilterPipePipe,
    VatAddedPipe,
    CartSummaryComponent,
    CartDetailComponent,
    PaymentComponent,
    CreditCardComponent,
    BrandAddComponent,
    CarAddComponent,
    ColorAddComponent,
    CarImageAddComponent,
    ListCarsComponent,
    ListBrandComponent,
    ListColorComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
