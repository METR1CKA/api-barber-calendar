export type ApiResponseType<T> = {
    status: number
    message: string
    data: T
}
