import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
    private saltRounds: number

    constructor() {
        this.saltRounds = 10
    }

    setSalt({ number }: { number: number }): void {
        this.saltRounds = number
    }

    async generateSalt(): Promise<string> {
        return await bcrypt.genSalt()
    }

    async hashText({
        plainText,
        salt,
    }: {
        plainText: string
        salt?: string | number
    }): Promise<string> {
        return await bcrypt.hash(plainText, salt ?? this.saltRounds)
    }

    async compareHash({
        plainText,
        hashText,
    }: {
        plainText: string
        hashText: string
    }): Promise<boolean> {
        return await bcrypt.compare(plainText, hashText)
    }
}
