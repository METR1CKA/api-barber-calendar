import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm'
import { Appointment } from '../../appointments/entities/appointment.entity'
import { ApiJwtToken } from '../../auth/entities/api-jwt-token.entity'
import { Schedule } from '../../schedules/entities/schedule.entity'
import { Role } from '../../roles/entities/role.entity'
import { Exclude } from 'class-transformer'

@Entity({
    name: 'users',
})
export class User {
    @PrimaryColumn({
        generated: 'increment',
    })
    public id: number

    @Column({
        nullable: true,
    })
    @Exclude()
    public role_id: number

    @Column()
    public email: string

    @Exclude()
    @Column()
    public password: string

    @Column()
    public username: string

    @Column()
    public name: string

    @Column()
    public lastname: string

    @Column({
        default: true,
    })
    public active: boolean

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({
        name: 'role_id',
    })
    public role: Role

    @OneToMany(() => ApiJwtToken, (token) => token.user)
    public tokens: ApiJwtToken[]

    @OneToMany(() => Schedule, (shedule) => shedule.user_barber)
    public schedules: Schedule[]

    @OneToMany(() => Appointment, (appointment) => appointment.user_barber)
    public appointments_barber: Appointment[]

    @OneToMany(() => Appointment, (appointment) => appointment.user_customer)
    public appointments_customer: Appointment[]

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}
