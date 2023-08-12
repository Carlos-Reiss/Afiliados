# Projeto Filiados com Express + Frontend com Vite

Este é um projeto que demonstra como criar uma API usando o framework Express, juntamente com um frontend utilizando o Vite. Além disso, o projeto faz uso das bibliotecas React Dropzone e React Hot Toast para implementar funcionalidades de upload de arquivo e notificações toast, respectivamente.

## Pré-requisitos

- Node.js (versão 18.16.1 ou superior)
- npm (ou yarn)

## Configuração

### API (Express + TypeScript)

1. Navegue até a pasta `api`:

```bash
cd api
```

2. Instale as dependências:

```bash
npm ou yarn install
```
3. Suba uma instância do banco para utilização com docker

```bash
docker-compose -f docker/docker-compose.yml up -d
```

4. Inicie o servidor da API:

```bash
npm ou yarn dev
```

A API estará disponível em http://localhost:3030.

### Frontend (Vite + React)

1. Navegue até a pasta `frontend`:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm ou yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev ou yarn dev
```

O frontend estará disponível em http://localhost:3000.

## Funcionalidades

### Upload de Arquivo com React Dropzone

A funcionalidade de upload de arquivo é implementada usando a biblioteca React Dropzone. O componente `CustomDropzone` no frontend é responsável por renderizar o Dropzone e lidar com o envio de arquivos para a API.

### Notificações Toast com React Hot Toast

As notificações toast são implementadas usando a biblioteca React Hot Toast. É utilizado para mostrar notificações amigáveis ao usuário sempre que uma ação é executada com sucesso ou ocorre um erro.

## Estrutura do Projeto

```
packages
├── api
│   ├── src
│   │   ├── services
│   │   ├── routes
│   │   ├── common
│   │   ├── utils
│   │   └── index.ts
│   ├── package.json
│   ├── jest.config.json
│   └── tsconfig.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── types
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Contribuição

Se você quiser contribuir com melhorias neste projeto, fique à vontade para fazer um fork e enviar um pull request. Vamos adorar receber feedback e sugestões!

---