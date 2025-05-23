import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type BlogDocument = HydratedDocument<Blog>

@Schema({ timestamps: true })
export class Blog {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    content: string // Markdown format

    @Prop({ type: [String], default: [] })
    tags: string[]

    @Prop({ required: true })
    author: string

    createdAt: Date
    updatedAt: Date
}

export const BlogSchema = SchemaFactory.createForClass(Blog)

BlogSchema.virtual('id').get(function (this: BlogDocument) {
    return this._id.toHexString()
})

BlogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id
    },
})
