import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessibilityDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  audio: string;

  @ApiProperty()
  picto: string;
}
