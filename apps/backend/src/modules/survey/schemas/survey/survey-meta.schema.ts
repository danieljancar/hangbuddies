import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { StatusEnumType, StatusType } from '../types/status.types'

@Schema({ _id: false })
export class SurveyMeta {
    @Prop({ default: false })
    isHidden: boolean

    @Prop({ enum: StatusType, default: StatusType.PUBLISHED })
    status: StatusEnumType

    @Prop({ default: 0 })
    voteCount: number

    @Prop({ default: 0 })
    viewCount: number

    @Prop({ required: false })
    additional?: Record<string, any>
}

export const SurveyMetaSchema = SchemaFactory.createForClass(SurveyMeta)
