import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'

export enum RoleEnum {
    DEV = 'DEV',
    ADMIN = 'ADMIN',
    BARBER = 'BARBER',
    CLIENT = 'CLIENT',
}

export type ROLES = keyof typeof RoleEnum

@Entity({
    name: 'roles',
})
export class Role {
    @PrimaryColumn({
        generated: 'increment',
    })
    public id: number

    @Column({
        unique: true,
    })
    public name: string

    @Column()
    public description?: string

    @Column()
    public active: boolean

    @OneToMany(() => User, (user) => user.role)
    public users: User[]
}
