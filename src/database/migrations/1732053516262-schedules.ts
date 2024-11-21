import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
    TableIndex,
} from 'typeorm'

export class Schedules1732053516262 implements MigrationInterface {
    public tableName = 'schedules'

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

                    // START TIME
                    new TableColumn({
                        name: 'start_time',
                        isNullable: false,
                        type: 'timestamp',
                    }),

                    // END TIME
                    new TableColumn({
                        isNullable: false,
                        type: 'timestamp',
                        name: 'end_time',
                    }),

                    // START REST TIME
                    new TableColumn({
                        name: 'start_rest_time',
                        isNullable: false,
                        type: 'timestamp',
                    }),

                    // END REST TIME
                    new TableColumn({
                        name: 'end_rest_time',
                        isNullable: false,
                        type: 'timestamp',
                    }),

                    // DAY
                    new TableColumn({
                        isNullable: false,
                        name: 'day',
                        type: 'int',
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

        // INDEX USER BARBER ID
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                columnNames: ['user_barber_id'],
                name: 'IDX_USER_BARBER_ID',
            }),
        )

        // INDEX DAY
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                columnNames: ['day'],
                name: 'IDX_DAY',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }
}
