import { Appointment } from '../../appointments/entities/appointment.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Transform } from 'class-transformer'

@Entity({
    name: 'services',
})
export class Service {
    @PrimaryColumn({
        generated: 'increment',
    })
    public id: number

    @Column()
    public name: string

    @Column({
        nullable: true,
    })
    public description?: string

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    @Transform(({ value }) => parseFloat(value))
    public price: number

    @Column()
    public active: boolean

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    public appointments: Appointment[]

    constructor(partial: Partial<Service>) {
        Object.assign(this, partial)
    }
}
