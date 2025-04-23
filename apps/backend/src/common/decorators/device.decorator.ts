import {
    BadRequestException,
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common'
import { Request } from 'express'
import { DEVICE_ID_HEADER } from '../../types/device.constants'

export const DeviceId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        const request = ctx.switchToHttp().getRequest<Request>()
        const deviceId = request.header(DEVICE_ID_HEADER)

        if (!deviceId) {
            throw new BadRequestException(`Device ID is required as a header`)
        }
        return deviceId
    }
)
