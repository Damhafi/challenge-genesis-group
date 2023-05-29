// Arquivos para os types e interfaces e exportação deles

type Product = {
    nome: string;
}

// model Fornecedor {
//     id       String  @id @default(cuid())
//     nome     String
//     email    String?
//     telefone String?
//     endereco String?
  
//     cotacoes Cotacao[] @relation("FornecedorCotacao")
//   }

type Fornecedor = {
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
}



export type { Product, Fornecedor };
