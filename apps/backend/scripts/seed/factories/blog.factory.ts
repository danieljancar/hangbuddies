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
                content: generateMarkdownContent(),
                tags: [
                    faker.lorem.word(),
                    faker.helpers.arrayElement(['tag1', 'tag2', 'tag3']),
                ],
                author: faker.person.fullName(),
            })
        )
    )
}

function generateMarkdownContent(): string {
    return `
# ${faker.lorem.sentence()}

${faker.lorem.paragraph()}
\n\n
## ${faker.lorem.words(3)}

${faker.lorem.paragraph()}

**${faker.lorem.words(2)}**: ${faker.lorem.sentence()}  
*${faker.lorem.words(2)}* — ${faker.lorem.sentence()}
\n\n
### Liste

- ${faker.lorem.sentence()}
- ${faker.lorem.sentence()}
- ${faker.lorem.sentence()}
\n\n
### Geordnete Liste

1. ${faker.lorem.sentence()}
2. ${faker.lorem.sentence()}
3. ${faker.lorem.sentence()}

> ${faker.lorem.sentence()}

\`\`\`js
// Beispielcode
function greet(name) {
  return 'Hello, ' + name + '!';
}
\`\`\`
`.trim()
}
