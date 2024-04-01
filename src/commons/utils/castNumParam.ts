import { BadRequestException } from "@nestjs/common";

export function castNumParam(paramName, paramValue) {
    if(isNaN(+paramValue)) {
        throw new BadRequestException(`Param ${paramName} must be a number`);
    }
    return +paramValue;
}