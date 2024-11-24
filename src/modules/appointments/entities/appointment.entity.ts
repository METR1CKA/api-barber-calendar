import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { FormatDateTime, FORMATS } from '../../../shared/utils/luxon-datetime'
import { Service } from '../../services/entities/service.entity'
import { User } from '../../users/entities/user.entity'
import { Exclude, Transform } from 'class-transformer'
import { DateTime } from 'luxon'

@Entity({
    name: 'appointments',
})
export class Appointment {
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
        nullable: true,
    })
    @Exclude()
    public user_customer_id: number

    @Column({
        nullable: true,
    })
    @Exclude()
    public service_id: number

    @Column({
        type: 'timestamp',
    })
    @Transform(({ value }) =>
        FormatDateTime.serialize({ value, toFormat: FORMATS.FULL }),
    )
    public appointment_date: DateTime

    @Column()
    public status: boolean

    @Column()
    public active: boolean

    @ManyToOne(() => User, (user) => user.appointments_barber)
    @JoinColumn({
        name: 'user_barber_id',
    })
    public user_barber: User

    @ManyToOne(() => User, (user) => user.appointments_customer)
    @JoinColumn({
        name: 'user_customer_id',
    })
    public user_customer: User

    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn({
        name: 'service_id',
    })
    public service: Service

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}
