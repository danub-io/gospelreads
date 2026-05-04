# Contribuindo para o GospelReads

Obrigado por contribuir! Este guia define os padrões e fluxos de trabalho para manter a qualidade e consistência do código.

## Configuração do Ambiente

Pré-requisitos:

- Node.js >= 22.12.0
- pnpm (gerenciador de pacotes)

Passos:

```bash
git clone <repo-url>
cd gospelreads
pnpm install
pnpm dev
```

## Estratégia de Branches

- `main`: Branch principal, sempre pronta para produção
- `feature/*`: Novas funcionalidades (ex: `feature/new-post-template`)
- `hotfix/*`: Correções urgentes em produção (ex: `hotfix/broken-link`)
- `bugfix/*`: Correções não urgentes (ex: `bugfix/mobile-nav`)

## Padrão de Commits (Conventional Commits)

| Tipo       | Descrição                                     |
| ---------- | --------------------------------------------- |
| `feat`     | Nova funcionalidade                           |
| `fix`      | Correção de bug                               |
| `docs`     | Alterações na documentação                    |
| `style`    | Formatação de código (sem mudança lógica)     |
| `refactor` | Refatoração (sem novas features ou correções) |
| `test`     | Adição/atualização de testes                  |
| `chore`    | Manutenção (deps, scripts, etc.)              |

Exemplo:

```bash
git commit -m "feat(posts): add reading time estimate"
```

## Padrões de Código

- **TypeScript**: Strict mode ativado, evite `any`
- **Linting**: `pnpm astro check`
- **Formatação**: Prettier (executar `pnpm format`)
- **Componentes**: Prefira `.astro` para componentes estáticos, use React Islands apenas para interatividade
- **Imports**: Use path alias `@/*` em vez de caminhos relativos

### Estrutura

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

## Criar Novo Post

1. Crie um arquivo `.md` em `src/content/posts/`
2. Adicione frontmatter com `title`, `description`, `date`, `author`
3. Escreva o conteúdo em Markdown
4. Execute `pnpm dev` para ver o resultado

## Processo de Pull Request

1. Crie uma branch a partir da `main`
2. Faça suas alterações seguindo os padrões acima
3. Execute lint e formatação: `pnpm astro check && pnpm format`
4. Abra o PR para a branch `main`
5. Preencha o template de PR com descrição das mudanças
6. Aguarde revisão de código
7. O merge só será realizado após aprovação

## Checklist de Code Review

- [ ] Segue padrão de commits Conventional Commits
- [ ] Sem erros de lint (`pnpm astro check`)
- [ ] Sem erros de formatação (`pnpm format:check`)
- [ ] Tipos TypeScript corretos (sem `any` desnecessário)
- [ ] Funcionalidade testada manualmente
- [ ] Design responsivo respeitado
- [ ] Imagens otimizadas com `<Image />` do Astro

## Referências

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Visão geral da arquitetura
- [AGENTS.md](./AGENTS.md) — Convenções para agentes de IA
