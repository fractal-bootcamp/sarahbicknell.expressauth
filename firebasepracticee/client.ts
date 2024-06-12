import { PrismaClient } from '@prisma/client';

const client = new PrismaClient()

async function main(title: string, ISBN: number, name: string, biography: string) {
    await prisma.book.create({
        data: {
            title: title,
            ISBN: ISBN, 
            author: {
                create: {name: name, biography: biography},
            },
        }, 
    })

    const allBooks = await prisma.book.findMany()
      console.dir(allBooks)

    const allAuthors = await prisma.author.findMany()
        console.dir(allAuthors)
}vc

export default client;

