import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { SurveyModule } from './modules/survey/survey.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
                appName: configService.get<string>('MONGO_APP_NAME'),
                dbName: configService.get<string>('MONGO_APP_NAME'),
            }),
        }),

        SurveyModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
