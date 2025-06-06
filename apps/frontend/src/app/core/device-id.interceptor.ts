import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { DeviceIdService } from './device-id.service'

export const deviceIdInterceptor: HttpInterceptorFn = (req, next) => {
    const deviceId = inject(DeviceIdService).id
    const cloned = req.clone({
        headers: req.headers.set('x-device-id', deviceId),
    })
    return next(cloned)
}
