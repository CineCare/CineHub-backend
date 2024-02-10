import { ApiProperty } from '@nestjs/swagger';

export class CreateCinemaDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    address1: string;

    @ApiProperty()
    address2: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    phone?: string;
}