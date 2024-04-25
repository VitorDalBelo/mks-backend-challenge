import { ApiProperty } from "@nestjs/swagger";

export  class GetUserDto {
    @ApiProperty({required:true})
    user_id: number;
    @ApiProperty({required:true})
    name: string;
    @ApiProperty({required:true})
    email: string;
}