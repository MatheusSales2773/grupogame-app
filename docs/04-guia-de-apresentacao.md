# Guia para apresentação

[Voltar ao índice](./README.md)

## Roteiro sugerido

1. **Contexto:** “Este é um aplicativo acadêmico para organizar partidas. Já foram implementadas as telas de Login e Home, com dados simulados.”
2. **Referência:** mostrar `referencias/tela-01-login.png` e explicar que textos e botão são componentes reais.
3. **Estrutura:** abrir `src/app/index.tsx`, `_layout.tsx` e `home.tsx`.
4. **JSX:** percorrer a árvore da tela, da área segura até o botão.
5. **Estilos:** mostrar o Flexbox do contêiner e a linha formada por ícone e legenda.
6. **Interação:** mostrar `onPress={handleSignIn}` e `router.replace('/home')`.
7. **Home:** mostrar os dados em `src/data/home.ts`, os cartões reutilizados e as duas listas.
8. **Estado:** explicar a seleção de categoria, o filtro das partidas e o total calculado.
9. **Limites:** explicar que o Discord é simulado e que Agendar e Detalhes ainda não existem; suas ações permanecem desativadas.

Antes de apresentar, executar o roteiro manual de [validação](./05-execucao-e-validacao.md). Não afirmar que houve teste em aparelho se essa etapa ainda não tiver sido feita.

## Perguntas e respostas

### O que é um componente?

É uma unidade da interface. `LoginScreen` é uma função que retorna JSX; ela combina componentes menores, como `View`, `Text` e `Pressable`.

### Por que não criou um componente genérico de botão?

Nesta etapa há apenas um botão desse tipo. Mantê-lo na tela facilita a leitura. A extração poderá ocorrer quando outra tela repetir o padrão ou quando melhorar claramente a organização.

### O que é JSX?

É a sintaxe que descreve os elementos da interface dentro do código. As tags representam componentes; as chaves permitem usar expressões JavaScript.

### Qual a diferença entre props e state?

Props são informações recebidas pelo componente, como `source` e `onPress`. State guarda valores que podem mudar e provocar nova renderização. O Login não precisa de estado próprio com `useState`.

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

### Por que o botão + e os cartões não navegam ainda?

As telas de destino não foram implementadas. O `+` está desativado; `AppointmentCard` aceita um callback opcional com `serverId`, que será fornecido pela Home quando Detalhes existir. Isso evita abrir uma rota inválida.

### O que faz o arquivo _layout.tsx?

Carrega fontes e configura a estrutura comum das rotas: Stack, fundo e barra de status. Também controla quando liberar a splash.

### Por que carregar fontes antes de mostrar a interface?

Para reduzir a troca visível entre a fonte padrão e a fonte escolhida. `useFonts` informa quando o carregamento termina; `useEffect` libera a splash.

### Qual a diferença entre margin e padding?

`margin` cria espaço externo ao elemento. `padding` cria espaço interno, entre o limite do elemento e seu conteúdo.

### Como o Flexbox aparece nesta tela?

O conjunto usa coluna e centralização. O botão usa `flexDirection: 'row'` para posicionar ícone e texto lado a lado. A legenda usa `flex: 1` para ocupar o espaço restante.

### Por que a imagem não fica deformada?

`aspectRatio` preserva a proporção do espaço da ilustração. `contentFit="contain"` mantém a imagem inteira dentro desse espaço.

### Por que usar ScrollView e SafeAreaView?

A primeira permite rolar se faltar altura. A segunda respeita as áreas ocupadas pelo sistema. Ambas ajudam a adaptar a tela, mas não dispensam testes em diferentes aparelhos.

### Por que os arquivos são TypeScript se há poucas anotações de tipo?

O TypeScript consegue inferir muitos tipos, e os componentes das bibliotecas já possuem suas próprias definições. As verificações continuam funcionando sem anotar cada variável manualmente.

### De onde vieram as imagens e fontes?

Os assets correspondentes ao Login vieram do repositório educacional original; as fontes vieram do Google Fonts. As origens e licenças estão registradas em `assets/README.md`. Os recursos são locais.

### O que foi testado?

Passaram a checagem de TypeScript e a exportação de bundles para Android, iOS e web. Isso não equivale a instalar o aplicativo, testar o clique ou comparar o visual em um aparelho. Esses testes manuais ainda estavam pendentes no registro da implementação.

## Arquivos mais importantes para estudar

- [Login](../src/app/index.tsx): função do botão, árvore JSX e objetos de estilo.
- [Layout](../src/app/_layout.tsx): `useFonts`, `useEffect`, splash, Fragment e Stack.
- [Home](../src/app/home.tsx): `useState`, filtro, listas e total calculado.
- [Dados locais](../src/data/home.ts): tipos, identificadores e objetos simulados.
- [Cartão de categoria](../src/components/category-card.tsx) e [cartão de partida](../src/components/appointment-card.tsx): props, callback e estilos condicionais.
- [Plano](./02-plano-de-implementacao.md): o que será feito depois, especialmente o futuro estado de categorias.
