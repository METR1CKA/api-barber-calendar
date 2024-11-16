import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException,
} from '@nestjs/common'
import { Types } from 'mongoose'

@Injectable()
export class ParseObjectIdPipePipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException('Invalid ObjectId')
        }

        return value
    }
}
