import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

@ApiSchema({ name: 'User' })
@Entity({
    name: 'users',
})
export class User {
    @ApiProperty({
        description: 'The id of the User',
        example: 1,
        required: false,
        format: 'int',
        nullable: false,
        type: 'integer',
        title: 'id',
    })
    @Column({
        primary: true,
        generated: 'increment',
        type: 'int',
    })
    public id: number

    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@mail.com',
        required: true,
        format: 'email',
        nullable: false,
        type: 'string',
        title: 'email',
    })
    @Column({
        unique: true,
        type: 'varchar',
        length: 150,
    })
    public email: string

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password',
        required: true,
        format: 'password',
        nullable: false,
        type: 'string',
        title: 'password',
    })
    @Column({
        type: 'varchar',
        length: 150,
    })
    public password: string

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'user',
        required: true,
        format: 'string',
        nullable: false,
        type: 'string',
        title: 'username',
    })
    @Column({
        type: 'varchar',
        length: 150,
    })
    public username: string

    @ApiProperty({
        description: 'Nombre',
        example: 'User',
        required: true,
        format: 'string',
        nullable: false,
        type: 'string',
        title: 'name',
    })
    @Column({
        type: 'varchar',
        length: 150,
    })
    public name: string

    @ApiProperty({
        description: 'Apellido',
        example: 'User',
        required: true,
        format: 'string',
        nullable: false,
        type: 'string',
        title: 'lastname',
    })
    @Column({
        type: 'varchar',
        length: 150,
    })
    public lastname: string

    @ApiProperty({
        description: 'Estado del usuario',
        example: true,
        required: true,
        format: 'boolean',
        nullable: false,
        type: 'boolean',
        title: 'active',
    })
    @Column({
        default: true,
        type: 'boolean',
    })
    public active: boolean
}
