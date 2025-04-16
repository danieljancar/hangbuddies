import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LogCategoryEnumType, LogLevelType } from './types/log.types'
import { Log, LogDocument } from './schemas/log.schema'

@Injectable()
export class LogService {
    constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

    async log(
        message: string,
        category: LogCategoryEnumType,
        extra?: Record<string, any>
    ): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.INFO,
            message,
            category,
            extra,
        })
    }

    async warn(
        message: string,
        category: LogCategoryEnumType,
        extra?: Record<string, any>
    ): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.WARN,
            message,
            category,
            extra,
        })
    }

    async debug(
        message: string,
        category: LogCategoryEnumType,
        extra?: Record<string, any>
    ): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.DEBUG,
            message,
            category,
            extra,
        })
    }

    async verbose(
        message: string,
        category: LogCategoryEnumType,
        extra?: Record<string, any>
    ): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.VERBOSE,
            message,
            category,
            extra,
        })
    }
}
