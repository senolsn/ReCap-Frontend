import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit,AfterViewInit {
  carId: number;
  car: any;
  baseUrl: string = 'https://localhost:44317/Uploads/Images/';
  carRentals: Rental[];
  selectRentDay: Date;
  selectReturnDay: Date;
  hiredDay: number;
  totalPrice: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['id'];
      this.getCarDetail();
      this.getRentalsByCarId();
    });
  }

  getCarDetail(): void {
    this.carService.getCarDetail(this.carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getCarImageUrl(imagePath: string): string {
    if (imagePath && imagePath !== null) {
      return this.baseUrl + imagePath;
    }
    return this.baseUrl + 'default.jpg';
  }

  getRentalsByCarId() {
    return this.rentalService
      .getRentalsByCarId(this.carId)
      .subscribe((response) => {
        this.carRentals = response.data;
      });
  }

  addToCart(car: Car) {
    const currentDate = new Date();
    const currentFormatedDate = currentDate.toISOString().split('T')[0];
    const rentalDate = new Date(
      this.carRentals[this.carRentals.length - 1].returnDate
    );
    const rentalFormatedDate = rentalDate.toISOString().split('T')[0];

    //Not: Burada önce araç daha önce kiralanmış mı onun kontrolünü yapacağım. Eğer kiralanmışsa son kiralanma Tarihini kontrol edeceğim. Eğer kiralanmamışsa undefined dönüyorsa yeni bir Rental oluşturacağım Rental.Add kullanılacak yani

    if (this.selectRentDay?.toString() > currentFormatedDate && this.selectRentDay < this.selectReturnDay && rentalFormatedDate < currentFormatedDate) {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.day = this.getHiredDay();
      
      this.cartService.addToCart(cartItem);
      //BURAYA KONTROL YAZILMALI EĞER SEPETTE MEVCUTSA AŞAĞIDAKİ TOASTI GÖSTERME
      this.toastrService.success('Araç Sepetinize Eklendi!');
    } else {
      this.toastrService.error(
        'Lütfen kiralamak istediğiniz tarih aralıklarını kontrol ediniz !'
      );
    }
  }

  //Kiralanacak gün * Aracın Günlük Fiyatı
  getTotalPrice(): number {
    return this.hiredDay * this.car.dailyPrice;
  }

  //Teslim Edilecek Tarih - Teslim Alınacak Tarih
  getHiredDay(): number {
    const returnDate = new Date(this.selectReturnDay);
    const rentDate = new Date(this.selectRentDay);
    const timeDifference = returnDate.getTime() - rentDate.getTime();
    const hiredDayNumber = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return hiredDayNumber;
  }

  //Teslim Alınacak Tarihi Anlık Olarak Sitede gösterir.
  onRentDayChange() {
    if (this.selectRentDay && this.selectReturnDay) {
      this.hiredDay = this.getHiredDay();
      this.totalPrice = this.getTotalPrice();
    }
  }
  //Teslim Edilecek Tarihi Anlık Olarak Sitede gösterir.
  onReturnDayChange() {
    if (this.selectRentDay && this.selectReturnDay) {
      this.hiredDay = this.getHiredDay();
      this.totalPrice = this.getTotalPrice();
    }
  }
}
