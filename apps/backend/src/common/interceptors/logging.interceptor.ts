import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request } from 'express'
import { LogService } from '../../utils/logger/log.service'
import { LogCategoryType } from '../../utils/logger/types/log.types'
import {
    DEVICE_ID_HEADER,
    DEVICE_ID_HEADER_UNKNOWN,
} from '../../types/device.constants'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logService: LogService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        const request: Request = context.switchToHttp().getRequest<Request>()
        const deviceId =
            request.header(DEVICE_ID_HEADER) || DEVICE_ID_HEADER_UNKNOWN

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now
                this.logService
                    .debug(
                        `${request.method} ${request.url}`,
                        LogCategoryType.INTERCEPTOR,
                        {
                            deviceId,
                            responseTime,
                            method: request.method,
                            url: request.url,
                            query: request.query,
                            params: request.params,
                        }
                    )
                    .catch(async (err) => {
                        await this.logService.warn(
                            `Error logging request: ${err}`,
                            LogCategoryType.INTERCEPTOR
                        )
                    })
            })
        )
    }
}
