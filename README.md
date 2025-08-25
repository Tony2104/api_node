# backendAuth

API em Node.js + TypeScript usando Fastify, Drizzle ORM (PostgreSQL) e Zod, para autenticação e gestão de cursos.
Inclui documentação Swagger/Scalar em ambiente de desenvolvimento.

## Funcionalidades

- Gestão de cursos (criação, listagem, consulta por ID)
- Integração com base de dados via Drizzle ORM
- Configuração pronta para Docker

## Estrutura do Projeto

```
docker-compose.yml         # Configuração de containers Docker
drizzle.config.ts          # Configuração do Drizzle ORM
package.json               # Dependências e scripts npm
server.ts                  # Ponto de entrada do servidor
src/
  database/
    client.ts              # Cliente de ligação à base de dados
    schema.ts              # Definição do esquema da base de dados
  routes/
    create-course.ts       # Rota para criar curso
    get-course-by-id.ts    # Rota para obter curso por ID
    get-courses.ts         # Rota para listar cursos
```

## Utilização

- Para iniciar o servidor em modo de desenvolvimento:
  ```bash
  npm run dev
  ```
- Para iniciar com Docker:
  ```bash
  docker-compose up -d
  ```

## Endpoints Principais

- `POST /courses` — Criar um novo curso
- `GET /courses` — Listar todos os cursos
- `GET /courses/:id` — Obter detalhes de um curso por ID

## Tecnologias Utilizadas

- Node.js 22+
- TypeScript
- Fastify
- pino-pretty
- docker-compose
- Drizzle ORM
- drizzle-kit
- pg (PostgreSQL driver)
- Zod
- fastify-type-provider-zod
- @fastify/swagger
- @scalar/fastify-api-reference

## Licença

Este projeto está licenciado sob a licença MIT.
