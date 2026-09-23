# Plano de implementação

[Voltar ao índice](./README.md)

## Escopo aprovado

As telas solicitadas são Login, Home, Detalhes do servidor e Agendar com servidor selecionado. Agendar deve permitir trocar a categoria e refletir a mudança na interface. O modal da lista de servidores não deve ser desenvolvido.

Após a análise, foi decidido implementar uma tela por vez. Login, Home, Detalhes do servidor e Agendar foram implementados em etapas separadas. A quarta tela usa somente estado local e servidor fixo; a revisão visual e os testes em aparelho permanecem pendentes.

## Decisões e motivos

| Decisão | Por quê | Conceito |
| --- | --- | --- |
| Manter Expo, React Native e TypeScript | Aproveitar a base e evitar migração | Componentes nativos e tipagem |
| Usar Expo Router | Já está configurado e faz parte das regras do projeto | Rotas por arquivos e navegação em pilha |
| Usar StyleSheet e Flexbox | Solução existente, simples e explicável | Objetos de estilo e distribuição de espaço |
| Manter estilos próximos da tela inicialmente | Facilitar leitura e apresentação | Organização por responsabilidade |
| Não criar componentes genéricos antecipadamente | Evitar abstrações sem uso real | Extração orientada à reutilização |
| Usar dados de demonstração na Home e em Detalhes | Construir a interface sem integração externa | Dados locais e props |
| Conectar os cards a Detalhes e o `+` a Agendar | Completar o fluxo entre as quatro telas implementadas | Callback, rotas e pilha de navegação |

A proposta inicial listava vários componentes possíveis. Essa lista é um conjunto de candidatos, não uma obrigação de criar todos. Nenhum componente genérico foi extraído na etapa de Login.

Na Home foram criados `CategoryCard` e `AppointmentCard`, pois os cartões se repetem nas listas. A rota vazia de Home existiu apenas durante a primeira etapa e já foi substituída pela interface. Em Detalhes, `PlayerItem` organiza os itens repetidos e `ScreenHeader` organiza voltar, título e compartilhar, inclusive no estado de servidor inexistente.

## Possíveis componentes futuros

| Candidato | Quando faria sentido |
| --- | --- |
| Botão de ação | Quando outra tela utilizar o mesmo padrão do Login |
| Cabeçalho | `ScreenHeader` reutilizado em Detalhes e Agendar |
| Cartão/seletor de categorias | `CategoryCard` reutilizado na Home e em Agendar, com callbacks distintos |
| Item de partida | `AppointmentCard` já existe e organiza os itens da Home |
| Item de jogador | `PlayerItem` já existe e organiza a lista de Detalhes |
| Campo de formulário | Se os campos repetirem estilo e comportamento em Agendar |
| Resumo do servidor | Se simplificar significativamente o formulário ou for reutilizado |

Os componentes de tema existentes podem ser aproveitados se atenderem às novas telas. Não é necessário modificar todos os componentes do template para implementar o trabalho.

## Organização proposta para as próximas etapas

```text
src/
  app/
    _layout.tsx
    index.tsx              # Login existente
    home.tsx               # Home implementada
    agendar.tsx            # Formulário implementado, estado local
    servidor/
      [id].tsx             # Detalhes implementado
  components/
    category-card.tsx      # Existente
    appointment-card.tsx   # Existente
    screen-header.tsx      # Existente
    player-item.tsx        # Existente
    ...                    # Demais componentes do template
  constants/
    theme.ts
  data/
    home.ts                # Dados e tipos atuais
    servers.ts             # Servidores e jogadores simulados
  types/
    game.ts                # Futuro, para tipos compartilhados
  hooks/
assets/
  images/
  fonts/
docs/
```

Essa árvore mistura arquivos existentes e sugestões explicitamente marcadas como futuras. Componentes, dados e utilitários devem permanecer fora de `src/app`, pois essa pasta define rotas.

## Navegação

Fluxo planejado:

```text
Login → Home
          ├── partida → Detalhes do servidor
          └── botão + → Agendar com servidor predefinido
```

O primeiro trecho usa `router.replace('/home')`. Home → Detalhes usa `router.navigate` com `id`; Home → Agendar usa `router.navigate('/agendar')`. A revisão substituiu `push` para evitar destinos duplicados em aberturas repetidas. As duas telas permitem voltar com `router.back` ou ir para Home quando não há histórico.

O botão `+` está ativo e abre Agendar. `AppointmentCard` recebe `handleOpenServer` da Home; o callback abre a rota `/servidor/[id]`.

Detalhes lê o identificador com `useLocalSearchParams` e encontra os dados usando `find`. Nenhum objeto completo é transportado pela navegação. A tela também trata servidor inexistente e entrada direta sem histórico.

Agendar usa Valorosos/Valorant como servidor fixo de demonstração, sem construir o modal excluído. O botão apresenta somente uma mensagem local, sem criar ou salvar partidas.

## Seleção de categorias em Agendar — implementada

1. A tela mantém o identificador da categoria escolhida em `useState`.
2. Cada cartão recebe os dados da categoria, se está selecionado e uma função de seleção.
3. O toque chama essa função e atualiza o estado na tela.
4. A nova renderização aplica o destaque apenas à categoria escolhida.

Guardar um único identificador garante uma seleção por vez. A tela é a dona do estado porque o formulário precisa dessa informação; os cartões comunicam eventos por callbacks.

A implementação começa com categoria `null` e servidor já selecionado. Isso permite demonstrar o estado sem destaque e depois selecionar Ranqueada, como nas referências, usando a mesma rota. Tocar novamente mantém a seleção; não há lógica de filtro nesta tela.

Dia, mês, hora, minuto e descrição usam estado local e `TextInput` controlado. Os campos numéricos aceitam até dois dígitos e a descrição tem limite de 100 caracteres. `KeyboardAvoidingView` e `ScrollView` tratam espaço e teclado, ainda sujeitos a conferência em aparelho. Não há biblioteca de formulários, estado global, validação de calendário ou persistência.

## Ordem de trabalho

1. Login — implementado; revisão visual manual pendente.
2. Home — implementada com dados locais, saudação, categorias, partidas e filtro; revisão visual manual pendente.
3. Detalhes do servidor — implementado: informações, banner, jogadores e ações; revisão visual manual pendente.
4. Agendar — implementado: servidor fixo, categoria, campos, ajuste de teclado e simulação; testes em aparelho pendentes.
5. Revisão do fluxo completo e comparação visual com as referências.

Em cada etapa, revisar os assets necessários e validar o código antes de avançar. Configuração de ESLint, autenticação real, persistência, modal de servidores e modal de saída não fazem parte da etapa atual.

A documentação deve acompanhar cada etapa: atualizar o índice, o plano, a explicação da tela, os resultados de validação e o histórico. Manter os testes manuais pendentes enquanto não forem executados.
