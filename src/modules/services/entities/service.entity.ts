import { Transform } from 'class-transformer'
import { Column, Entity, PrimaryColumn } from 'typeorm'

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

    constructor(partial: Partial<Service>) {
        Object.assign(this, partial)
    }
}
