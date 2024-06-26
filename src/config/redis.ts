import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import 'dotenv/config';

@Injectable()
export class RedisService extends Redis{
    constructor() {
        super(Number(process.env.REDIS_PORT),String(process.env.REDIS_HOST));
        super.on('error', (err) => {
            console. log('Error on Redis');
            console.log(err);
            process.exit(1);
        });

        super.on('connect', () => {
            console. log ('Redis connected!');
        }) ;
    }
}


