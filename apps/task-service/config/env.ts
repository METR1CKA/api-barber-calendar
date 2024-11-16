import { registerAs } from '@nestjs/config'

export default registerAs('env', () => ({
    TASK_SERVICE_HOST: process.env.TASK_SERVICE_HOST ?? 'localhost',
    TASK_SERVICE_PORT: process.env.TASK_SERVICE_PORT ?? 3002,
    MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost:27017/db_tasks',
}))
