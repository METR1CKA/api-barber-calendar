import { Column, Entity } from 'typeorm'

@Entity({
    name: 'users',
})
export class User {
    @Column({
        primary: true,
        generated: 'increment',
    })
    public id: number

    @Column()
    public nombre: string

    @Column({
        unique: true,
    })
    public email: string

    /* Propiedad active para el caso de uso de desactivar usuarios en lugar de borrarlos */
    /* @Column({
        default: true,
        type: 'boolean',
    })
    public active: boolean */
}
