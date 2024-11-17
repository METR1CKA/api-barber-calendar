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
        unique: true,
        type: 'varchar',
        length: 150,
    })
    public email: string

    @Column({
        type: 'varchar',
        length: 150,
    })
    public username: string

    @Column({
        type: 'varchar',
        length: 150,
    })
    public name: string

    @Column({
        type: 'varchar',
        length: 150,
    })
    public lastname: string

    @Column({
        default: true,
        type: 'boolean',
    })
    public active: boolean
}
