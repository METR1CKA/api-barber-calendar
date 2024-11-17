import { Column, Entity } from 'typeorm'

@Entity({
    name: 'users',
})
export class User {
    @Column({
        primary: true,
        generated: 'increment',
        type: 'int',
    })
    public id: number

    @Column({
        type: 'varchar',
        length: 100,
    })
    public nombre: string

    @Column({
        type: 'varchar',
        length: 150,
        unique: true,
    })
    public email: string

    @Column({
        default: true,
        type: 'boolean',
    })
    public active: boolean
}
