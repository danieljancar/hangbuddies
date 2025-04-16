import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { DeviceService } from '../../utils/device/device.service'
import { DEVICE_ID_HEADER } from '../../types/device.constants'

@Injectable()
export class DeviceInterceptor implements NestInterceptor {
    constructor(private readonly deviceService: DeviceService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest<Request>()
        const deviceId: string | undefined = request.header(DEVICE_ID_HEADER)

        if (deviceId) {
            this.deviceService
                .updateLastActive(deviceId)
                .catch((error: unknown) => {
                    console.error('Error updating device lastActive:', error)
                })
        }

        return next.handle()
    }
}
