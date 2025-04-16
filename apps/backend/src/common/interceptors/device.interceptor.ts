import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { DeviceService } from '../../utils/device/device.service'
import {
    DEVICE_ID_HEADER,
    DEVICE_ID_HEADER_UNKNOWN,
} from '../../types/device.constants'
import { LogService } from '../../utils/logger/log.service'
import { LogCategoryType } from '../../utils/logger/types/log.types'

@Injectable()
export class DeviceInterceptor implements NestInterceptor {
    constructor(
        private readonly deviceService: DeviceService,
        private readonly logService: LogService
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest<Request>()
        const deviceId: string =
            request.header(DEVICE_ID_HEADER) || DEVICE_ID_HEADER_UNKNOWN

        if (deviceId) {
            this.deviceService
                .updateLastActive(deviceId)
                .catch(async (err: unknown) => {
                    await this.logService.warn(
                        `Error updating last active for device ${deviceId}`,
                        LogCategoryType.INTERCEPTOR,
                        {
                            deviceId,
                            error: err as string,
                        }
                    )
                })
        }

        return next.handle()
    }
}
