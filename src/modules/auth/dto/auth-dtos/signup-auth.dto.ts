import { ApiProperty } from "@nestjs/swagger";
import handleDtoError from "../../../../helpers/handleDtoError";
import * as Yup from 'yup';

export class SignupAuthDto {
    @ApiProperty({required:true})
    name: string
    @ApiProperty({required:true})
    email: string
    @ApiProperty({required:true})
    password: string

    private static schema = Yup.object().shape({
        name: Yup.string()
        .required('O campo name é obrigatório')
        .max(255, 'O campo name deve ter no máximo 255 caracteres'),
        email: Yup.string()
        .required('O campo email é obrigatório')
        .email('Email inválido.')
        .max(255, 'O campo email deve ter no máximo 255 caracteres'),
        password: Yup.string()
        .required('O campo password é obrigatório')
        .max(255, 'O campo password deve ter no máximo 255 caracteres'),
    });

    public static async validate(value: any,options?: Yup.ValidateOptions<Yup.AnyObject>) : Promise<Partial<SignupAuthDto>>{
        return SignupAuthDto.schema.validate(value,options)
        .catch(handleDtoError)
    }
}
