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

    @Column()
    public price: number

    @Column()
    public active: boolean
}
