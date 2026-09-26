# Guia para apresentação

[Voltar ao índice](./README.md)

## Roteiro sugerido

1. **Contexto:** “Este é um aplicativo acadêmico para organizar partidas. As quatro telas estão implementadas com dados simulados e estado local.”
2. **Referências:** mostrar `referencias/tela-01-login.png`, `referencias/tela-02-home.png` e `referencias/tela-2.1-home.png`; explicar que textos, botões e listas são componentes reais.
3. **Estrutura:** abrir `src/app/index.tsx`, `_layout.tsx` e `home.tsx`.
4. **JSX:** percorrer a árvore da tela, da área segura até o botão.
5. **Estilos:** mostrar o Flexbox do contêiner e a linha formada por ícone e legenda.
6. **Interação:** mostrar `onPress={handleSignIn}` e `router.replace('/home')`.
7. **Home:** mostrar os dados em `src/data/home.ts`, os cartões reutilizados e as duas listas.
8. **Estado:** explicar a seleção de categoria, o filtro das partidas e o total calculado.
9. **Detalhes:** tocar em uma partida, explicar o ID na rota, os dados locais, a lista de jogadores e o retorno com `back`.
10. **Agendar:** abrir pelo `+`, trocar a categoria e preencher dia, mês, hora, minuto e descrição. Explicar que as quatro referências são estados de uma rota.
11. **Servidor e limites:** tocar no bloco abaixo das categorias abre a lista; escolher um grupo atualiza seu ID no estado e fecha o modal. Entrada na partida e agendamento são simulados; nada é salvo. Algumas imagens diferem do protótipo.

Antes de apresentar, executar o roteiro manual de [validação](./05-execucao-e-validacao.md). Não afirmar que houve teste em aparelho se essa etapa ainda não tiver sido feita.

## Ordem de leitura do código comentado

Os 13 arquivos abaixo receberam comentários em português sobre a implementação do trabalho. Leia primeiro o estado e as funções, depois o JSX e, por último, o `StyleSheet`. Os comentários explicam as decisões; não são instruções executadas pelo aplicativo. Arquivos antigos do template que não participam dessas telas foram preservados.

| Ordem | Arquivos | O que você deve conseguir explicar |
| --- | --- | --- |
| 1 | [_layout.tsx](../src/app/_layout.tsx) | Fontes, `useEffect`, abertura do aplicativo e navegação em pilha |
| 2 | [index.tsx](../src/app/index.tsx) | JSX, imagens locais, `onPress`, `replace`, área segura e Flexbox |
| 3 | [data/home.ts](../src/data/home.ts) e [data/servers.ts](../src/data/servers.ts) | Tipos, arrays locais, IDs e relacionamento entre dados |
| 4 | [home.tsx](../src/app/home.tsx) | `useState`, filtro, valores derivados, listas e navegação |
| 5 | [category-card.tsx](../src/components/category-card.tsx) e [appointment-card.tsx](../src/components/appointment-card.tsx) | Props, callbacks, estilos condicionais e reutilização |
| 6 | [servidor/[id].tsx](../src/app/servidor/[id].tsx), [screen-header.tsx](../src/components/screen-header.tsx) e [player-item.tsx](../src/components/player-item.tsx) | Parâmetro de rota, `find`, retorno, props opcionais e jogadores |
| 7 | [agendar.tsx](../src/app/agendar.tsx) | Seleção única, inputs controlados, teclado e rolagem |
| 8 | [server-select-modal.tsx](../src/components/server-select-modal.tsx) e [sign-out-modal.tsx](../src/components/sign-out-modal.tsx) | Modais controlados pela tela, seleção, cancelamento e confirmação |

Para verificar se entendeu, siga uma ação inteira: toque na categoria → callback → setter → nova renderização → estilo atualizado. Faça o mesmo com a escolha do servidor. Identifique o que vem de props, o que está em estado e o que é calculado a partir deles.

## Perguntas frequentes

### O que é um componente?

É uma unidade da interface. `LoginScreen` é uma função que retorna JSX; ela combina componentes menores, como `View`, `Text` e `Pressable`.

### Por que não criou um componente genérico de botão?

O botão com ícone Discord agora aparece no Login e em Detalhes, com ações diferentes. O asset é reutilizado, mas nesta etapa o código do Login foi preservado. Uma extração pequena pode ser avaliada depois; não foi criada uma API genérica com várias opções antecipadas.

### O que é JSX?

É a sintaxe que descreve os elementos da interface dentro do código. As tags representam componentes; as chaves permitem usar expressões JavaScript.

### Qual a diferença entre props e state?

Props são informações recebidas pelo componente, como `source` e `onPress`. State guarda valores que podem mudar e provocar nova renderização. O Login não precisa de estado próprio com `useState`; na Home, esse hook guarda a categoria selecionada. Em Detalhes, guarda a mensagem de simulação ou indisponibilidade do compartilhamento.

### De onde vem pressed?

O próprio `Pressable` fornece essa informação à função de estilo. Ela reduz a opacidade enquanto o botão está pressionado.

### Por que onPress recebe a função sem parênteses?

Porque o botão deve chamar a função no momento do toque. Com parênteses, ela seria executada durante a renderização.

### O botão realmente entra no Discord?

Não. Ele apenas navega para `/home`. Não há solicitação de credenciais, chamada de autenticação, token ou acesso à conta.

### Por que usar replace?

Para substituir o Login no histórico ao entrar. `push` adicionaria outra tela mantendo a anterior. Isso controla a navegação, não protege rotas nem autentica usuários.

### A Home ainda fica vazia?

Não. Isso aconteceu apenas na primeira etapa, quando a rota retornava `null`. A segunda etapa implementou saudação, categorias, partidas e filtro local, preservando o Login.

### Por que foram criados CategoryCard e AppointmentCard?

Porque cada lista repete o mesmo formato para vários dados. As props permitem reutilizar o visual sem copiar todo o JSX para cada item.

### Como funcionam as listas da Home?

A `FlatList` vertical exibe partidas; a horizontal exibe categorias. `data` fornece os objetos, `renderItem` cria cada cartão e `keyExtractor` usa um identificador estável. O cabeçalho da lista vertical contém a saudação e as categorias.

### Como funciona o filtro de categorias?

A Home guarda `selectedCategoryId` em `useState`. `null` mostra todas as partidas; um identificador filtra com `filter`. Tocar na categoria já selecionada remove o filtro. Lista e total são calculados a partir desse estado, sem manter cópias em outros estados.

### Como os cartões e o + navegam?

`AppointmentCard` comunica o `serverId` à Home pelo callback. A Home chama `router.navigate` para `/servidor/[id]`. Detalhes lê o ID com `useLocalSearchParams` e procura o servidor com `find`. O objeto inteiro não é colocado na URL. O `+` chama `router.navigate('/agendar')` sem parâmetros; nessa tela o servidor é escolhido pelo modal e seu ID fica no estado local. Veja [Seleção de servidor](./13-selecao-de-servidor.md).

### Como Agendar garante somente uma categoria selecionada?

Guarda um único ID em `useState`, inicialmente `null`. Cada cartão recebe `selected={selectedCategoryId === category.id}`. O callback substitui o ID pelo tocado; na nova renderização somente um cartão recebe o estilo selecionado. A Home usa o mesmo componente, mas fornece outro callback, que permite remover o filtro.

### O que significa um campo controlado?

O texto vem do estado por `value`, e `onChangeText` atualiza esse estado. Os campos numéricos são strings para preservar vazio e zeros à esquerda. `keyboardType="number-pad"` solicita teclado numérico, a expressão regular remove outros caracteres e `maxLength={2}` limita o tamanho. Isso não valida uma data real.

### Como a descrição e o teclado são tratados?

A descrição usa `multiline` e `maxLength={100}`. `KeyboardAvoidingView` ajusta o espaço quando o teclado abre; `ScrollView` permite alcançar campos e botão. O comportamento precisa ser conferido em Android e iOS. Agendar dispensa o teclado e mostra uma mensagem local, sem salvar dados.

### A função fecharTeclado faz a tela subir?

Não. Quem ajusta o espaço é `KeyboardAvoidingView`, agora com `behavior="padding"` como no `exemplo.js`. `fecharTeclado` chama `Keyboard.dismiss()` para fechar o teclado e remover o foco, sem apagar o estado dos campos. `TouchableWithoutFeedback` liga essa função ao toque no espaço livre. A explicação completa está em [Teclado e rolagem](./12-teclado-e-rolagem.md).

### Por que abrir Detalhes e Agendar com navigate?

Para abrir o destino mantendo a Home na pilha e reutilizar a tela quando ela já estiver ativa. Na revisão, o teste isolado da pilha mostrou que dois `push` criavam duas telas; dois `navigate` mantiveram somente uma. O cabeçalho recebe `onBack` como prop e não conhece os endereços. Se não houver histórico, a tela usa `/home` como destino de retorno. O teste da pilha não substitui o teste de toque no aparelho.

### O status dos jogadores muda em tempo real?

Não. Os jogadores são dados locais e seus status são fixos. `PlayerItem` calcula rótulo e cor pela prop recebida; não precisa de estado próprio. A lista usa `FlatList` e calcula o total pelo tamanho do array.

### O que faz Entrar na partida?

Atualiza uma mensagem em `useState` explicando que a entrada é simulada. Não conecta ao Discord nem altera jogadores. Compartilhar usa a opção do sistema para nome e descrição; não cria um convite real.

### O que faz o arquivo _layout.tsx?

Carrega fontes e configura a estrutura comum das rotas: Stack, fundo e barra de status. Também controla quando liberar a splash.

### Por que carregar fontes antes de mostrar a interface?

Para reduzir a troca visível entre a fonte padrão e a fonte escolhida. `useFonts` informa quando o carregamento termina; `useEffect` libera a splash.

### Qual a diferença entre margin e padding?

`margin` cria espaço externo ao elemento. `padding` cria espaço interno, entre o limite do elemento e seu conteúdo.

### Como o Flexbox aparece nas telas?

No Login, o conjunto usa coluna e centralização. O botão usa `flexDirection: 'row'` para posicionar ícone e texto lado a lado. Na Home, o cabeçalho e as partidas também usam linha; saudação e detalhes usam `flex: 1` para ocupar o espaço restante. Os metadados podem quebrar de linha com `flexWrap`.

### Por que a imagem não fica deformada?

`aspectRatio` preserva a proporção do espaço da ilustração. `contentFit="contain"` mantém a imagem inteira dentro desse espaço.

### Por que usar ScrollView, FlatList e SafeAreaView?

A `ScrollView` do Login permite rolar se faltar altura. A Home usa `FlatList` para os itens repetidos e o cabeçalho. A `SafeAreaView` protege o conteúdo das áreas ocupadas pelo sistema em ambas as telas. Esses recursos não dispensam testes em diferentes aparelhos.

### Por que os arquivos são TypeScript se há poucas anotações de tipo?

O TypeScript consegue inferir muitos tipos, e os componentes das bibliotecas já possuem suas próprias definições. As verificações continuam funcionando sem anotar cada variável manualmente.

### De onde vieram as imagens e fontes?

Os assets do Login e os ícones da Home vieram do projeto educacional original. As fontes vieram do Google Fonts. A Home também utiliza capas e avatar de demonstração de outras fontes públicas; alguns diferem da referência. As origens estão registradas em `assets/README.md`, e as licenças das fontes acompanham seus arquivos. Os recursos são locais.

### O que foi testado?

Passaram a checagem de TypeScript e a exportação de bundles para Android, iOS e web. Isso não equivale a instalar o aplicativo, testar o clique ou comparar o visual em um aparelho. Esses testes manuais ainda estavam pendentes no registro da implementação.

## Arquivos mais importantes para estudar

- [Login](../src/app/index.tsx): função do botão, árvore JSX e objetos de estilo.
- [Layout](../src/app/_layout.tsx): `useFonts`, `useEffect`, splash, Fragment e Stack.
- [Home](../src/app/home.tsx): `useState`, filtro, listas e total calculado.
- [Dados locais](../src/data/home.ts): tipos, identificadores e objetos simulados.
- [Cartão de categoria](../src/components/category-card.tsx) e [cartão de partida](../src/components/appointment-card.tsx): props, callback e estilos condicionais.
- [Detalhes](../src/app/servidor/[id].tsx): parâmetro, `find`, `FlatList`, feedback e retorno.
- [Servidores](../src/data/servers.ts), [jogador](../src/components/player-item.tsx) e [cabeçalho](../src/components/screen-header.tsx): dados, props e responsabilidades.
- [Explicação completa de Detalhes](./08-detalhes-do-servidor.md): decisões e roteiro manual.
- [Agendar](../src/app/agendar.tsx) e [explicação da tela](./09-tela-agendar.md): seleção única, campos controlados, teclado, rolagem e limites da simulação.
- [Revisão final](./10-revisao-final.md): correções, diferenças visuais, evidências e testes ainda pendentes.
- [Plano](./02-plano-de-implementacao.md): decisões das quatro telas e revisão manual ainda pendente.
