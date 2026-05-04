# GospelReads — Convenções para Agentes de IA

## Projeto
Blog SSG de conteúdo teológico e reflexões cristãs. Content Collections (MD, 3 collections: posts, authors, pages). Hospedado no Firebase Hosting.

## Stack
Astro 6 + React 19 + Tailwind v4 + ShadCN (base-nova, @base-ui/react) + pnpm

## Comandos

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor dev |
| `pnpm build` | Build de produção |
| `pnpm preview` | Preview do build |

## Estrutura

```
src/
├── components/
│   ├── ui/              # ShadCN: badge, button, card, separator
│   └── ...              # Componentes Astro do blog
├── content/             # Content Collections (MD)
│   ├── authors/
│   ├── pages/
│   └── posts/
├── content.config.ts    # Zod schemas
├── layouts/
├── lib/                 # utils.ts (cn)
├── pages/
│   ├── index.astro
│   └── posts/[slug].astro
└── styles/
```

## Aliases
- `@/*` mapeado para `./src/*`

## Detalhes
- **Base URL:** `/gospelreads` (Firebase Hosting)
- **Plugins:** MDX, RSS, Sitemap, Typography
- **ShadCN:** variant mapping e estratégia seguem o global (~/.config/kilo/AGENTS.md)
