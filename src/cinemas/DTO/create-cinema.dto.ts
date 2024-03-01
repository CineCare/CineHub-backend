import { ApiProperty } from '@nestjs/swagger';

export class CreateCinemaDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    address1: string;

    @ApiProperty({required: false})
    address2?: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    postalCode: string;

    @ApiProperty({required: false})
    email?: string;

    @ApiProperty({required: false})
    phone?: string;
}