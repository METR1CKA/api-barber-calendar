import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
    TableIndex,
} from 'typeorm'

export class ApiJwtTokens1732053484347 implements MigrationInterface {
    public tableName = 'api_jwt_tokens'

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

                    // User ID
                    new TableColumn({
                        isNullable: true,
                        name: 'user_id',
                        type: 'int',
                    }),

                    // Token
                    new TableColumn({
                        isNullable: false,
                        type: 'varchar',
                        length: '255',
                        name: 'token',
                    }),

                    // Type
                    new TableColumn({
                        isNullable: false,
                        type: 'varchar',
                        length: '20',
                        name: 'type',
                    }),

                    // Issued At
                    new TableColumn({
                        isNullable: false,
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        name: 'issued_at',
                    }),

                    // Expires At
                    new TableColumn({
                        isNullable: false,
                        type: 'timestamp',
                        name: 'expires_at',
                    }),
                ],
            }),
        )

        // FOREIGN KEY
        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                name: 'FK_API_JWT_TOKENS_USER_ID',
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                columnNames: ['user_id'],
                onDelete: 'CASCADE',
            }),
        )

        // INDEX
        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: 'IDX_API_JWT_TOKENS_USER_ID',
                columnNames: ['user_id'],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }
}
