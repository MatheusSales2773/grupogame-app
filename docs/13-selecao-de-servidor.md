# Seleção de servidor em Agendar

[Voltar ao índice](./README.md)

## O que mudou

O usuário incluiu a lista de servidores no escopo após a implementação das quatro telas. A referência é `referencias/tela-05-selecione-servidor.png`. O bloco que mostrava Valorosos fixo agora começa com **Selecione um servidor** e abre um painel sobre Agendar. Escolher um grupo fecha o painel e exibe nome, jogo e imagem no formulário, como na tela seis. Tocar novamente permite trocar.

Não existe uma nova rota: o `Modal` aparece sobre a mesma tela. Assim, os campos e a categoria continuam nos estados de Agendar. Voltar no Android com o modal aberto fecha apenas a lista. Tocar no fundo escuro ou na área do traço superior também fecha, sem alterar a seleção.

## Arquivos e decisões

| Arquivo | Responsabilidade |
| --- | --- |
| [agendar.tsx](../src/app/agendar.tsx) | Bloco clicável, estado da seleção e funções de abrir, escolher e fechar |
| [server-select-modal.tsx](../src/components/server-select-modal.tsx) | Painel inferior, lista rolável, linhas e estilos |
| [servers.ts](../src/data/servers.ts) | Dados existentes acrescidos de `game`, `image` e `isAdmin` |

O modal foi separado porque organiza uma lista e seus estilos sem aumentar o JSX do formulário. Não foi criado um componente genérico de modal nem um componente para cada linha. Os seis servidores já existentes foram reaproveitados; não houve mudança do conteúdo de Detalhes ou da Home. `isAdmin` representa apenas o papel fictício no grupo, independentemente de ser anfitrião de uma partida. Nenhuma biblioteca foi instalada.

## Estado, props e callbacks

```tsx
const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
const [showServerSelect, setShowServerSelect] = useState(false);
const selectedServer = servers.find((server) => server.id === selectedServerId);
```

`null` significa que nenhum servidor foi escolhido. Guardamos somente o ID; nome, imagem e jogo vêm do array local por `find`. Não duplicamos o objeto inteiro no estado.

1. O `onPress` do bloco chama `handleOpenServers`, que fecha o teclado e muda a visibilidade para `true`.
2. O modal recebe `visible`, `selectedServerId`, `onSelect` e `onClose` por props.
3. Cada linha chama `onSelect(item.id)`. Esse callback pertence à tela: muda o ID e fecha o modal.
4. O React renderiza novamente o bloco com os dados do servidor escolhido.

`visible` controla a exibição; `selectedServerId` informa a seleção à acessibilidade; `onSelect` comunica a escolha; `onClose` cancela sem alterar os campos. O modal não tem `useState` próprio. Fechar e reabrir a lista preserva a escolha. Sair de Agendar e desmontar a rota descarta os estados; não existe persistência.

## Lista, JSX e estilos

`FlatList` recebe `data={servers}`, usa `keyExtractor` com IDs únicos e cria cada linha em `renderItem`. `extraData={selectedServerId}` permite atualizar a indicação de seleção para leitores de tela quando o ID muda. Cada linha é um `Pressable` com `Image`, textos de nome/papel e seta de `SymbolView`, já disponível no projeto.

`Modal` usa fundo transparente e animação de subida. `onRequestClose` trata o voltar do Android. Um fundo escuro e `justifyContent: 'flex-end'` posicionam o painel na base. O painel ocupa 88% da altura disponível, com largura máxima de 600, e usa área segura nas laterais e na base. A lista rola para alcançar todos os grupos.

As linhas usam `flexDirection: 'row'`, `alignItems: 'center'` e `gap`; a área dos textos usa `flex: 1` para ocupar o espaço entre imagem e seta. As bordas começam após a imagem, como na referência. As fontes, cores e cantos arredondados seguem o aplicativo. O traço superior fecha por toque; não foi implementado gesto de arrastar o painel.

## Limites e teste manual

Os seis grupos são dados simulados do projeto. Alguns nomes, ordem e imagens diferem da referência; por exemplo, Valorosos usa o logo local de Valorant em vez da capa com personagens. Não há Discord, consulta de servidores reais, permissões reais ou salvamento do agendamento.

- [ ] Abrir Agendar: deve aparecer “Selecione um servidor”.
- [ ] Tocar abaixo das categorias e conferir o painel e a rolagem.
- [ ] Escolher Valorosos: painel fecha e o bloco mostra Valorosos / Valorant.
- [ ] Reabrir e trocar de grupo; somente a última escolha aparece no formulário.
- [ ] Fechar pelo fundo, pelo traço superior e pelo voltar do Android, sem perder a escolha.
- [ ] Preencher campos e categoria, abrir a lista e verificar que esses valores permanecem.
- [ ] Abrir com teclado visível: ele deve fechar antes da escolha.
- [ ] Conferir tela pequena, texto ampliado e retorno à Home.

## Para explicar ao professor

“A tela guarda o ID do servidor e se a lista está aberta. Ao tocar no bloco, abro um Modal com FlatList. Cada linha recebe dados locais e envia seu ID por callback. A tela atualiza o estado e fecha a lista; o React mostra a nova escolha. O formulário continua montado, por isso seus campos não são apagados.”

Conceitos: estado local, props, callbacks, renderização condicional, `find`, chaves de lista, `Pressable`, `Modal`, `FlatList`, Flexbox e acessibilidade.

Referências técnicas: [Modal no React Native 0.86](https://reactnative.dev/docs/0.86/modal), [FlatList](https://reactnative.dev/docs/0.86/flatlist) e [Symbols no Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/symbols/). Resultados dos comandos em [Validação](./05-execucao-e-validacao.md).
