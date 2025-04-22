import { NestFactory } from '@nestjs/core'
import { Connection } from 'mongoose'
import { faker } from '@faker-js/faker'
import { AppModule } from '../../src/app.module'
import * as process from 'node:process'
import { DeviceService } from '../../src/modules/device/device.service'
import { SurveyService } from '../../src/modules/survey/survey.service'

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule)
    const conn = app.get<Connection>(process.env.MONGO_URI || '')
    await conn.dropDatabase()

    const deviceService = app.get(DeviceService)
    const surveyService = app.get(SurveyService)

    const devices = await Promise.all(
        Array.from({ length: 10 }).map(async () => {
            await deviceService.findOrCreate(faker.phone.imei(), {
                userAgent: faker.internet.userAgent(),
                deviceType: faker.helpers.arrayElement([1, 2, 3, 4]),
            })
        })
    )
}

bootstrap()
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })
    .finally(() => {
        process.exit(0)
    })
