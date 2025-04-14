import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
    const configService = app.get(ConfigService)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const port: number = configService.get<number>('PORT') || 3000

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
