import { ApiProperty } from "@nestjs/swagger";

export class MineUserEntity {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    pseudo: string;

    @ApiProperty()
    email: string;
}