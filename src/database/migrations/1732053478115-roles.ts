import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableIndex,
} from 'typeorm'

export class Roles1732053478115 implements MigrationInterface {
    public tableName = 'roles'

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

                    // Name
                    new TableColumn({
                        isNullable: false,
                        type: 'varchar',
                        isUnique: true,
                        length: '150',
                        name: 'name',
                    }),

                    // Description
                    new TableColumn({
                        name: 'description',
                        isNullable: true,
                        type: 'text',
                    }),

                    // Active
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
                name: 'IDX_ROLES_NAME',
                columnNames: ['name'],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }
}
