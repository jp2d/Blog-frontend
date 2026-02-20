# 📖Bem vindo ao Blogster!
## Compartilhando ideias e conhecimento

O **Blogster** é uma aplicação blog, de *teste*, desenvolvida para permitir que usuários criem, editem e gerenciem postagens e contas de forma simples e intuitiva.  
O projeto é dividido em três partes principais: **Backend (API)**, **Frontend (React)** e **Banco de Dados (PostegreSQL)**.


# 🚀Tecnologias utilizadas

## Backend

-   **.NET 10 / [ASP.NET](https://dotnet.microsoft.com/) Core Web API**
-   **Entity Framework Core**
-   **JWT Authentication**
-   **BCrypt** para hashing de senhas
-   **Swagger/OpenAPI** para documentação

## Frontend

-   **React + TypeScript**
-   **Axios** para chamadas HTTP
-   **Bootstrap 5** para estilização
-   **React Router** para navegação

## Banco de Dados

-   **PostgreSQL**

## Container

-   **Docker** 
-   **Docker  Desktop**

## 📂 Repositórios Git

- **Backend**: [Blog-backend](https://github.com/jp2d/Blog-backend.git)  
- **Frontend**: [Blog-frontend](https://github.com/jp2d/Blog-frontend.git)  
- **Banco de Dados**: [Blog-BancodeDados](https://github.com/jp2d/Blog-BancodeDados.git)

# ⚙️ Como baixar e executar

### 1. Crie uma pasta
- Criar uma pasta chamada **Blog**.  
---
### 2. Clonar os repositórios para a pasta Blog
```bash
# Backend
git clone https://github.com/jp2d/Blog-backend.git

# Frontend
git clone https://github.com/jp2d/Blog-frontend.git

# Banco de Dados
git clone https://github.com/jp2d/Blog-BancodeDados.git
```
---

### 3. Estrura de pastas deve ser:
Blog/
│
├── Blog-backend/               # API em ASP.NET Core
├── Blog-frontend/               # Aplicação React + TypeScript
└── Blog-BancodeDados/    # Docker-Composer para criação do containers

---
### 4. Executar
Abra o console e navegue até a pasta Blog-BancodeDados e execute o compando para criar os containers e iniciar a aplicação
```bash
cd ./BLog/Blog-BancodeDados
docker-compose up --build
```

# ✨Acessando o blog

### 1. Acessando o Backend
O backend estará disponível em:  
👉 `https://localhost:5000/`

---

### 2. Acessando o Frontend

O frontend estará disponível em:  
👉 `http://localhost:3000`

## 👥 Funcionalidades principais

- **Visualizar todos os posts** (Tela principal)  
- **Autenticação de usuários** (login e cadastro)  
- **Gerenciamento de posts** (criar, editar, excluir, listar)  
- **Gerenciamento de usuários** (admin pode criar, editar e excluir usuários)  
- **Interface responsiva e limpa** com Bootstrap  

## 🔑 Autenticação no Swagger

O projeto utiliza **JWT (JSON Web Token)** para autenticação.  
No Swagger, há um botão **Authorize** que permite inserir o token e acessar os endpoints protegidos.

### Como usar:
1. Faça login na aplicação (endpoint `/Auth/login`) e copie o token JWT retornado.
2. No Swagger, clique no botão **Authorize** no canto superior direito.
3. Insira o token no formato:
   ```
   <seu_token>
   ```
   Exemplo:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Clique em **Authorize** e depois em **Close**.
5. Agora todos os endpoints protegidos estarão acessíveis diretamente pelo Swagger.
## 📌 Observações
- Certifique-se de ter o git e o docker instalados para poder executar o blog.
- Certifique-se de que os container estejam rodando.  
- Na primeira execução será criado um usuário Admin. 
- O token expira após um tempo configurado no backend.
- Se o token expirar, basta refazer o login e inserir o novo token no Swagger.
- Endpoints com cadeado 🔒 exigem autenticação.
```
e-mail: admin@blog.com
senha: Admin@123
```