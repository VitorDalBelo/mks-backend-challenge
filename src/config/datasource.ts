import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory{
    constructor(private configService: ConfigService){}
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        console.log({            type:"postgres",
        host:process.env.DB_HOST,
        port:Number(process.env.DB_PORT),
        username:process.env.DB_USER,
        password:String(process.env.DB_PASSWORD),
        database:process.env.DB_NAME,
        entities:[__dirname + '/../**/*.entity{.js,ts}'],
        logging:false,
        synchronize:process.env.DEVELOPMENT === 'true',
        schema:"public",
        verboseRetryLog:true,})
        return{
            type:"postgres",
            host:process.env.DB_HOST,
            port:Number(process.env.DB_PORT),
            username:process.env.DB_USER,
            password:String(process.env.DB_PASSWORD),
            database:process.env.DB_NAME,
            entities:[__dirname + '/../**/*.entity{.js,ts}'],
            logging:false,
            synchronize:process.env.DEVELOPMENT === 'true',
            schema:"public",
            verboseRetryLog:true,
            // ssl: process.env.DEVELOPMENT === 'true'? undefined : {
            //     rejectUnauthorized: false, // Isso desativa a verificação de certificado SSL. Use com cautela!
            // }

       }
    }

}