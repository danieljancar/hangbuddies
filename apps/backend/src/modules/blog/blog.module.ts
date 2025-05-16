import { Module } from '@nestjs/common'
import { BlogPostController } from './blog.controller'
import { BlogPostService } from './blog.service'
import { MongooseModule } from '@nestjs/mongoose'
import { BlogPost, BlogPostSchema } from './schemas/blog.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: BlogPost.name, schema: BlogPostSchema },
        ]),
    ],
    controllers: [BlogPostController],
    providers: [BlogPostService],
})
export class BlogPostModule {}
