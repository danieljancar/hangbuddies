export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonArray

export interface JsonObject {
    [key: string]: JsonValue
}

export type JsonArray = JsonValue[]

export class ApiResponseDto<T> {
    statusCode: number
    message: string
    data: T
}
