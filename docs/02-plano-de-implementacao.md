# Plano de implementação

[Voltar ao índice](./README.md)

## Escopo aprovado

As telas solicitadas são Login, Home, Detalhes do servidor e Agendar com servidor selecionado. Agendar deve permitir trocar a categoria e refletir a mudança na interface. O modal da lista de servidores não deve ser desenvolvido.

Após a análise, foi decidido implementar uma tela por vez. Login e Home já foram implementados em etapas separadas. Detalhes do servidor é a próxima tela planejada, mas sua implementação ainda não foi solicitada.

## Decisões e motivos

| Decisão | Por quê | Conceito |
| --- | --- | --- |
| Manter Expo, React Native e TypeScript | Aproveitar a base e evitar migração | Componentes nativos e tipagem |
| Usar Expo Router | Já está configurado e faz parte das regras do projeto | Rotas por arquivos e navegação em pilha |
| Usar StyleSheet e Flexbox | Solução existente, simples e explicável | Objetos de estilo e distribuição de espaço |
| Manter estilos próximos da tela inicialmente | Facilitar leitura e apresentação | Organização por responsabilidade |
| Não criar componentes genéricos antecipadamente | Evitar abstrações sem uso real | Extração orientada à reutilização |
| Usar dados de demonstração na Home | Construir a interface sem integração externa | Dados locais e props |
| Manter ações de Agendar e Detalhes desativadas por enquanto | Preparar a integração sem abrir rotas inexistentes | Props opcionais e estado de acessibilidade |

A proposta inicial listava vários componentes possíveis. Essa lista é um conjunto de candidatos, não uma obrigação de criar todos. Nenhum componente genérico foi extraído na etapa de Login.

Na Home foram criados `CategoryCard` e `AppointmentCard`, pois os cartões se repetem nas listas. A rota vazia de Home existiu apenas durante a primeira etapa e já foi substituída pela interface.

## Possíveis componentes futuros

| Candidato | Quando faria sentido |
| --- | --- |
| Botão de ação | Quando outra tela utilizar o mesmo padrão do Login |
| Cabeçalho | Para compartilhar voltar e título em Detalhes e Agendar |
| Cartão/seletor de categorias | `CategoryCard` já existe na Home; avaliar sua reutilização em Agendar |
| Item de partida | `AppointmentCard` já existe e organiza os itens da Home |
| Item de jogador | Para organizar a lista de jogadores em Detalhes |
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
    agendar.tsx            # Futuro
    servidor/
      [id].tsx             # Futuro
  components/
    category-card.tsx      # Existente
    appointment-card.tsx   # Existente
    ...                    # Demais componentes do template
  constants/
    theme.ts
  data/
    home.ts                # Dados e tipos atuais
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

O primeiro trecho já está configurado com `router.replace('/home')`. Os demais ainda não existem.

O botão `+` está desativado e possui indicação do futuro ponto de navegação. `AppointmentCard` aceita um callback opcional com `serverId`; a Home ainda não o fornece. Nenhuma rota de Agendar ou Detalhes foi criada.

Para Detalhes, a proposta é passar o identificador do servidor na rota e ler com `useLocalSearchParams`. O identificador permite localizar os dados sem transportar objetos completos pela navegação.

Para Agendar, a proposta é usar um servidor de demonstração predefinido, como Valorosos, reproduzindo a referência sem construir o modal excluído.

## Seleção de categorias em Agendar — ainda não implementada

1. A tela manterá o identificador da categoria escolhida em `useState`.
2. Cada cartão receberá os dados da categoria, se está selecionado e uma função de seleção.
3. O toque chamará essa função e atualizará o estado na tela.
4. A nova renderização aplicará o destaque apenas à categoria escolhida.

Guardar um único identificador garante uma seleção por vez. A tela será a dona do estado porque o formulário precisa dessa informação; os cartões comunicarão eventos por callbacks.

A proposta para a versão com servidor selecionado é iniciar em Ranqueada, conforme a referência. O estado vazio pode representar a imagem sem seleção, sem exigir outra rota.

Os campos de data, horário e descrição também poderão usar estado local. A descrição terá limite de 100 caracteres. Teclado e rolagem devem ser conferidos em aparelhos. Não há necessidade identificada de biblioteca de formulários ou gerenciamento global de estado.

## Ordem de trabalho

1. Login — implementado; revisão visual manual pendente.
2. Home — implementada com dados locais, saudação, categorias, partidas e filtro; revisão visual manual pendente.
3. Detalhes do servidor — pendente: informações, banner e lista de jogadores.
4. Agendar — pendente: servidor selecionado, categoria, campos e comportamento do teclado.
5. Revisão do fluxo completo e comparação visual com as referências.

Em cada etapa, revisar os assets necessários e validar o código antes de avançar. Configuração de ESLint, autenticação real, persistência, modal de servidores e modal de saída não fazem parte da etapa atual.

A documentação deve acompanhar cada etapa: atualizar o índice, o plano, a explicação da tela, os resultados de validação e o histórico. Manter os testes manuais pendentes enquanto não forem executados.
