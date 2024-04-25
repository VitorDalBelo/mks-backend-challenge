import { ApiProperty } from "@nestjs/swagger";
import handleDtoError from "src/helpers/handleDtoError";
import * as Yup from 'yup';

export class GetMovieDto {
    @ApiProperty({required:true})
    id: number
    @ApiProperty({required:true})
    title: string
    @ApiProperty({required:true})
    director: string
    @ApiProperty({required:true, type:"string",format: 'date'})
    release_date: string
    @ApiProperty({required:true})
    genre: string;
    @ApiProperty({required:true})
    synopsis: string;
    @ApiProperty({required:true,type:"string",format:"date"})
    public created_at: Date;
    @ApiProperty({required:true,type:"string",format:"date"})
    public updated_at: Date;

}
