export interface Car {
  carId: number;
  description: string;
  brandId: number;
  brandName: string;
  colorId: number;
  colorName: string;
  dailyPrice: number;
  imagePath:string;
  modelYear:number;
  rentDate:Date,
  returnDate:Date
}
