import { faker } from '@faker-js/faker'
import { BlogService } from '../../../src/modules/blog/blog.service'
import { BlogDocument } from '../../../src/modules/blog/schemas/blog.schema'

export async function createBlog(
    blogService: BlogService,
    amount: number = 20
): Promise<BlogDocument[]> {
    return Promise.all(
        Array.from({ length: amount }).map(() =>
            blogService.create({
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
