import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { getConnectionToken } from '@nestjs/mongoose'
import { Connection } from 'mongoose'
import { AppModule } from '../../src/app.module'
import { DeviceService } from '../../src/modules/device/device.service'
import { SurveyService } from '../../src/modules/survey/survey.service'
import { BlogService } from '../../src/modules/blog/blog.service'
import { createDevices } from './factories/device.factory'
import { createSurveys } from './factories/survey.factory'
import { createResponses } from './factories/response.factory'
import { createBlog } from './factories/blog.factory'
import { faker } from '@faker-js/faker'

const DEVICE_COUNT = faker.number.int({ min: 30, max: 50 })
const CREATORS_COUNT = faker.number.int({ min: 2, max: 5 })

async function seed(): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule)
    const config = app.get(ConfigService)
    const uri = config.get<string>('MONGO_URI')
    const db = config.get<string>('MONGO_APP_NAME')
    Logger.log(`Connecting to ${uri}${db}`, 'SeedScript')

    const conn = app.get<Connection>(getConnectionToken())
    await conn.dropDatabase()
    Logger.warn('Database dropped', 'SeedScript')

    const deviceService = app.get(DeviceService)
    const surveyService = app.get(SurveyService)

    const devices = await createDevices(deviceService, DEVICE_COUNT)
    Logger.debug(`${devices.length} devices created`, 'SeedScript')

    const creators = devices.slice(0, CREATORS_COUNT)
    const surveysNested = await Promise.all(
        creators.map((creator) => {
            const count = faker.number.int({ min: 2, max: 5 })
            return createSurveys(surveyService, count, creator.deviceId)
        })
    )

    const surveys = surveysNested.flat()
    Logger.debug(`${surveys.length} surveys created`, 'SeedScript')

    const responses = await createResponses(surveyService, surveys, devices)
    Logger.debug(`${responses.length} responses created`, 'SeedScript')

    const blogService = app.get(BlogService)
    const blogs = await createBlog(blogService)
    Logger.debug(`${blogs.length} blog posts created`, 'SeedScript')

    await app.close()
    Logger.log('Seeding completed successfully', 'SeedScript')
    process.exit(0)
}

seed().catch((err) => {
    Logger.error('Seeding failed', err, 'SeedScript')
    process.exit(1)
})
