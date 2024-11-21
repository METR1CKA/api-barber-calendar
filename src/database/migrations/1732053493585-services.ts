import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableIndex,
} from 'typeorm'

export class Services1732053493585 implements MigrationInterface {
    public tableName = 'services'

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

                    // NAME
                    new TableColumn({
                        isNullable: false,
                        type: 'varchar',
                        length: '150',
                        name: 'name',
                    }),

                    // DESCRIPTION
                    new TableColumn({
                        name: 'description',
                        isNullable: true,
                        type: 'text',
                    }),

                    // PRICE
                    new TableColumn({
                        isNullable: false,
                        type: 'decimal',
                        precision: 10,
                        name: 'price',
                        scale: 2,
                    }),

                    // ACTIVE
                    new TableColumn({
                        isNullable: false,
                        type: 'boolean',
                        name: 'active',
                        default: true,
                    }),
                ],
            }),
        )

        // INDEX
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: 'IDX_SERVICES_NAME',
                columnNames: ['name'],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }
}
