import { faker } from '@faker-js/faker'
import { BlogPostService } from '../../../src/modules/blog/blog.service'
import { BlogPostDocument } from '../../../src/modules/blog/schemas/blog.schema'

export async function createBlogPosts(
    blogPostService: BlogPostService,
    amount: number = 20
): Promise<BlogPostDocument[]> {
    return Promise.all(
        Array.from({ length: amount }).map(() =>
            blogPostService.create({
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                content: faker.lorem.paragraphs(3),
                tags: [
                    faker.lorem.word(),
                    faker.lorem.word(),
                    faker.helpers.arrayElement(['tag1', 'tag2', 'tag3']),
                ],
                author: faker.person.fullName(),
            })
        )
    )
}
