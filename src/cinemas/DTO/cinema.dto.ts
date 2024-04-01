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
    photo: string | null

    @ApiProperty()
    gps: string | null

    @ApiProperty()
    description: string | null

    @ApiProperty()
    audio: string | null

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date

    @ApiProperty()
    distance?: number
  }