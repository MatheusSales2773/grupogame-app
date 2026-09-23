# Tela Home explicada

[Voltar ao índice](./README.md)

## Escopo desta etapa

A Home substitui o destino vazio do Login, seguindo [tela-02-home.png](../referencias/tela-02-home.png). Exibe avatar, saudação, mensagem, botão `+`, categorias horizontais e partidas agendadas. O Login, seu layout de navegação, suas fontes e suas imagens não foram alterados.

Não foram implementados Detalhes, Agendar, autenticação, chamadas de API, persistência ou o modal da lista de servidores. Não foram instaladas dependências.

## Arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| [home.tsx](../src/app/home.tsx) | Compor a Home, manter o filtro e renderizar as listas |
| [data/home.ts](../src/data/home.ts) | Dados locais de usuário, categorias e partidas; tipos utilizados pelos componentes |
| [category-card.tsx](../src/components/category-card.tsx) | Exibir cada categoria e comunicar o toque |
| [appointment-card.tsx](../src/components/appointment-card.tsx) | Exibir cada partida e reservar um callback para detalhes |
| [assets/images/home](../assets/images/home) | Treze arquivos de imagens e ícones locais |
| [assets/README.md](../assets/README.md) | Origens e diferenças dos assets em relação à referência |
| [docs/README.md](./README.md) | Índice e situação atualizados |
| Este documento | Explicação da segunda tela |

Somente os dois tipos de cartões foram extraídos. Eles se repetem nas listas e deixam a tela mais legível. Não foram criados wrappers genéricos de texto, tela, cabeçalho ou botão. As fontes, o `expo-image`, o `SafeAreaView` e a rota `/home` existentes foram aproveitados.

## Dados locais e tipos

`user` contém nome, mensagem e avatar. `categories` contém quatro itens: Ranqueada, Duelo 1x1, Diversão e Treino. A quarta categoria foi identificada no arquivo de categorias do projeto educacional original; ela aparece apenas parcialmente na captura.

`appointments` contém seis partidas. Cada uma possui:

- `id`: identificador único da partida, usado pela lista.
- `serverId`: identificador reservado para a futura navegação ao servidor.
- `title`: nome exibido.
- `categoryId`: ligação com a categoria.
- `date` e `time`: textos de data e horário de demonstração.
- `isHost`: define se a pessoa é anfitriã ou visitante.
- `image`: imagem local.

Os tipos TypeScript descrevem o formato desses dados. `CategoryId` limita os valores aos quatro identificadores aceitos. `ImageSource | number` permite fontes de imagem compatíveis com `expo-image`, incluindo os recursos locais carregados com `require`.

Os dados não são eventos reais nem mudam com a data do aparelho. A sexta partida, “Exploradores”, é fictícia, pois não está visível na referência. Algumas capas e o avatar são alternativas; Valorant usa o logo em vez da arte do protótipo. Os nomes e datas visíveis das primeiras partidas seguem a captura.

## Props dos componentes

### CategoryCard

| Prop | Tipo | Uso |
| --- | --- | --- |
| `category` | `Category` | Nome e imagem do cartão |
| `selected` | `boolean` | Aplica a borda e o fundo selecionados |
| `onPress` | `() => void` | Comunica que o usuário tocou na categoria |

O cartão não possui estado próprio. Ele recebe a seleção da Home e chama uma função quando é tocado. O `Pressable` fornece `pressed`, utilizado para reduzir a opacidade enquanto o toque ocorre. `accessibilityState` informa a seleção aos leitores de tela.

### AppointmentCard

| Prop | Tipo | Uso |
| --- | --- | --- |
| `appointment` | `Appointment` | Dados da partida |
| `categoryLabel` | `string` | Nome da categoria para a linha da partida |
| `onPress` | `(serverId: string) => void`, opcional | Futuro evento para abrir Detalhes |

O `?` no tipo indica uma prop opcional. A Home ainda não envia `onPress`, então o cartão fica desativado. Quando essa função existir, o cartão passará `appointment.serverId` ao chamá-la. A chamada `onPress?.(...)` só executa a função se ela estiver definida.

`isHost` determina o texto Anfitrião/Visitante e a cor vermelha/verde. O ícone de pessoa recebe a mesma cor por `tintColor`. Não é necessário manter essas informações em estado: elas são calculadas a partir das props.

## Listas

A lista principal é uma `FlatList` vertical. Recebe:

- `data={visibleAppointments}`: partidas que devem aparecer.
- `keyExtractor`: retorna o `id` estável de cada item.
- `renderItem`: transforma cada objeto em um `AppointmentCard`.
- `ListHeaderComponent`: saudação, botão, categorias e título da seção.
- `ListEmptyComponent`: mensagem para uma lista sem resultados.

O cabeçalho faz parte da própria lista, de modo que a tela inteira pode rolar em dispositivos menores. Não existe uma `ScrollView` vertical envolvendo outra lista vertical.

As categorias usam uma segunda `FlatList`, com `horizontal`. Ela fica no cabeçalho da lista principal e rola em outro eixo. `extraData={selectedCategoryId}` informa que os cartões também dependem da seleção, além do array de categorias.

Os identificadores são usados como chaves para o React reconhecer os itens. O total exibido vem de `visibleAppointments.length`, evitando um número fixo que possa discordar da lista.

## useState e filtro

```tsx
const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
```

`null` representa ausência de filtro. A Home começa mostrando as seis partidas.

Ao tocar em uma categoria, `handleSelectCategory` atualiza o estado. Se ela já estava selecionada, o estado volta a `null`; caso contrário, passa a guardar o identificador tocado.

```tsx
setSelectedCategoryId((current) => current === categoryId ? null : categoryId);
```

A função recebe o valor anterior do estado. Essa forma deixa explícito que a próxima seleção depende da anterior.

O array visível é calculado com `filter`. Ele não é guardado em outro estado nem altera os dados originais. O fluxo é: toque → atualização do estado → nova renderização → estilo selecionado, lista e total atualizados.

Resultados esperados: Ranqueada mostra 2 partidas, Duelo 1x1 mostra 1, Diversão mostra 2 e Treino mostra 1. Tocar novamente na categoria ativa restaura as 6.

## StyleSheet e Flexbox

Cada componente mantém seu `StyleSheet.create` no próprio arquivo.

- A tela ocupa o espaço disponível com `flex: 1` e usa o mesmo fundo azul do Login.
- O contêiner tem largura de 100%, limite de 600 e centralização em telas largas.
- O cabeçalho usa `flexDirection: 'row'`: avatar, saudação e botão ficam lado a lado.
- A saudação usa `flex: 1` para ocupar o espaço entre avatar e botão.
- Categorias têm largura de 104 e altura mínima de 120, preservando o efeito de lista horizontal.
- Os cartões de partida usam linha, capa de 64 por 68 e detalhes com `flex: 1`.
- `justifyContent: 'space-between'` separa título/categoria e data/papel.
- `flexWrap: 'wrap'` permite que metadados quebrem de linha quando faltar largura.
- `gap`, margens e `padding` controlam os espaços. A divisória fica abaixo dos detalhes, como na referência.

O uso de alturas mínimas e quebra de linha favorece textos maiores sem esconder dados. O ajuste visual exato ainda exige conferência no aparelho. O fundo e os cartões usam cores sólidas; os próprios SVGs possuem os detalhes gráficos das categorias.

## Navegação preparada, ainda inativa

O Login continua usando `router.replace('/home')`; agora o destino contém a interface.

O `+` está desativado. Há um comentário no local indicando o futuro `router.push('/agendar')`, que só deverá ser conectado quando a rota existir.

Cada partida possui `serverId`, e `AppointmentCard` já aceita `onPress(serverId)`. A Home contém o ponto de integração comentado para a futura rota `/servidor/[id]`. Não foram criados arquivos vazios para Agendar ou Detalhes e não há navegação para endereços inexistentes.

As ações desativadas preservam o visual, mas também informam `disabled` na acessibilidade. Não há alertas ou modais temporários.

## O que explicar ao professor

1. Por que dados e interface estão separados.
2. Como props permitem reutilizar o mesmo cartão para vários itens.
3. Como `FlatList`, `data`, `renderItem` e `keyExtractor` trabalham juntos.
4. Por que o estado da seleção fica na Home e o cartão apenas comunica o toque.
5. Por que a lista filtrada e o total são calculados, sem duplicar estado.
6. Como `isHost` controla texto e cor sem um novo hook.
7. Como linha, coluna, `flex`, `gap` e quebra de linha organizam a interface.
8. Por que a navegação de futuras telas está desativada nesta etapa.

## Validação da implementação

- `tsc --noEmit --incremental false`: passou.
- Exportação Expo para Android, iOS e web: passou; saída em uma pasta temporária fora do repositório.
- Login (`index.tsx`), layout (`_layout.tsx`) e `package.json`: preservados nesta etapa.
- ESLint: não configurado nem executado, mantendo a orientação anterior.
- Verificação visual e testes de toque: pendentes, pois não havia navegador conectado disponível; a compilação não substitui testes em aparelho.

## Teste manual da Home

- [ ] Entrar pelo Login e verificar a saudação e as seis partidas.
- [ ] Rolar as categorias até Treino.
- [ ] Selecionar cada categoria e conferir os totais 2, 1, 2 e 1.
- [ ] Tocar novamente na seleção atual e conferir o retorno das seis partidas.
- [ ] Rolar a lista vertical até a última partida.
- [ ] Conferir os rótulos e cores de Anfitrião e Visitante.
- [ ] Conferir que `+` e partidas não tentam abrir telas ainda inexistentes.
- [ ] Conferir fontes, imagens, ícones, áreas seguras e textos em tela pequena.
- [ ] Conferir que o Login manteve sua aparência e seu comportamento.

Referências técnicas consultadas: [FlatList no React Native 0.86](https://reactnative.dev/docs/0.86/flatlist), [Expo Image no SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/image/) e [navegação do Expo Router](https://docs.expo.dev/router/basics/navigation/).
