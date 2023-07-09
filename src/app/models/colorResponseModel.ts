import { ResponseModel } from "./ResponseModel";
import { Color } from "./color";

export interface ColorResponseModel extends ResponseModel{
    data:Color[]
}