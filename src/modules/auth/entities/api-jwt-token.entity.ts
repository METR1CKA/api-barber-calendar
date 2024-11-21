import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { DateTime } from 'luxon'

@Entity({
    name: 'api_jwt_tokens',
})
export class ApiJwtToken {
    @PrimaryColumn()
    public id: number

    @Column()
    public userId: number

    @Column()
    public token: string

    @Column()
    public type: string

    @Column()
    public issuedAt: DateTime

    @Column()
    public expiresAt: DateTime

    @ManyToOne(() => User, (user) => user.tokens, {
        eager: true,
    })
    public user: User
}
