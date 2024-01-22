import { ApiProperty } from '@nestjs/swagger';

export class CreateCinemaDTO {
    @ApiProperty()
    pseudo: string;
}