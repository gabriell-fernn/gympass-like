<p align="center">
  <h1 align="center">Gympass Like API</h1>
</p>

Gympass API é uma API desenvolvida em Node.js para o usuário realizar check-in em academias.

---

## 💻 Sobre

A ideia deste projeto é criar uma API para registrar o check-in do usuário em academias próximas através da sua localização de GPS.

Essa API permite a criação de usuários, além da realização de Login, a criação de check-ins e a criação de academias(caso seja administrador da aplicação). Todo o controle de usuários é feito por meio de Tokens de Autenticação usando ainda Refresh Token.

---

## 🛠 Tecnologias

As seguintes tecnologias foram empregadas na criação deste projeto:

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Fastify](https://www.npmjs.com/package/fastify)
- [Fastify Cookie](https://www.npmjs.com/package/@fastify/cookie)
- [Zod](https://www.npmjs.com/package/zod)
- [Vitest](https://vitest.dev/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Tsup](https://tsup.egoist.dev/)
- [Prisma](https://www.prisma.io/)

---

## 🚀 Regras da Aplicação

#### RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

#### RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

#### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

---

## 🚀 Como utilizar

Clone o projeto para o local desejado em seu computador.

```bash
$ git clone https://github.com/gabriell-fernn/GympassLikeAPI.git
```

---

#### 🚧 Executando a Aplicação

```bash

# Navegue até o diretório
$ cd gympass-like

# Instale as dependências necessárias
$ npm install

# Execute as Migrations para criar o Banco de Dados
$ npx prisma migrate dev

# Agora inicie a API
$ npm run dev

```

#### 🚧 Instalando o Banco de Dados Local

```bash

# Instale o Docker Desktop em seu computador através deste link
$ https://docs.docker.com/desktop/install/windows-install/

# Abra um novo terminal(sem fechar o terminal do passo anterior) e navegue até o diretório
$ cd gympass-like

# Abra um novo terminal e execute o seguinte código para instalar o Banco(o Docker deve estar instalado e em execução)
$ docker compose up -d

# No seu Docker será instalado o Banco de Dados desta aplicação.
# Com o Banco do Docker em execução e a API em execução, basta realizar as requisições pelo Insomnia.

```

## 🔀 Rotas da API

- Criar Novo Usuário

```bash
POST /users
```

- Autenticação/Login

```bash
POST /sessions
```

- Refresh Token

```bash
PATCH /token/refresh
```

- Exibir o perfil do Usuário

```bash
GET /me
```

- Criar uma Academia (somente Admin)

```bash
POST /gyms
```

---

## 📚 Testes automatizados

```bash
# A API possuí diversos testes. Após a instalação do projeto e suas depêndencias:
  npm run test
```

---

Made with ❤️ by Gabriell Fernandes 👋🏽 [Get in Touch!](https://www.linkedin.com/in/gabriellfernandess/)

---
