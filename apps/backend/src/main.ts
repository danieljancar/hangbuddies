import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'
import { LogService } from './utils/logger/log.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const port: number = configService.get<number>('PORT') || 3000

    const logService = app.get(LogService)

    app.useGlobalFilters(new AllExceptionsFilter(logService))

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
