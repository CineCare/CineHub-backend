import { ApiProperty } from '@nestjs/swagger';

export class CreateCinemaDTO {
    @ApiProperty()
    name: string;
}