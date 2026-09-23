# Detalhes do servidor

[Voltar ao índice](./README.md)

## Escopo e resultado

A terceira tela usa [tela-2.1-home.png](../referencias/tela-2.1-home.png) como referência. Exibe cabeçalho com voltar e compartilhar, banner, nome, descrição, jogadores e o botão **Entrar na partida**. Os cards da Home abrem o servidor correspondente. Na etapa seguinte, [Agendar](./09-tela-agendar.md) foi implementado e conectado ao `+`, preservando o código de Detalhes.

O Login, o layout de navegação, o filtro da Home, seus estilos, os componentes de cartões e as dependências foram preservados. Nenhuma biblioteca foi instalada. O botão principal mostra uma mensagem de simulação; não autentica, não abre Discord e não registra presença real.

## Arquivos da implementação

| Arquivo | Alteração e motivo |
| --- | --- |
| [servidor/[id].tsx](../src/app/servidor/[id].tsx) | Nova rota; encontra o servidor, compõe a tela e trata as ações |
| [data/servers.ts](../src/data/servers.ts) | Tipos e dados locais dos seis servidores e três jogadores |
| [screen-header.tsx](../src/components/screen-header.tsx) | Organiza título e ações; usado na tela válida e no estado de servidor inexistente |
| [player-item.tsx](../src/components/player-item.tsx) | Reutilizado em cada linha de jogador |
| [home.tsx](../src/app/home.tsx) | Importa `router`, cria `handleOpenServer` e passa o callback aos cards |
| [banner.png](../assets/images/servers/banner.png) | Banner original de Lendários, armazenado localmente |
| [assets/README.md](../assets/README.md) | Registra origem do banner e diferenças nos avatares |

Também foram atualizados o índice, a análise, o plano, o guia de apresentação, a validação, a explicação da Home e o histórico em `docs/`. No documento de Login, somente a indicação das telas pendentes foi atualizada; o código do Login foi preservado.

## Dados locais e identificação

Cada `Server` possui `id`, `name`, `description`, `banner` e `players`. Os seis identificadores correspondem aos `serverId` das partidas da Home. O grupo de três jogadores é compartilhado pelos registros apenas como demonstração; nenhuma informação é consultada em uma API.

`Player` possui `id`, `name`, `initials`, `avatar` opcional e `status`. O tipo de status aceita somente `'available'` ou `'busy'`. Esses valores são dados fixos, não representam presença online real.

Lendários reproduz nome, descrição e banner da referência. Os outros servidores usam capas já existentes e descrições fictícias, pois não há uma referência individual para cada um. O avatar de Tiago é reutilizado da Home; Rodrigo e Diego aparecem com iniciais porque suas fotos exatas não estão disponíveis localmente. Essa diferença visual deve ser informada na apresentação.

## Navegação Home → Detalhes

O fluxo do toque é:

1. O usuário toca no `Pressable` do `AppointmentCard`.
2. O card chama `onPress?.(appointment.serverId)`.
3. A Home recebe esse texto em `handleOpenServer`.
4. `router.navigate` abre Detalhes, preservando a Home para o retorno e reutilizando o destino se ele já estiver ativo.

```tsx
router.navigate({ pathname: '/servidor/[id]', params: { id: serverId } });
```

Para Lendários, a URL resultante é `/servidor/lendarios`. `[id]` é um segmento dinâmico: o mesmo arquivo atende vários identificadores. Nenhum objeto completo é colocado nos parâmetros.

Na tela de destino:

```tsx
const { id } = useLocalSearchParams<{ id?: string | string[] }>();
const server = servers.find((item) => item.id === id);
```

`useLocalSearchParams` lê o valor da rota atual. `find` procura o objeto correspondente nos dados locais. Se o identificador estiver ausente, for inválido ou não corresponder a um servidor, a tela mostra **Servidor não encontrado**, com o botão voltar. A tipagem não substitui essa verificação em execução.

O botão voltar usa `router.back()` quando existe histórico. Ao entrar diretamente na rota sem tela anterior, usa `router.replace('/home')` como destino seguro. O Login continua usando `replace('/home')`, com seu comportamento anterior.

O projeto já usa exportação web estática. `generateStaticParams` retorna os seis IDs para o Expo gerar seus endereços na exportação. Não é necessário registrar cada servidor no `_layout.tsx`: o Expo Router descobre a rota pelo arquivo. Um endereço desconhecido no site estático também pode ser encaminhado à página de rota não encontrada, dependendo da hospedagem.

## Componentes e props

| Componente | Props | Responsabilidade |
| --- | --- | --- |
| `ScreenHeader` | `title: string`, `onBack: () => void`, `onShare?: () => void` | Exibe o título e comunica os toques; não conhece o Router |
| `PlayerItem` | `player: Player` | Renderiza nome, avatar/iniciais, cor e rótulo de status |
| `AppointmentCard` existente | `appointment`, `categoryLabel`, `onPress` | Continua exibindo a partida; agora recebe a função de navegação |

`onShare` é opcional. Sem essa prop, um espaço da mesma largura mantém o título centralizado. O cabeçalho fica separado porque organiza duas ações e é usado também no estado de erro; não foram criadas configurações genéricas de navegação.

`PlayerItem` não precisa de estado: o booleano `available` é calculado a partir da prop. Se não houver `avatar`, uma renderização condicional mostra as iniciais. Os rótulos Disponível/Ocupado permitem entender o status sem depender apenas das cores.

As props das bibliotecas também têm funções concretas: `source` indica a imagem, `contentFit="cover"` preenche sua área com recorte proporcional, `style` recebe os estilos e `accessibilityLabel` descreve botões para leitores de tela. `SymbolView`, do `expo-symbols` já instalado, recebe nomes correspondentes aos ícones de cada plataforma.

## JSX e lista de jogadores

A árvore principal é `SafeAreaView` → `View` → cabeçalho, `FlatList` e rodapé. `View` organiza os blocos; `Text` exibe textos; `Image` exibe recursos locais; `Pressable` reconhece o toque. As chaves do JSX inserem valores, como `{server.name}`, e condições, como a presença de uma mensagem.

A `FlatList` recebe `data={server.players}`. `renderItem` cria um `PlayerItem` para cada objeto e `keyExtractor` retorna seu `id` estável. `ListHeaderComponent` contém banner e título Jogadores, para acompanharem a rolagem em telas baixas. `ListEmptyComponent` cobre uma eventual lista vazia. O total é calculado com `server.players.length`.

O cabeçalho de navegação e o botão principal ficam fora da lista. Não há uma `ScrollView` vertical envolvendo outra lista vertical. Isso mantém uma única área de rolagem para o conteúdo.

## onPress, estado e compartilhamento

`onPress={handleJoin}` passa uma função, sem executá-la durante a renderização. O `Pressable` chama essa função no toque. Seu parâmetro `pressed` controla uma redução de opacidade enquanto o botão está pressionado; não é um `useState` criado pela tela.

```tsx
const [feedback, setFeedback] = useState<{
  serverId: string;
  message: string;
} | null>(null);
```

`null` significa que nenhuma mensagem está visível. O toque em **Entrar na partida** chama `setFeedback` com uma explicação de que a entrada foi simulada. O React renderiza novamente e mostra esse texto acima do botão. O ID junto da mensagem impede que uma mensagem de um servidor apareça em outro se o parâmetro mudar na mesma tela. Não há persistência ou alteração na lista de jogadores.

O ícone de compartilhar, presente no protótipo, chama `Share.share` com nome e descrição do servidor. A pessoa escolhe o destino no sistema; o aplicativo não envia nada automaticamente nem inventa um convite do Discord. `try/catch` trata indisponibilidade, inclusive em navegadores sem compartilhamento, usando o mesmo estado de mensagem. Cancelamentos identificados como `AbortError` não geram erro visível.

## StyleSheet e Flexbox

Os estilos permanecem no fim de cada arquivo com `StyleSheet.create`, facilitando relacionar o JSX à aparência. Foram reutilizadas as fontes RajdhaniBold e Inter e as cores já presentes no aplicativo.

- `flex: 1` faz tela, contêiner e lista ocuparem o espaço disponível; o rodapé mantém sua altura de conteúdo.
- `width: '100%'`, `maxWidth: 600` e `alignSelf: 'center'` limitam a expansão em telas largas.
- O cabeçalho usa `flexDirection: 'row'`. Ações de mesma largura e título com `flex: 1` mantêm o alinhamento central.
- O banner tem altura mínima de 234. A imagem usa `StyleSheet.absoluteFill` para preencher seu fundo; o texto permanece no fluxo, permitindo aumentar a altura quando necessário.
- `justifyContent: 'flex-end'` posiciona o texto na parte inferior do banner. Um fundo semitransparente melhora o contraste da descrição sobre as capas.
- Jogadores usam uma linha com avatar de 48 × 48, `gap: 16` e detalhes com `flex: 1`. A divisória fina fica abaixo dos detalhes.
- A seção Jogadores usa `justifyContent: 'space-between'` para separar título e total.
- O botão usa linha, ícone de largura 56 e texto flexível. `minHeight`, padding e quebra de linha acomodam conteúdo maior.
- `SafeAreaView` respeita as áreas ocupadas pelo sistema; a barra de status continua controlada pelo layout existente.

Não foi extraído um botão genérico nesta etapa: foi reutilizado o asset Discord e preservado o código do Login. Essa extração poderá ser avaliada se outras telas repetirem o mesmo comportamento.

## O que saber explicar ao professor

1. A diferença entre `navigate`, `push`, `back` e `replace` na pilha de navegação; por que a revisão adotou `navigate` na Home.
2. Por que a rota transporta apenas um ID e como `find` recupera o servidor.
3. Como props e callbacks conectam Home, card, cabeçalho e jogadores.
4. Como `FlatList` usa dados, renderização e chaves estáveis.
5. Por que status e total são calculados, enquanto a mensagem usa `useState`.
6. Como renderização condicional trata fotos ausentes, mensagens e IDs inválidos.
7. Como Flexbox distribui cabeçalho, lista, linhas e rodapé.
8. Quais dados e ações são simulados e quais diferenças visuais ainda existem.

## Roteiro manual pendente

- [ ] Abrir cada uma das seis partidas e conferir o servidor correspondente.
- [ ] Abrir Lendários e comparar banner, texto, lista e botão com a referência.
- [ ] Voltar para a Home e conferir que o filtro selecionado foi preservado.
- [ ] Entrar diretamente em `/servidor/lendarios` e verificar o retorno sem histórico.
- [ ] Testar um identificador inexistente e o comportamento da hospedagem web.
- [ ] Tocar em Entrar na partida e ler a mensagem de simulação.
- [ ] Abrir e cancelar o compartilhamento; verificar a mensagem onde o recurso não existe.
- [ ] Conferir rolagem, áreas seguras e botão em tela baixa e com texto ampliado.
- [ ] Confirmar que o Login permanece igual e que a navegação para Agendar pelo `+` não interfere no fluxo de Detalhes.

Os resultados dos comandos estão em [Execução e validação](./05-execucao-e-validacao.md). Compilação não substitui estes testes.

Referências técnicas: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/), [parâmetros do Router](https://docs.expo.dev/router/reference/url-parameters/), [navegação](https://docs.expo.dev/router/basics/navigation/), [exportação estática](https://docs.expo.dev/router/web/static-rendering/), [Expo Symbols](https://docs.expo.dev/versions/v57.0.0/sdk/symbols/), [StyleSheet no RN 0.86](https://reactnative.dev/docs/0.86/stylesheet) e [Share](https://reactnative.dev/docs/0.86/share).
