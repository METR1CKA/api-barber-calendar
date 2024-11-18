import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
    private saltRounds: number

    constructor() {
        this.saltRounds = 10
    }

    public setSalt({ number }: { number: number }): void {
        this.saltRounds = number
    }

    public async generateSalt(): Promise<string> {
        return await bcrypt.genSalt()
    }

    public async hashText({
        plainText,
        salt,
    }: {
        plainText: string
        salt?: string | number
    }): Promise<string> {
        return await bcrypt.hash(plainText, salt ?? this.saltRounds)
    }

    public async compareHash({
        plainText,
        hashText,
    }: {
        plainText: string
        hashText: string
    }): Promise<boolean> {
        return await bcrypt.compare(plainText, hashText)
    }
}
