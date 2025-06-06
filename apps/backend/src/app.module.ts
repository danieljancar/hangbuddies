import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { SurveyModule } from './modules/survey/survey.module'
import { BlogModule } from './modules/blog/blog.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                `.env.${process.env.NODE_ENV || 'development'}`,
                '.env',
            ],
        }),
        /*        ThrottlerModule.forRoot({
                    throttlers: [
                        {
                            ttl: 10000, // 10 seconds
                            limit: 50, // 50 requests per 10 seconds
                        },
                    ],
                }),*/
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
        BlogModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        /*        {
                    provide: 'APP_GUARD',
                    useClass: ThrottlerGuard,
                },*/
    ],
})
export class AppModule {}
