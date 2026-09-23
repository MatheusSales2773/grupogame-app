# Histórico de alterações

[Voltar ao índice](./README.md)

Registro do trabalho realizado, organizado por etapa. A inclusão de uma etapa aqui não significa que houve commit ou publicação no GitHub.

## Etapa 1 — Análise e planejamento

- Leitura da estrutura, dependências, configurações e código do template.
- Análise das dez imagens de `referencias/`.
- Identificação das quatro telas solicitadas e dos estados de Agendar.
- Plano para manter Expo, React Native, TypeScript e Expo Router.
- Definição de implementação de uma tela por vez e componentes simples.
- Exclusão do modal da lista de servidores e adiamento de ESLint.

Não houve alteração de código durante a análise. Consulte [Análise](./01-analise-do-projeto.md) e [Plano](./02-plano-de-implementacao.md).

## Etapa 2 — Login

- Substituição de “Welcome to Expo” pela interface de Login.
- Adição da ilustração, ícone Discord e fontes locais, com registro das origens e licenças.
- Uso de StyleSheet, Flexbox, área segura e rolagem.
- Entrada simulada com `router.replace('/home')`, sem autenticação real.
- Troca das abas do template por Stack e carregamento das fontes no layout.
- Criação inicial de uma rota Home vazia, para não antecipar sua implementação.

Arquivos: `src/app/index.tsx`, `src/app/_layout.tsx`, `src/app/home.tsx`, `assets/images/login/`, `assets/fonts/` e `assets/README.md`. A lista detalhada está em [Tela de Login](./03-tela-de-login.md).

TypeScript e exportação Android/iOS/web passaram após a preparação do ambiente Expo. Conferência visual e testes no aparelho permaneceram pendentes.

## Etapa 3 — Documentação inicial

- Criação da pasta `docs` com índice, análise, plano, explicação do Login, guia de apresentação e execução/validação.
- Registro de decisões, conceitos, limitações e testes pendentes.
- Conferência dos links locais.

Essa etapa não alterou o aplicativo.

## Etapa 4 — Home

- Implementação da saudação com avatar e usuário simulado.
- Quatro categorias em lista horizontal: Ranqueada, Duelo 1x1, Diversão e Treino.
- Seis partidas locais em lista vertical, com capa, categoria, data, horário e papel do usuário.
- Filtro por categoria com `useState`; novo toque na categoria ativa remove o filtro.
- Total calculado pela quantidade de partidas visíveis.
- Criação de `CategoryCard` e `AppointmentCard`, reutilizados nos itens das listas.
- Preparação de `serverId` e callback opcional para futura navegação a Detalhes.
- Manutenção do `+` e dos cartões de partidas desativados até as telas de destino existirem.
- Adição de treze imagens/ícones locais e registro das diferenças em relação à referência.
- Preservação do código do Login, layout e dependências, confirmada por hashes.

Arquivos: `src/app/home.tsx`, `src/data/home.ts`, `src/components/category-card.tsx`, `src/components/appointment-card.tsx`, `assets/images/home/`, `assets/README.md`, `docs/README.md` e `docs/06-tela-home.md`.

TypeScript e exportação Android/iOS/web passaram. Não houve teste visual ou de toque no aparelho. Consulte [Tela Home](./06-tela-home.md).

## 23/09/2026 — Sincronização da documentação

- Atualização dos documentos que ainda descreviam a Home como vazia ou futura.
- Inclusão da Home no roteiro de apresentação e nas perguntas sobre props, listas e estado.
- Atualização do plano, estrutura atual e registro de validação.
- Criação deste histórico e inclusão no índice.
- Registro da orientação de atualizar os docs junto com as próximas implementações.

Somente arquivos de documentação foram alterados. Nenhuma nova tela foi implementada e nenhum teste de aplicativo foi repetido nesta revisão.

## O que ainda falta

- Implementar Detalhes do servidor quando solicitado.
- Implementar Agendar com servidor selecionado e seleção de categoria quando solicitado.
- Conectar os botões da Home às rotas correspondentes.
- Realizar a conferência visual e os testes de toque em aparelho.

O modal da lista de servidores permanece excluído do escopo. Autenticação real, persistência e modal de saída não foram implementados.

## Como registrar as próximas etapas

Em cada alteração, anotar o que foi feito, os arquivos envolvidos, o motivo das decisões, os conceitos utilizados, as verificações realmente executadas e as pendências. Atualizar os documentos afetados para não deixar orientações antigas descritas como atuais.
