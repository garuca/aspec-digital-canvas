# ASPEC Digital Solutions

Website institucional da ASPEC Digital Solutions - Agência de soluções digitais especializada em desenvolvimento de software, design e marketing digital.

## Tecnologias

- **Frontend:** React 18 + TypeScript + Vite
- **Estilização:** Tailwind CSS + shadcn/ui
- **Ícones:** Lucide React
- **Formulários:** React Hook Form + Zod
- ** Internacionalização:** Context API (PT, EN, ES)

## Requisitos

- [Bun](https://bun.sh/) (recomendado) ou Node.js 18+

## Como Rodar Localmente

### 1. Instalar dependências

```bash
bun install
# ou
npm install
```

### 2. Rodar em modo desenvolvimento

```bash
bun run dev
# ou
npm run dev
```

O site estará disponível em: http://localhost:8080/

### 3. Build de produção

```bash
bun run build
# ou
npm run build
```

Os arquivos compilados ficam na pasta `dist/`.

## Deploy

### GitHub Pages (Automático)

O projeto está configurado com GitHub Actions para deploy automático a cada push no branch `main`.

1. Configure o GitHub Pages:
   - Vá em **Settings > Pages**
   - Em **Build and deployment**, selecione **Source: GitHub Actions**

2. O deploy é automático após cada push para `main`

3. Acesse: https://garuca.github.io/aspec-digital-canvas/

### Deploy Manual (gh-pages)

```bash
bun run deploy
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/            # Componentes shadcn/ui
│   └── *.tsx          # Componentes customizados
├── context/            # Contextos React (i18n)
├── pages/              # Páginas
├── utils/              # Funções utilitárias
└── App.tsx            # Componente principal
```

## Internacionalização

O site suporta 3 idiomas:
- 🇧🇷 Português (PT-BR) - padrão
- 🇺🇸 English (EN)
- 🇪🇸 Español (ES)

O idioma é selecionado pelo seletor no header e persistido no localStorage.

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `bun run dev` | Rodar em modo desenvolvimento |
| `bun run build` | Build de produção |
| `bun run preview` | Visualizar build de produção |
| `bun run lint` | Verificar lint |
| `bun run deploy` | Deploy manual para GitHub Pages |

## Contato

- **Email:** contato@aspec.digital
- **Site:** https://aspec.digital
