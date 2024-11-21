import { registerAs } from '@nestjs/config'
import * as Joi from 'joi'
import 'dotenv/config'

type ENV = {
    HOST: string
    PORT: number
    API_JWT_SECRET: string
    DB_CONNECTION: any
    DB_HOST: string
    DB_PORT: number
    DB_USER: string
    DB_PASSWORD: string
    DB_DB_NAME: string
}

const envSchema = Joi.object({
    HOST: Joi.string().required(),
    PORT: Joi.number().positive().port().min(0).max(65535).required(),
    API_JWT_SECRET: Joi.string().required(),
    DB_CONNECTION: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DB_NAME: Joi.string().required(),
}).unknown(true)

const { error, value } = envSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export const Env = value as ENV

export default registerAs('env', () => value as ENV)
