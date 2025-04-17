import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DeviceService } from './device.service'
import { DeviceController } from './device.controller'
import { Device, DeviceSchema } from './schemas/device.schema'
import { LogModule } from '../../utils/logger/log.module'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Device.name, schema: DeviceSchema },
        ]),

        LogModule,
    ],
    providers: [DeviceService],
    controllers: [DeviceController],
    exports: [DeviceService],
})
export class DeviceModule {}
