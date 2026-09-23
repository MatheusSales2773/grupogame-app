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
- Revisão das explicações de Flexbox, rolagem, componentes e origem dos assets para abranger as duas telas.
- Atualização do plano, estrutura atual e registro de validação.
- Criação deste histórico e inclusão no índice.
- Registro da orientação de atualizar os docs junto com as próximas implementações.

Somente arquivos de documentação foram alterados. Nenhuma nova tela foi implementada e nenhum teste de aplicativo foi repetido nesta revisão.

## Etapa 5 — Detalhes do servidor

- Implementação da rota dinâmica `src/app/servidor/[id].tsx`, conforme `tela-2.1-home.png`.
- Cabeçalho com voltar e compartilhar, banner, nome, descrição, três jogadores e botão principal.
- Dados locais para os seis servidores já referenciados pela Home; ID simples nos parâmetros e busca com `find`.
- Ativação dos cards com o callback existente; filtros, estilos e botão `+` preservados.
- Componentes simples `ScreenHeader` e `PlayerItem`, sem estado próprio.
- Entrada simulada com mensagem em `useState`; compartilhamento de nome e descrição pela opção do sistema, com tratamento de indisponibilidade.
- Tratamento de servidor inexistente e de retorno sem histórico; geração dos seis endereços para exportação web estática.
- Adição do banner original, reaproveitamento de imagens existentes e uso de iniciais para duas fotos indisponíveis.
- Atualização dos docs e criação de [Detalhes do servidor](./08-detalhes-do-servidor.md), com decisões, props, JSX, estilos, estado e roteiro para apresentação.

Arquivos de implementação: `src/app/home.tsx`, `src/app/servidor/[id].tsx`, `src/data/servers.ts`, `src/components/screen-header.tsx`, `src/components/player-item.tsx` e `assets/images/servers/banner.png`. Registro dos recursos em `assets/README.md`. Os resultados de verificação ficam em [Validação](./05-execucao-e-validacao.md).

## Etapa 6 — Agendar

- Criação de uma única rota `src/app/agendar.tsx` para os estados das quatro referências.
- Ativação do botão `+` da Home e retorno pela pilha, com fallback para Home no acesso direto sem histórico.
- Servidor Valorosos/Valorant fixo, reutilizando o logo local, sem seletor ou modal.
- Categoria inicialmente vazia e seleção única por ID em `useState`.
- Reutilização de `CategoryCard` e `ScreenHeader`, sem criar componentes novos.
- Adição de `accessibilityHint` opcional ao cartão, preservando a instrução padrão da Home.
- Cinco `TextInput` controlados: quatro campos de dois dígitos e descrição multiline de até 100 caracteres.
- Uso de `KeyboardAvoidingView`, área segura e rolagem, com botão dentro do conteúdo rolável.
- Agendar mostra apenas uma mensagem de demonstração, sem validação de calendário, persistência ou alteração das partidas da Home.
- Preservação de Login, Detalhes, layout, dados e dependências; atualização dos docs e criação de [Tela Agendar](./09-tela-agendar.md).

Arquivos de código: `src/app/agendar.tsx`, `src/app/home.tsx` e `src/components/category-card.tsx`. Nenhum novo asset ou pacote. TypeScript e exportação Android/iOS/web passaram; visual, toque e teclado em aparelho permanecem pendentes. Resultados em [Validação](./05-execucao-e-validacao.md).

## Etapa 7 — Revisão das quatro telas

- Revisão das dez referências, dos estilos, dos assets, das rotas, dos campos e da seleção de categoria.
- Reprodução isolada de destinos duplicados com ações `PUSH`; troca por `navigate` nas duas aberturas da Home.
- Testes isolados com o `StackRouter` instalado para fluxo, repetição, retorno e acesso direto.
- Adição do pequeno marcador visual de categoria em Agendar por prop opcional, preservando o visual da Home.
- TypeScript com verificação de itens não utilizados e exportação Android/iOS/web aprovados.
- Conferência de imports, assets, IDs, vínculos de dados e HTML dos endereços principais.
- Preservação dos arquivos antigos do template, sem novas dependências.
- Atualização dos documentos afetados e criação de [Revisão final](./10-revisao-final.md).

Código alterado nesta revisão: `src/app/home.tsx`, `src/app/agendar.tsx` e `src/components/category-card.tsx`. A comparação visual foi feita com referências/código, sem screenshots renderizados do aplicativo. Fluxo por toque, digitação e teclado continuam pendentes de dispositivo conectado.

## O que ainda falta

- Realizar a conferência visual e os testes de toque nas quatro telas.
- Conferir o teclado e a rolagem de Agendar em Android e iOS, incluindo telas pequenas e texto ampliado.

O modal da lista de servidores permanece excluído do escopo. Autenticação real, persistência e modal de saída não foram implementados.

## Como registrar as próximas etapas

Em cada alteração, anotar o que foi feito, os arquivos envolvidos, o motivo das decisões, os conceitos utilizados, as verificações realmente executadas e as pendências. Atualizar os documentos afetados para não deixar orientações antigas descritas como atuais.
