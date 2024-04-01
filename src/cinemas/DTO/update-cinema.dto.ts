import { ApiProperty } from '@nestjs/swagger';

export class UpdateCinemaDTO {
    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({required: false})
    address1?: string;

    @ApiProperty({required: false})
    address2?: string;

    @ApiProperty({required: false})
    city?: string;

    @ApiProperty({required: false})
    postalCode?: string;

    @ApiProperty({required: false})
    email?: string;

    @ApiProperty({required: false})
    phone?: string;

    @ApiProperty({required: false})
    photo?: string;

    @ApiProperty({required: false})
    gps?: string;

    @ApiProperty({required: false})
    description?: string;

    @ApiProperty({required: false})
    audio?: string;
}