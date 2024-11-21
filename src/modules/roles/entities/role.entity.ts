import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { User } from '../../users/entities/user.entity'

export enum RoleEnum {
    DEV = 'DEV',
    ADMIN = 'ADMIN',
    BARBER = 'BARBER',
    CLIENT = 'CLIENT',
}

export type ROLES = keyof typeof RoleEnum

@ApiSchema({ name: 'Role' })
@Entity({
    name: 'roles',
})
export class Role {
    @ApiProperty({
        description: 'Id del rol',
        required: false,
        type: 'integer',
        title: 'id',
    })
    @PrimaryColumn({
        generated: 'increment',
    })
    public id: number

    @ApiProperty({
        description: 'Nombre del rol',
        example: 'ADMIN',
        required: true,
        type: 'string',
        title: 'name',
    })
    @Column({
        enum: RoleEnum,
        type: 'enum',
        unique: true,
    })
    public name: ROLES

    @ApiProperty({
        description: 'Descripción del rol',
        example: 'Administrator',
        title: 'description',
        nullable: false,
        required: true,
        type: 'string',
    })
    @Column()
    public description?: string

    @ApiProperty({
        description: 'Estado del rol',
        type: 'boolean',
        title: 'active',
        required: true,
    })
    @Column()
    public active: boolean

    @ApiProperty({
        description: 'Usuarios relacionados con el rol',
        title: 'users',
        required: true,
        type: 'string',
    })
    @OneToMany(() => User, (user) => user.role)
    public users: User[]
}
