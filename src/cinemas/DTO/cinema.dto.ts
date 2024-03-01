import { ApiProperty } from "@nestjs/swagger";

export class CinemaDTO {
    @ApiProperty()
    id: number

    @ApiProperty()
    name: string

    @ApiProperty()
    address1: string

    @ApiProperty()
    address2: string | null

    @ApiProperty()
    city: string

    @ApiProperty()
    postalCode: string

    @ApiProperty()
    email: string | null

    @ApiProperty()
    phone: string | null

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date
  }