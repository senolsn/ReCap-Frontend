import { ResponseModel } from "./ResponseModel";
import { RentalDetailDto } from "./rentalDetailDto";

export interface RentalDetailDtoResponseModel extends ResponseModel 
{
    data:RentalDetailDto[]
}
