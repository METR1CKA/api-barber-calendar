import { registerAs } from '@nestjs/config'

export default registerAs('env', () => ({
    USER_SERVICE_HOST: process.env.USER_SERVICE_HOST ?? 'localhost',
    USER_SERVICE_PORT: process.env.USER_SERVICE_PORT ?? 3001,
    DB_CONNECTION: process.env.DB_CONNECTION ?? 'postgres',
    DB_HOST: process.env.DB_HOST ?? 'localhost',
    DB_PORT: process.env.DB_PORT ?? 5433,
    DB_USER: process.env.DB_USER ?? 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD ?? 'postgres',
    DB_DB_NAME: process.env.DB_DB_NAME ?? 'db_users',
    SYNC_DB: process.env.SYNC_DB ?? true,
}))
