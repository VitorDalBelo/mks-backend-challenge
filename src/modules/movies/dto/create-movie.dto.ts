import { ApiProperty } from "@nestjs/swagger";
import handleDtoError from "src/helpers/handleDtoError";
import * as Yup from 'yup';

export class CreateMovieDto {
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
    private static schema = Yup.object().shape({
        title: Yup.string()
        .required('O campo title é obrigatório')
        .max(255, 'O campo title deve ter no máximo 225 caracteres'),
        director: Yup.string()
        .required('O campo director é obrigatório')
        .max(255, 'O campo director deve ter no máximo 225 caracteres'),
        release_date: Yup.string()
        .required('O campo release_date é obrigatório')
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'O campo release_date deve estar no formato YYYY-MM-DD'),
        genre: Yup.string()
        .required('O campo genre é obrigatório')
        .max(255, 'O campo genre deve ter no máximo 225 caracteres'),
        synopsis: Yup.string()
        .required('O campo synopsis é obrigatório'),
    });

    public static async validate(value: any,options?: Yup.ValidateOptions<Yup.AnyObject>) : Promise<Partial<CreateMovieDto>>{
        return CreateMovieDto.schema.validate(value,options)
        .catch(handleDtoError)
    }
}
