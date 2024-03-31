import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export function handleErrorResponse(e, paramName, paramValue) {
    if(e.code === 'P2025') {
        throw new NotFoundException(`${paramName} ${paramValue}`);
    }
    if(e instanceof BadRequestException) {
        throw e;
    }
    if(e instanceof UnauthorizedException) {
        throw e;
    }
    console.log(e);
    throw new BadRequestException();
}