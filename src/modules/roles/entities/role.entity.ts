import { User } from 'src/modules/users/entities/user.entity'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Column, Entity, OneToMany } from 'typeorm'

@ApiSchema({ name: 'Role' })
@Entity({
    name: 'roles',
})
export class Role {
    @ApiProperty({
        description: 'Id del rol',
        required: false,
        nullable: false,
        type: 'integer',
        format: 'int',
        title: 'id',
        example: 1,
    })
    @Column({
        generated: 'increment',
        nullable: false,
        primary: true,
        type: 'int',
    })
    public id: number

    @ApiProperty({
        description: 'Nombre del rol',
        example: 'ADMIN',
        nullable: false,
        required: true,
        type: 'string',
        title: 'name',
    })
    @Column({
        nullable: false,
        type: 'varchar',
        length: 150,
    })
    public name: string

    @ApiProperty({
        description: 'Descripción del rol',
        example: 'Administrator',
        title: 'description',
        nullable: false,
        required: true,
        type: 'string',
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    public description?: string

    @ApiProperty({
        description: 'Estado del rol',
        type: 'boolean',
        title: 'active',
        nullable: false,
        required: true,
    })
    @Column({
        type: 'boolean',
        nullable: false,
        default: true,
    })
    public active: boolean

    @ApiProperty({
        description: 'Usuarios relacionados con el rol',
        title: 'users',
        nullable: false,
        required: true,
        type: 'string',
    })
    @OneToMany(() => User, (user) => user.role)
    public users: User[]
}
