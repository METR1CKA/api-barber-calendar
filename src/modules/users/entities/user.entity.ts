import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm'
import { ApiJwtToken } from '../../auth/entities/api-jwt-token.entity'
import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Role } from '../../roles/entities/role.entity'
import { Exclude } from 'class-transformer'

@ApiSchema({ name: 'User' })
@Entity({
    name: 'users',
})
export class User {
    @ApiProperty({
        description: 'Id del usuario',
        required: false,
        type: 'integer',
        title: 'id',
    })
    @PrimaryColumn({
        generated: 'increment',
    })
    public id: number

    @ApiProperty({
        description: 'Id del rol del usuario',
        required: true,
        type: 'integer',
        title: 'roleId',
    })
    @Column({
        nullable: true,
    })
    @Exclude()
    public role_id: number

    @ApiProperty({
        description: 'Email del usuario',
        example: 'user@mail.com',
        type: 'string',
        title: 'email',
        required: true,
    })
    @Column()
    public email: string

    @ApiProperty({
        description: 'Contraseña del usuario',
        title: 'password',
        required: true,
        type: 'string',
    })
    @Exclude()
    @Column()
    public password: string

    @ApiProperty({
        description: 'Nombre de usuario',
        title: 'username',
        example: 'user',
        required: true,
        type: 'string',
    })
    @Column()
    public username: string

    @ApiProperty({
        description: 'Nombre',
        example: 'User',
        required: true,
        type: 'string',
        title: 'name',
    })
    @Column()
    public name: string

    @ApiProperty({
        description: 'Apellido',
        title: 'lastname',
        example: 'User',
        required: true,
        type: 'string',
    })
    @Column()
    public lastname: string

    @ApiProperty({
        description: 'Estado del usuario',
        type: 'boolean',
        title: 'active',
        required: true,
    })
    @Column({
        default: true,
    })
    public active: boolean

    @ApiProperty({
        description: 'Rol del usuario',
        type: 'integer',
        required: true,
        format: 'int',
    })
    @ManyToOne(() => Role, (role) => role.users, {
        eager: true,
    })
    @JoinColumn({
        name: 'role_id',
    })
    public role: Role

    @OneToMany(() => ApiJwtToken, (token) => token.user)
    public tokens: ApiJwtToken[]

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}
