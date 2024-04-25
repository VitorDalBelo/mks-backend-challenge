import { ApiProperty } from "@nestjs/swagger";
import { GetUserDto } from "../user-dtos/get-user.dto";

export  class GetAccessTokenDto {
    @ApiProperty({required:true})
    access_token: string;
    @ApiProperty({required:true,type: () => GetUserDto})
    user: GetUserDto
}