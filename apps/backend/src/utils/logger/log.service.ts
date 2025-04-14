import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LogCategoryEnumType, LogLevelType } from '../../types/log.types'
import { Log, LogDocument } from './schemas/log.schema'

export interface LogMeta {
    context?: string
    category?: LogCategoryEnumType
    module?: string
    extra?: Record<string, any>
}

@Injectable()
export class LogService {
    constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

    async log(message: string, meta?: LogMeta): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.INFO,
            message,
            ...meta,
        })
    }

    async warn(message: string, meta?: LogMeta): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.WARN,
            message,
            ...meta,
        })
    }

    async debug(message: string, meta?: LogMeta): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.DEBUG,
            message,
            ...meta,
        })
    }

    async verbose(message: string, meta?: LogMeta): Promise<void> {
        await this.logModel.create({
            level: LogLevelType.VERBOSE,
            message,
            ...meta,
        })
    }
}
