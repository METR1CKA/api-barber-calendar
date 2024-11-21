import { DataSource, DataSourceOptions } from 'typeorm'
import { Env } from './env.config'

export const dataSourceOptions: DataSourceOptions = {
    type: Env.DB_CONNECTION as any,
    host: Env.DB_HOST,
    port: Number(Env.DB_PORT),
    password: Env.DB_PASSWORD,
    database: Env.DB_DB_NAME,
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    username: Env.DB_USER,
    migrationsTableName: 'typeorm_migrations',
    entities: ['dist/modules/**/*.entity{.ts,.js}'],
    migrationsRun: true,
    synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
