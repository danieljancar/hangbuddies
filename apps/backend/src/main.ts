import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { LogService } from './utils/logger/log.service'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const port: number = configService.get<number>('PORT') || 3000

    const logService = app.get(LogService)

    app.useGlobalFilters(new AllExceptionsFilter(logService))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        })
    )
    app.useGlobalInterceptors(new LoggingInterceptor(logService))

    await app.listen(port)
    Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap')
}

bootstrap()
    .then(() => {
        Logger.log('Server started successfully', 'Bootstrap')
    })
    .catch((err) => {
        Logger.error('Error starting the server', err)
        process.exit(1)
    })
