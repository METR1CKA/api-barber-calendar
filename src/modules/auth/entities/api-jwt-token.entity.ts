import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { DateTime } from 'luxon'

@Entity({
    name: 'api_jwt_tokens',
})
export class ApiJwtToken {
    @PrimaryColumn()
    public id: number

    @Column({
        nullable: true,
    })
    public user_id: number

    @Column()
    public token: string

    @Column()
    public type: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public issued_at: DateTime

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public expires_at: Date

    @ManyToOne(() => User, (user) => user.tokens, {
        eager: true,
    })
    @JoinColumn({
        name: 'user_id',
    })
    public user: User
}
