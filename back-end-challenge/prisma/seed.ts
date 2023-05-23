import { Prisma, PrismaClient, AccountType } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { SHA256 } from "crypto-js";

const prisma = new PrismaClient();

async function seed() {
  faker.locale = "pt_BR";

  const users: Prisma.UserCreateManyInput[] = [];
  const numUsers = 0;

  for (let i = 0; i < numUsers; i++) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      passwordHash: SHA256("123").toString(),
      accountType: i % 2 === 0 ? AccountType.COMPRADOR : AccountType.GERENTE,
      image: faker.image.avatar(),
    });
  }

  await prisma.user.createMany({
    data: users,
  });

  console.log("Usuários populados com sucesso!");

  // CREATE MANY PRODUCTS
  const products: Prisma.ProdutoCreateManyInput[] = [];
  const numProducts = 0;

  for (let i = 0; i < numProducts; i++) {
    products.push({
      
    });
  }

  await prisma.produto.createMany({
    data: products,
  });

}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
