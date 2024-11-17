import { registerAs } from '@nestjs/config'
import * as Joi from 'joi'
import 'dotenv/config'

type ENV = {
    HOST: string
    PORT: number
}

const envSchema = Joi.object({
    HOST: Joi.string().required().default('localhost'),
    PORT: Joi.number()
        .positive()
        .port()
        .min(0)
        .max(65535)
        .required()
        .default(3000),
}).unknown(true)

const { error, value } = envSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export default registerAs('env', () => value as ENV)
