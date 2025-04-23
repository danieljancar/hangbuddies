import { Device } from '../../../src/modules/device/schemas/device.schema'
import { DeviceService } from '../../../src/modules/device/device.service'
import { faker } from '@faker-js/faker'

/*
 * Creates a number of devices using the DeviceService.
 * @deviceService - The DeviceService instance to use for creating devices.
 * @amount - The number of devices to create. Default is 10.
 * @return A promise that resolves to an array of created devices.
 */
export async function createDevices(
    deviceService: DeviceService,
    amount: number = 10
): Promise<Device[]> {
    return Promise.all(
        Array.from({ length: amount }).map(() =>
            deviceService.findOrCreate(faker.phone.imei(), {
                userAgent: faker.internet.userAgent(),
                deviceType: faker.helpers.arrayElement([1, 2, 3, 4]),
            })
        )
    )
}
