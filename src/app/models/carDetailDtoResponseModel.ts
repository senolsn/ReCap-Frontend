import { ResponseModel } from './ResponseModel';
import { CarDetailDto } from './carDetailDto';
export interface CarDetailDtoResponseModel extends ResponseModel{
    data:CarDetailDto[]
}