import { faker } from '@faker-js/faker'
import { DeviceService } from '../../../src/modules/device/device.service'
import { DeviceDocument } from '../../../src/modules/device/schemas/device.schema'

export async function createDevices(
    deviceService: DeviceService,
    amount: number = 10
): Promise<DeviceDocument[]> {
    return Promise.all(
        Array.from({ length: amount }).map(() =>
            deviceService.findOrCreate(faker.phone.imei(), {
                userAgent: faker.internet.userAgent(),
                deviceType: faker.helpers.arrayElement([1, 2, 3, 4]),
            })
        )
    )
}
