import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { LogService } from '../../utils/logger/log.service'
import { LogCategoryType } from '../../utils/logger/types/log.types'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logService: LogService) {}

    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()

        let status = HttpStatus.INTERNAL_SERVER_ERROR
        let message: string | object = 'Internal server error'

        if (exception instanceof HttpException) {
            status = exception.getStatus()
            message = exception.getResponse()
        } else if (exception instanceof Error) {
            message = exception.message
        }

        await this.logService.warn(
            `${typeof message === 'object' ? JSON.stringify(message) : message}`,
            LogCategoryType.EXCEPTION,
            {
                path: request.url,
                method: request.method,
                body: request.body ? JSON.stringify(request.body) : null,
                query: request.query ? JSON.stringify(request.query) : null,
                params: request.params ? JSON.stringify(request.params) : null,
                headers: request.headers
                    ? JSON.stringify(request.headers)
                    : null,
                status,
                exception: typeof message === 'object' ? message : null,
                stack: exception instanceof Error ? exception.stack : null,
            }
        )

        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        })
    }
}
