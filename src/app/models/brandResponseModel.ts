import { ResponseModel } from "./ResponseModel";
import { Brand } from "./brand";

export interface BrandResponseModel extends ResponseModel{
    data:Brand[]
}