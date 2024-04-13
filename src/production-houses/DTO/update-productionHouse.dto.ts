import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductionHouseDTO {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    address1?: string;

    @ApiProperty()
    address2?: string;

    @ApiProperty()
    city?: string;

    @ApiProperty()
    postalCode?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    phone?: string;

    @ApiProperty()
    photo?: string;

    @ApiProperty()
    webSite?: string;

    @ApiProperty()
    gps?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    audio?: string;
}