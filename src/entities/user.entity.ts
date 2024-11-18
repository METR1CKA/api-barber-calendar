import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Role } from './role.entity'

@ApiSchema({ name: 'User' })
@Entity({
    name: 'users',
})
export class User {
    @ApiProperty({
        description: 'Id del usuario',
        example: 1,
        required: false,
        format: 'int',
        nullable: false,
        type: 'integer',
        title: 'id',
    })
    @Column({
        generated: 'increment',
        nullable: false,
        primary: true,
        type: 'int',
    })
    public id: number

    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@mail.com',
        nullable: false,
        format: 'email',
        type: 'string',
        title: 'email',
        required: true,
    })
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        length: 150,
    })
    public email: string

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password',
        format: 'password',
        title: 'password',
        nullable: false,
        required: true,
        type: 'string',
    })
    @Column({
        type: 'varchar',
        nullable: false,
        length: 150,
    })
    public password: string

    @ApiProperty({
        description: 'Nombre de usuario',
        title: 'username',
        format: 'string',
        example: 'user',
        nullable: false,
        required: true,
        type: 'string',
    })
    @Column({
        type: 'varchar',
        nullable: false,
        length: 150,
    })
    public username: string

    @ApiProperty({
        description: 'Nombre',
        format: 'string',
        example: 'User',
        nullable: false,
        required: true,
        type: 'string',
        title: 'name',
    })
    @Column({
        type: 'varchar',
        nullable: false,
        length: 150,
    })
    public name: string

    @ApiProperty({
        description: 'Apellido',
        title: 'lastname',
        format: 'string',
        example: 'User',
        nullable: false,
        required: true,
        type: 'string',
    })
    @Column({
        type: 'varchar',
        nullable: false,
        length: 150,
    })
    public lastname: string

    @ApiProperty({
        description: 'Estado del usuario',
        format: 'boolean',
        nullable: false,
        type: 'boolean',
        title: 'active',
        required: true,
        example: true,
    })
    @Column({
        type: 'boolean',
        nullable: false,
        default: true,
    })
    public active: boolean

    @Column({
        type: 'int',
        nullable: true,
    })
    public roleId: number

    @ApiProperty({
        description: 'Rol del usuario',
        type: 'integer',
        nullable: false,
        required: true,
        format: 'int',
        example: '1',
    })
    @ManyToOne(() => Role, (role) => role.users, {
        eager: true,
    })
    public role: Role
}
