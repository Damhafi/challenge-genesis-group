import { Prisma, PrismaClient, AccountType } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { SHA256 } from "crypto-js";
import { Fornecedor, Product } from "./types";
import { parse } from "path";

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
  const numFornecedores = 0;

  for (let i = 0; i < numFornecedores; i++) {
    fornecedores.push({
      nome: faker.company.name(),
      email: faker.internet.email(),
      telefone: faker.phone.number("+55 (##) ####-####"),
      endereco: faker.address.streetAddress(),
    });
  }

  try {
    // POPULATE DATABASE - USERS
    await prisma.user.createMany({
      data: users,
    });
    console.log("Usuários populados com sucesso!");

    // POPULATE DATABASE - PRODUCTS
    await prisma.produto.createMany({
      data: products,
    });
    console.log("Produtos populados com sucesso!");

    // POPULATE DATABASE - FORNECEDORES
    await prisma.fornecedor.createMany({
      data: fornecedores,
    });
    console.log("Fornecedores populados com sucesso!");

    // POPULATE DATABASE - COTAÇÕES
    const cotacoes: Prisma.CotacaoCreateManyInput[] = [];
    const numCotacoes = 10;

    for (let i = 0; i < numCotacoes; i++) {
      const produto = await prisma.produto.findFirst({
        skip: Math.floor(Math.random() * numProducts),
        orderBy: { id: "asc" },
      });

      const fornecedor = await prisma.fornecedor.findFirst({
        skip: Math.floor(Math.random() * numFornecedores),
        orderBy: { id: "asc" },
      });

      if (produto && fornecedor) {
        cotacoes.push({
          produtoId: produto.id,
          fornecedorId: fornecedor.id,
          preco: parseFloat(faker.commerce.price()),
          IdOrcamentoCotacao: (Math.floor(Math.random() * 11)).toString(),
        });
      }
    }

    await prisma.cotacao.createMany({
      data: cotacoes,
    });
    console.log("Cotações populadas com sucesso!");


    // CREATE ORCAMENTOS
    const orcamentos: Prisma.OrcamentoCreateManyInput[] = [];
    const numOrcamentos = 10;

    for (let i = 0; i < numOrcamentos; i++) {
      const gerente = await prisma.user.findFirst({
        where: { accountType: AccountType.GERENTE },
        skip: Math.floor(Math.random() * numUsers),
        orderBy: { id: "asc" },
      });

      const comprador = await prisma.user.findFirst({
        where: { accountType: AccountType.COMPRADOR },
        skip: Math.floor(Math.random() * numUsers),
        orderBy: { id: "asc" },
      });

      const produto = await prisma.produto.findFirst({
        skip: Math.floor(Math.random() * 3),
        orderBy: { id: "asc" },
      });

      if (gerente && comprador && produto) {
        orcamentos.push({
          item: produto.nome,
          aprovado: faker.datatype.boolean(),
          gerenteId: gerente.id,
          compradorId: comprador.id,
          produtoId: produto.id,
        });
      }
    }

    await prisma.orcamento.createMany({
      data: orcamentos,
    });
    console.log('Orçamentos populados com sucesso!');


    // CREATE MANY ORÇAMENTO-COTAÇÕES
    const orcamentoCotacoes: Prisma.OrcamentoCotacaoCreateManyInput[] = [];
    const numOrcamentoCotacoes = 10;

    for (let i = 0; i < numOrcamentoCotacoes; i++) {
      const orcamento = await prisma.orcamento.findFirst({
        skip: Math.floor(Math.random() * numOrcamentos),
        orderBy: { id: "asc" },
      });
    
      const cotacao = await prisma.cotacao.findFirst({
        skip: Math.floor(Math.random() * numCotacoes),
        orderBy: { id: "asc" },
      });
    
      if (orcamento && cotacao) {
        await prisma.orcamentoCotacao.create({
          data: {
            orcamentoId: orcamento.id,
            cotacoes: { connect: { id: cotacao.id } },
          },
        });
      }
    }

    await prisma.orcamentoCotacao.createMany({
      data: orcamentoCotacoes,
    });
    console.log('Orçamento-Cotações populados com sucesso!');

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
