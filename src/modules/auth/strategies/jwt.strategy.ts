import { Injectable ,ExecutionContext } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Reflector } from '@nestjs/core';
import "dotenv/config"

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private reflector: Reflector){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.JWT_SECRET,
            logging: true,
        })
    }
    async validate(payload: any,context: ExecutionContext){

        return payload;
    }
}