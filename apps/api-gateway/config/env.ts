import { registerAs } from '@nestjs/config'

export default registerAs('env', () => ({
    HOST: process.env.HOST ?? 'localhost',
    PORT: process.env.PORT ?? 3000,
    USER_SERVICE_HOST: process.env.USER_SERVICE_HOST ?? 'localhost',
    USER_SERVICE_PORT: process.env.USER_SERVICE_PORT ?? 3001,
    TASK_SERVICE_HOST: process.env.TASK_SERVICE_HOST ?? 'localhost',
    TASK_SERVICE_PORT: process.env.TASK_SERVICE_PORT ?? 3002,
}))
