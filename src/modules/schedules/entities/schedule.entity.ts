import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { FormatDateTime, FORMATS } from 'src/shared/utils/luxon-datetime'
import { User } from '../../users/entities/user.entity'
import { Exclude, Transform } from 'class-transformer'
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
    @Transform(({ value }) =>
        FormatDateTime.serialize({ value, toFormat: FORMATS.TIME }),
    )
    public start_time: DateTime

    @Column({
        type: 'timestamp',
    })
    @Transform(({ value }) =>
        FormatDateTime.serialize({ value, toFormat: FORMATS.TIME }),
    )
    public end_time: DateTime

    @Column({
        type: 'timestamp',
    })
    @Transform(({ value }) =>
        FormatDateTime.serialize({ value, toFormat: FORMATS.TIME }),
    )
    public start_rest_time: DateTime

    @Column({
        type: 'timestamp',
    })
    @Transform(({ value }) =>
        FormatDateTime.serialize({ value, toFormat: FORMATS.TIME }),
    )
    public end_rest_time: DateTime

    @Column()
    public day: number

    @Column()
    public active: boolean

    @ManyToOne(() => User, (user) => user.schedules)
    @JoinColumn({
        name: 'user_barber_id',
    })
    public user_barber: User

    constructor(partial: Partial<Schedule>) {
        Object.assign(this, partial)
    }
}
