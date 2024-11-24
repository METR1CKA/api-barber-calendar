import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    public index() {
        return {
            status: 'OK',
            message: 'Bienvenido a la API Barbershop V1',
            data: null,
        }
    }
}
