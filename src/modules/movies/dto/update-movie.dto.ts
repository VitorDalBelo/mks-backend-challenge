import { ApiPropertyOptional } from "@nestjs/swagger";
import handleDtoError from "src/helpers/handleDtoError";
import * as Yup from 'yup';


export class UpdateMovieDto {
    @ApiPropertyOptional()
    title?: string
    @ApiPropertyOptional()
    director?: string
    @ApiPropertyOptional({type:"string",format: 'date'})
    release_date?: string
    @ApiPropertyOptional()
    genre?: string;
    @ApiPropertyOptional()
    synopsis?: string;
    private static schema = Yup.object().shape({
        title: Yup.string()
        .max(255, 'O campo title deve ter no máximo 255 caracteres'),
        director: Yup.string()
        .max(255, 'O campo director deve ter no máximo 255 caracteres'),
        release_date: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'O campo release_date deve estar no formato YYYY-MM-DD'),
        genre: Yup.string()
        .max(255, 'O campo genre deve ter no máximo 255 caracteres'),
    });

    public static async validate(value: any,options?: Yup.ValidateOptions<Yup.AnyObject>) : Promise<Partial<UpdateMovieDto>>{
        return UpdateMovieDto.schema.validate(value,options)
        .catch(handleDtoError)
    }
}
