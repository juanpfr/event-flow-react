# 🎉 EventFlow -- Sistema de Agendamento e Gestão de Eventos

O **EventFlow** é uma plataforma simples desenvolvida com **React +
Supabase** para organizar e gerenciar eventos (webinars, workshops,
conferências).\
O sistema permite que **organizadores** criem e administrem eventos,
enquanto **participantes** podem se inscrever e enviar feedbacks.

------------------------------------------------------------------------

## ✨ Funcionalidades

### 👤 Autenticação

-   Cadastro e login de **Organizadores** e **Participantes**.
-   Autenticação simples via Supabase (sem confirmação de e-mail).
-   Logout e redirecionamento de acordo com a role:
    -   **Organizador** → Dashboard.
    -   **Participante** → Lista de eventos.

### 📅 Participantes

-   Visualizar eventos públicos.
-   Registrar-se em eventos.
-   Cancelar inscrição.
-   Enviar **1 feedback por evento**.

### 🛠️ Organizadores

-   Criar eventos (nome, data, local, descrição, capacidade).
-   Editar e excluir eventos.
-   Visualizar lista de inscritos.
-   Acompanhar feedbacks enviados.

### 📌 Outras

-   Exibição pública de eventos e feedbacks recentes.
-   Layout simples com React e CSS básico.

------------------------------------------------------------------------

## 🗄️ Estrutura do Banco de Dados (Supabase)

Crie as tabelas no **SQL Editor** do Supabase:

``` sql
-- Tabela de usuários
create table users (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text unique not null,
  role text check (role in ('organizer','participant')) not null
);

-- Tabela de eventos
create table events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid references users(id) on delete cascade,
  nome text not null,
  data date not null,
  local text not null,
  descricao text,
  capacidade int not null
);

-- Inscrições
create table registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  participant_id uuid references users(id) on delete cascade,
  unique (event_id, participant_id)
);

-- Feedbacks
create table feedbacks (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  participant_id uuid references users(id) on delete cascade,
  comentario text not null,
  unique (event_id, participant_id) -- garante 1 feedback por participante/evento
);

```

------------------------------------------------------------------------

## 📂 Estrutura de Pastas

    src/
    ├── App.js
    ├── supabaseClient.js
    ├── components/
    │   ├── Auth.css
    │   ├── Header.js
    │   ├── Header.css
    │   ├── Home.js
    │   ├── Home.css
    │   ├── Login.js
    │   ├── Signup.js
    │   ├── Events.js
    │   ├── Dashboard.js
    │   ├── Dashboard.css
    │   ├── EventForm.js
    │   ├── EditEventForm.js
    │   └── RegistrationsTable.js

------------------------------------------------------------------------

## 🚀 Como Rodar o Projeto

### 1. Clonar o repositório

``` bash
git clone https://github.com/juanpfr/event-flow-react.git
cd eventflow
```

### 2. Instalar dependências

``` bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

    REACT_APP_SUPABASE_URL=https://xxxx.supabase.co
    REACT_APP_SUPABASE_ANON_KEY=seu_anon_key

### 4. Rodar o projeto

``` bash
npm start
```

------------------------------------------------------------------------

## 🔑 Rotas do Sistema

-   `/` → Página inicial (Home).
-   `/signup` → Cadastro de usuários.
-   `/login` → Login de usuários.
-   `/events` → Página de eventos (Participante).
-   `/dashboard` → Painel de controle (Organizador).

------------------------------------------------------------------------

## 👨‍💻 Tecnologias Utilizadas

-   **React** (Vite ou CRA)
-   **React Router DOM**
-   **Supabase (Auth + Postgres Database)**
-   **CSS puro**

------------------------------------------------------------------------

## 📸 Preview

### Página Inicial

-   Hero section
-   Eventos públicos (até 3 destacados)
-   Feedbacks recentes

### Dashboard do Organizador

-   Criar eventos
-   Editar/excluir eventos
-   Ver inscritos e feedbacks

### Eventos do Participante

-   Lista de eventos disponíveis
-   Botão de registro
-   Envio de feedback

------------------------------------------------------------------------

## 📜 Licença

Este projeto é apenas para fins acadêmicos e não possui licença
comercial.

------------------------------------------------------------------------

## 🧑‍💻👨‍🎓 Grupo

-   Alisson - [@alissongaldino22](https://github.com/alissongaldino22)
-   Bruno - [@br7trindade](https://github.com/br7trindade)
-   Caique - [@kiqrr](https://github.com/kiqrr)
-   Juan - [@juanpfr](https://github.com/juanpfr)
-   Kleber - [@Kleberapenas](https://github.com/Kleberapenas)
