import { User } from 'src/modules/users/entities/user.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { DateTime } from 'luxon'

@Entity({
    name: 'api_jwt_tokens',
})
export class ApiJwtToken {
    @Column({
        generated: 'increment',
        nullable: false,
        primary: true,
        type: 'int',
    })
    public id: number

    @Column({
        nullable: false,
        type: 'int',
    })
    public userId: number

    @Column({
        nullable: false,
        type: 'varchar',
        length: 255,
    })
    public token: string

    @Column({
        nullable: false,
        type: 'varchar',
        length: 20,
    })
    public type: string

    @Column({
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public issuedAt: DateTime

    @Column({
        nullable: false,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public expiresAt: DateTime

    @ManyToOne(() => User, (user) => user.tokens, {
        eager: true,
    })
    public user: User
}
