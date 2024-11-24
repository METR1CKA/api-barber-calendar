import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
    TableIndex,
} from 'typeorm'

export class Appoiments1732053510984 implements MigrationInterface {
    public tableName = 'appointments'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    // ID
                    new TableColumn({
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isPrimary: true,
                        type: 'int',
                        name: 'id',
                    }),

                    // USER BARBER ID
                    new TableColumn({
                        name: 'user_barber_id',
                        isNullable: true,
                        type: 'int',
                    }),

                    // USER CUSTOMER ID
                    new TableColumn({
                        name: 'user_customer_id',
                        isNullable: true,
                        type: 'int',
                    }),

                    // SERVICE ID
                    new TableColumn({
                        name: 'service_id',
                        isNullable: true,
                        type: 'int',
                    }),

                    // APPOINTMENT DATE
                    new TableColumn({
                        name: 'appointment_date',
                        isNullable: false,
                        type: 'timestamp',
                    }),

                    // STATUS
                    new TableColumn({
                        isNullable: false,
                        type: 'boolean',
                        name: 'status',
                    }),

                    // ACTIVE
                    new TableColumn({
                        isNullable: false,
                        name: 'active',
                        type: 'boolean',
                        default: true,
                    }),
                ],
            }),
        )

        // FOREIGN KEY USER BARBER ID
        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ['user_barber_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                name: 'FK_USER_BARBER_ID',
                onDelete: 'CASCADE',
            }),
        )

        // FOREIGN KEY USER CUSTOMER ID
        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ['user_customer_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                name: 'FK_USER_CUSTOMER_ID',
                onDelete: 'CASCADE',
            }),
        )

        // FOREIGN KEY SERVICE ID
        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                referencedTableName: 'services',
                referencedColumnNames: ['id'],
                columnNames: ['service_id'],
                name: 'FK_SERVICE_ID',
                onDelete: 'CASCADE',
            }),
        )

        // INDEX USER BARBER ID
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                columnNames: ['user_barber_id'],
                name: 'IDX_APPOINTMENTS_USER_BARBER_ID',
            }),
        )

        // INDEX USER CUSTOMER ID
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                columnNames: ['user_customer_id'],
                name: 'IDX_USER_CUSTOMER_ID',
            }),
        )

        // INDEX SERVICE ID
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                columnNames: ['service_id'],
                name: 'IDX_SERVICE_ID',
            }),
        )

        // INDEX APPOINTMENT DATE
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                columnNames: ['appointment_date'],
                name: 'IDX_APPOINTMENT_DATE',
            }),
        )

        // INDEX STATUS
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                columnNames: ['status'],
                name: 'IDX_STATUS',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }
}
