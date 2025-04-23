import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { StatusType } from '../types/status.types'

export type SurveyMetaDocument = HydratedDocument<SurveyMeta>

@Schema({ _id: false })
export class SurveyMeta {
    @Prop({ default: false })
    isHidden: boolean

    @Prop({ enum: StatusType, default: StatusType.PUBLISHED })
    status: number

    @Prop({ default: 0 })
    voteCount: number

    @Prop({ default: 0 })
    viewCount: number

    @Prop({ type: Object, default: {} })
    additional: Record<string, unknown>
}

export const SurveyMetaSchema = SchemaFactory.createForClass(SurveyMeta)
