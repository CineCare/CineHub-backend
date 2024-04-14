import { ApiProperty } from '@nestjs/swagger';

export class AccessibilityEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  audio?: string;

  @ApiProperty()
  picto: string;
}
