import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from 'src/modules/users/entities/user.entity'
import { Exclude } from 'class-transformer'
import { DateTime } from 'luxon'

@Entity({
    name: 'schedules',
})
export class Schedule {
    @PrimaryColumn({
        generated: 'increment',
    })
    public id: number

    @Column({
        nullable: true,
    })
    @Exclude()
    public user_barber_id: number

    @Column({
        type: 'timestamp',
    })
    public start_time: DateTime

    @Column({
        type: 'timestamp',
    })
    public end_time: DateTime

    @Column({
        type: 'timestamp',
    })
    public start_rest_time: DateTime

    @Column({
        type: 'timestamp',
    })
    public end_rest_time: DateTime

    @Column()
    public day: number

    @ManyToOne(() => User, (user) => user.schedules, {
        eager: true,
    })
    @JoinColumn({
        name: 'user_barber_id',
    })
    public user: User

    constructor(partial: Partial<Schedule>) {
        Object.assign(this, partial)
    }
}
