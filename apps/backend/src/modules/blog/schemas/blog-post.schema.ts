import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type BlogPostDocument = HydratedDocument<BlogPost>

@Schema({ timestamps: true })
export class BlogPost {
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

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost)

BlogPostSchema.virtual('id').get(function (this: BlogPostDocument) {
    return this._id.toHexString()
})

BlogPostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
        delete ret._id
    },
})
