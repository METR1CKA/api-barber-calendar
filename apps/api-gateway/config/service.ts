import * as Joi from 'joi'

export const USER_SERVICE = 'USER_SERVICE'
export const TASK_SERVICE = 'TASK_SERVICE'

export const schema = Joi.object({
    HOST: Joi.string().required().default('localhost'),
    PORT: Joi.number().required().default(3000),
    USER_SERVICE_HOST: Joi.string().required().default('localhost'),
    USER_SERVICE_PORT: Joi.number().required().default(3001),
})
