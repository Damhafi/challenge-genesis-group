import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { SHA256 } from "crypto-js";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/produtos", async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// Autenticação de usuários
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const hashedPassword = SHA256(password).toString();

    if (user.passwordHash !== hashedPassword) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Mostrar todos os USERS
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>Todo REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /persons
    GET, PUT, DELETE /persons/:id
    GET, POST /professions
    GET, PUT, DELETE /professions/:id
  </pre>
  `.trim()
  );
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
