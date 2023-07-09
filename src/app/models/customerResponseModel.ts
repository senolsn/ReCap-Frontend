import { ResponseModel } from "./ResponseModel";
import { Customer } from "./customer";

export interface CustomerResponseModel extends ResponseModel{
data:Customer[]
}