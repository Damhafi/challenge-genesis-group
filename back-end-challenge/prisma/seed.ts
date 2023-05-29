import { Prisma, PrismaClient, AccountType } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { SHA256 } from "crypto-js";
import { Fornecedor, Product } from "./types";

const prisma = new PrismaClient();

async function seed() {
  faker.locale = "pt_BR";

  // CREATE USERS
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
  const products: Product[] = [];
  const numProducts: number = 0;

  for (let i = 0; i < numProducts; i++) {
    products.push({
      nome: faker.commerce.productMaterial(),
    });
  }

  // CREATE MANY FORNECEDORES (THAT HAVE PRODUCTS)
  const fornecedores: Fornecedor[] = [];
  const numFornecedores = 10;

  for (let i = 0; i < numFornecedores; i++) {
    fornecedores.push({
      nome: faker.company.name(),
      email: faker.internet.email(),
      telefone: faker.phone.number("+55 (##) ####-####"),
      endereco: faker.address.streetAddress(),
    });
  }

  

  try {
    // await prisma.produto.createMany({
    //   data: products,
    // });
    // console.log("Produtos populados com sucesso!");

    await prisma.fornecedor.createMany({
      data: fornecedores,
    });

    console.log("Fornecedores populados com sucesso!");
    
  } catch (err) {
    console.log(err);
  }
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
