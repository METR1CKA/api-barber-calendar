import * as bcrypt from 'bcrypt'

export class Hash {
    private static saltRounds: number = 10

    public static setSalt({ number }: { number: number }): void {
        this.saltRounds = number
    }

    public static async generateSalt(): Promise<string> {
        return await bcrypt.genSalt()
    }

    public static async hashText({
        plainText,
        salt,
    }: {
        plainText: string
        salt?: string | number
    }): Promise<string> {
        return await bcrypt.hash(plainText, salt ?? this.saltRounds)
    }

    public static async compareHash({
        plainText,
        hashText,
    }: {
        plainText: string
        hashText: string
    }): Promise<boolean> {
        return await bcrypt.compare(plainText, hashText)
    }
}
