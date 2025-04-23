import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { AppModule } from '../../src/app.module'
import { DeviceService } from '../../src/modules/device/device.service'
import { SurveyService } from '../../src/modules/survey/survey.service'
import { createDevices } from './factories/device.factory'
import { createSurveys } from './factories/survey.factory'
import { createResponses } from './factories/response.factory'

const DEVICE_COUNT = Math.floor(Math.random() * 30) + 15
const CREATORS_COUNT = Math.floor(Math.random() * 5) + 2

async function seed(): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule)
    const config = app.get(ConfigService)
    const uri = config.get<string>('MONGO_URI')
    const db = config.get<string>('MONGO_APP_NAME')
    Logger.debug(`Connecting to ${uri}${db}`, 'Seed')

    const conn = app.get<Connection>(getConnectionToken())
    await conn.dropDatabase()
    Logger.debug('Database dropped', 'Seed')

    const deviceService = app.get(DeviceService)
    const surveyService = app.get(SurveyService)

    const devices = await createDevices(deviceService, DEVICE_COUNT)
    Logger.debug(`${devices.length} devices created`, 'Seed')

    const creators = devices.slice(0, CREATORS_COUNT)
    const surveys: Awaited<ReturnType<typeof createSurveys>> = []

    for (const creator of creators) {
        const count = Math.floor(Math.random() * 5) + 2
        const batch = await createSurveys(
            surveyService,
            count,
            creator.deviceId
        )
        surveys.push(...batch)
    }
    Logger.debug(`${surveys.length} surveys created`, 'Seed')

    const responses = await createResponses(surveyService, surveys, devices)
    Logger.debug(`${responses.length} responses created`, 'Seed')

    Logger.debug('Seeding complete', 'Seed')
    await app.close()
    process.exit(0)
}

seed().catch((err) => {
    Logger.error('Seeding failed', err, 'Seed')
    process.exit(1)
})
