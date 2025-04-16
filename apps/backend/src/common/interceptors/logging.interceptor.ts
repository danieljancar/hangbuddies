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

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logService: LogService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        const request: Request = context.switchToHttp().getRequest<Request>()

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - now
                this.logService
                    .debug(
                        `${request.method} ${request.url}`,
                        LogCategoryType.INTERCEPTOR,
                        {
                            statusCode: request?.res?.statusCode,
                            responseTime,
                            query: request.query,
                            params: request.params,
                            headers: request.headers,
                        }
                    )
                    .catch((err) => {
                        this.logService
                            .warn(
                                `Error logging request: ${err}`,
                                LogCategoryType.INTERCEPTOR
                            )
                            .then((r) => {
                                console.error('Error logging request:', err, r)
                            })
                    })
            })
        )
    }
}
