import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
    TableIndex,
} from 'typeorm'

export class Users1732053481179 implements MigrationInterface {
    public tableName = 'users'

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

                    // ROLE ID
                    new TableColumn({
                        isNullable: true,
                        name: 'role_id',
                        type: 'int',
                    }),

                    // EMAIL
                    new TableColumn({
                        isNullable: false,
                        type: 'varchar',
                        isUnique: true,
                        length: '150',
                        name: 'email',
                    }),

                    // PASSWORD
                    new TableColumn({
                        isNullable: false,
                        name: 'password',
                        type: 'varchar',
                        length: '150',
                    }),

                    // USERNAME
                    new TableColumn({
                        isNullable: false,
                        name: 'username',
                        type: 'varchar',
                        length: '150',
                    }),

                    // NAME
                    new TableColumn({
                        isNullable: false,
                        type: 'varchar',
                        length: '150',
                        name: 'name',
                    }),

                    // LASTNAME
                    new TableColumn({
                        isNullable: false,
                        name: 'lastname',
                        type: 'varchar',
                        length: '150',
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

        // FOREIGN KEY
        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                name: 'FK_USERS_ROLES',
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
            }),
        )

        // INDEX
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: 'IDX_USERS_EMAIL',
                columnNames: ['email'],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }
}
