import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { LogService } from './utils/logger/log.service'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { DeviceInterceptor } from './common/interceptors/device.interceptor'
import { DeviceService } from './modules/device/device.service'
import { LogCategoryType } from './utils/logger/types/log.types'
import helmet from 'helmet'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const configService = app.get(ConfigService)
    const port: number = configService.get<number>('PORT') || 3000
    const env: string = configService.get<string>('NODE_ENV') || 'development'

    const logService = app.get(LogService)
    const deviceService = app.get(DeviceService)

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        preflightContinue: false,
    })

    app.use(helmet())
    app.set('trust proxy', 'loopback')

    app.useGlobalFilters(new AllExceptionsFilter(logService))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        })
    )
    app.useGlobalInterceptors(
        new LoggingInterceptor(logService),
        new DeviceInterceptor(deviceService, logService)
    )

    await logService.debug(
        `Server started on port ${port} (${env})`,
        LogCategoryType.DB,
        {
            port: port,
            env: configService.get<string>('NODE_ENV'),
        }
    )

    await app.listen(port)
    Logger.log(`Server running in (${env}) environment`, 'Bootstrap')
    Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')
    Logger.log(
        `CORS enabled for origins: ${configService.get<string>('CORS_ORIGIN')}`,
        'Bootstrap'
    )
}

bootstrap()
    .then(() => {
        Logger.log('Server started successfully', 'Bootstrap')
    })
    .catch((err) => {
        Logger.error('Error starting the server', err)
        process.exit(1)
    })
