# Project Affiliates with Express + Frontend with Vite

This is a project responsible for attaching text files to organize transactions. It utilizes the Express framework along with a frontend built using Vite. Additionally, the project incorporates the React Dropzone and React Hot Toast libraries to implement file upload functionality and toast notifications, respectively.

Presentation links: [Vídeo 1](https://www.loom.com/embed/ca2c6a7975634c32b63fb781add3dfd9) [Vídeo 2](https://www.loom.com/share/3d0f8df6c1fe493f86a261557d57f26d)

## Prerequisites

- Node.js (version 18.16.1 or higher)
- npm (or yarn)

## Setup

### API (Express + TypeScript)

1. Navigate to the `api` folder:

```bash
cd api
```

2. Install the dependencies:

```bash
npm install or yarn install
```

3. Start a database instance using Docker for usage:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

4. Start the API server:

```bash
npm run dev or yarn dev
```

The API will be available at http://localhost:3030.

### Frontend (Vite + React)

1. Navigate to the `frontend` folder:

```bash
cd frontend
```

2. Install the dependencies:

```bash
npm install or yarn install
```

3. Start the development server:

```bash
npm run dev or yarn dev
```

The frontend will be accessible at http://localhost:3000.

## Features

### File Upload with React Dropzone

The file upload functionality is implemented using the React Dropzone library. The `CustomDropzone` component in the frontend is responsible for rendering the Dropzone and handling file uploads to the API.

### Toast Notifications with React Hot Toast

Toast notifications are implemented using the React Hot Toast library. It is used to display user-friendly notifications whenever an action is successfully executed or an error occurs.

## Project Structure

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

## Contribution

If you'd like to contribute improvements to this project, feel free to fork it and send a pull request. We'd love to receive feedback and suggestions!

---
