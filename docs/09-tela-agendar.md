# Tela Agendar

[Voltar ao índice](./README.md)

## Escopo e referências

Existe uma única rota, [src/app/agendar.tsx](../src/app/agendar.tsx). As imagens representam estados do mesmo formulário, não telas separadas:

- `referencias/tela-03-agendar.png`: formulário vazio.
- `referencias/tela-04-agendar-categoria- selecionada.png`: categoria destacada. O nome real do arquivo contém um espaço após o hífen.
- `referencias/tela-06-agendar-servidor selecionado.png`: Valorosos selecionado.
- `referencias/tela-07-agendar.png`: campos preenchidos e teclado aberto.

A tela começa com servidor Valorosos fixo, categoria sem seleção e campos vazios. Não existe o estado de servidor vazio, pois o escopo desta etapa determina um servidor já selecionado e exclui seu modal. O rótulo de horário segue as últimas imagens: **Horário**. A descrição aceita até 100 caracteres.

O botão Agendar dispensa o teclado e mostra “Demonstração: nenhum agendamento foi salvo.” Não valida uma data real, não cria uma partida na Home, não chama backend e não persiste dados. A mensagem não representa sucesso de um agendamento real.

## Arquivos e reutilização

| Arquivo | Alteração |
| --- | --- |
| [agendar.tsx](../src/app/agendar.tsx) | Nova tela, servidor local, estados, campos, ações e estilos |
| [home.tsx](../src/app/home.tsx) | Ativação do `+`; na revisão passou a usar `router.navigate('/agendar')` |
| [category-card.tsx](../src/components/category-card.tsx) | Nova prop opcional `accessibilityHint`, mantendo o texto anterior como padrão da Home |
| Este documento | Explicação da quarta tela e roteiro manual |
| `docs/README.md` e documentos `01` a `08` | Situação, navegação, decisões, apresentação, validação e histórico atualizados |

Nenhum componente novo foi criado. `CategoryCard` já é repetido na Home e agora é reutilizado em Agendar. `ScreenHeader` já organiza o cabeçalho de Detalhes e é reutilizado sem alteração. Os quatro campos numéricos compartilham um estilo, sem precisar de um componente genérico de formulário.

O logo de Valorant, as fontes e os ícones de categorias já existiam. O logo difere da capa de personagens da referência, como já registrado em [assets/README.md](../assets/README.md). O servidor é um bloco informativo sem botão nem seta de seleção, já que não pode ser trocado nesta etapa. Na revisão foi adicionado o pequeno marcador quadrado ao canto dos cartões de Agendar, mantendo o visual da Home.

## Categoria: estado, props e callback

```tsx
const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
```

`null` representa nenhuma categoria selecionada. O estado guarda um único identificador, como `'ranked'`, em vez de quatro booleanos independentes. Isso permite somente uma seleção por vez.

```tsx
<CategoryCard
  category={category}
  selected={selectedCategoryId === category.id}
  onPress={() => setSelectedCategoryId(category.id)}
  showSelectionIndicator
  accessibilityHint="Seleciona esta categoria para a partida. Apenas uma pode ser selecionada."
/>
```

`category` entrega nome e ícone. `selected` entrega um booleano calculado pela comparação dos IDs. `onPress` entrega uma função: ao tocar, o cartão chama essa função e a tela atualiza o estado. O React renderiza novamente os cartões; somente a nova categoria recebe `selected=true`. Tocar novamente na categoria atual mantém a seleção. A Home preserva sua lógica diferente, na qual o segundo toque remove o filtro.

No componente, `[styles.card, selected && styles.selected]` aplica o estilo base e o fundo destacado quando selecionado. Em Agendar, `showSelectionIndicator` exibe um quadrado no canto: vazio quando não selecionado e vermelho quando selecionado. Uma sobreposição de estilo mantém a borda azul, como na referência. Na Home, essa prop é `false` por padrão e a seleção continua com borda vermelha. O componente não tem estado próprio. `accessibilityState={{ selected }}` também comunica a seleção para leitores de tela.

A nova prop `accessibilityHint` explica a ação correta em Agendar. A Home não precisa passá-la: o valor padrão continua explicando seu filtro. Essa adaptação evita que a tela de formulário anuncie uma instrução incorreta.

As quatro categorias são renderizadas com `map` dentro de uma `ScrollView` horizontal, usando `key={category.id}`. É uma lista pequena e fixa; não há necessidade de uma segunda lista virtualizada. A rolagem horizontal mantém a última categoria acessível em telas estreitas.

## Campos controlados

Cada campo possui um estado string: `day`, `month`, `hour`, `minute` e `description`. Strings representam tanto um campo vazio quanto valores como `06`, sem perder o zero inicial.

```tsx
<TextInput
  value={day}
  onChangeText={(text) => setDay(text.replace(/\D/g, ''))}
  keyboardType="number-pad"
  maxLength={2}
/>
```

`value` define o texto exibido. `onChangeText` recebe o novo texto e chama o setter. A expressão `replace(/\D/g, '')` remove caracteres que não sejam dígitos, inclusive na web ou ao colar. `keyboardType` pede teclado numérico no celular; não é uma validação por si só. `maxLength={2}` limita o tamanho dos campos.

Não há validação de calendário ou dos intervalos de dia, mês e horário, pois o formulário é uma demonstração sem agendamento real. Essa limitação deve ser explicada; duas casas numéricas não garantem uma data válida.

A descrição usa `value={description}`, `onChangeText={setDescription}`, `multiline` e `maxLength={100}`. O limite é aplicado pelo próprio `TextInput`. `textAlignVertical: 'top'` alinha o início do texto na área de escrita. Os estados não são gravados em disco e são reiniciados quando a rota é desmontada e aberta novamente.

## Teclado e rolagem

A árvore principal é `KeyboardAvoidingView` → `SafeAreaView` → contêiner → `ScreenHeader` e `ScrollView`.

- `KeyboardAvoidingView` envolve a tela desde o topo. Após a adaptação de `referencias/exemplo.js`, usa `padding` no iOS e Android para ajustar o espaço quando o teclado aparece. Na web fica desativado, deixando o navegador controlar seu viewport.
- Não há cabeçalho nativo sobreposto nem deslocamento manual de teclado. A área segura e o cabeçalho visual estão dentro do contêiner ajustável.
- A `ScrollView` vertical permite alcançar os campos e o botão quando a altura disponível diminui. O botão está dentro do conteúdo rolável.
- `keyboardShouldPersistTaps="handled"` permite acionar botões sem exigir um primeiro toque apenas para fechar o teclado.
- `keyboardDismissMode` usa `interactive` no iOS e `on-drag` nas demais plataformas.
- `TouchableWithoutFeedback` envolve uma `View` com o conteúdo e chama `fecharTeclado()` ao tocar no espaço livre. A função usa `Keyboard.dismiss()` e também é chamada pelo botão Agendar, sem apagar os campos.
- O contêiner interno usa `flexGrow: 1` para preservar a distribuição do formulário e do rodapé. `bounces={false}` evita o efeito elástico da rolagem vertical onde suportado.
- Ao tocar em Agendar, `showFeedback`, inicialmente `false`, passa a `true` e exibe a mensagem local.

Não foi instalada biblioteca de teclado nem alterada a configuração nativa. A combinação utiliza componentes do React Native; a compilação não comprova posicionamento do teclado em aparelho. Esse teste permanece no roteiro manual abaixo.

A comparação com o exemplo e a explicação para apresentação estão em [Teclado e rolagem](./12-teclado-e-rolagem.md).

## Navegação

O `+` da Home chama `router.navigate('/agendar')`. A revisão trocou `push` por `navigate` para reutilizar o destino ativo em aberturas repetidas. O Expo Router reconhece a rota pelo arquivo `src/app/agendar.tsx`; não foi necessário alterar `_layout.tsx`.

O cabeçalho recebe `title="Agendar partida"` e `onBack={handleBack}`. Não recebe `onShare`, então mantém somente voltar e título centralizado. `handleBack` usa `router.back()` quando existe histórico e `router.replace('/home')` se a tela foi aberta diretamente sem histórico. A Home continua na pilha, preservando seu filtro ao voltar.

## StyleSheet e Flexbox

Todos os estilos específicos ficam em `StyleSheet.create` no final da tela. As fontes RajdhaniBold e Inter e a paleta azul/vermelha são reutilizadas.

- `flex: 1` ocupa a área disponível para tela, área segura, contêiner e rolagem.
- O contêiner tem largura de 100%, máximo de 600 e centralização em telas largas.
- `contentContainerStyle` usa `flexGrow: 1`: preenche a altura disponível, mas permite que o conteúdo cresça e role.
- O rodapé usa `marginTop: 'auto'` para ficar perto da base quando há espaço, e `paddingTop: 40` para separá-lo da descrição quando há rolagem.
- A faixa horizontal usa `flexGrow: 0` e `flexShrink: 0` para manter a altura de seus cartões.
- Servidor, pares de campos e linha de descrição usam `flexDirection: 'row'`.
- `justifyContent: 'space-between'` separa dia/mês de horário e descrição de seu limite.
- `flexWrap: 'wrap'` permite que esses grupos quebrem de linha quando faltar largura.
- Os campos numéricos têm largura 48 e altura mínima 48; a descrição tem altura mínima 120. Bordas, fundo e cantos arredondados seguem o protótipo.
- `gap`, padding e margens mantêm os espaçamentos; o botão reduz a opacidade enquanto pressionado.

## O que explicar ao professor

1. Uma tela pode ter vários estados visuais sem precisar de várias rotas.
2. Um ID em estado garante seleção única; a comparação dos IDs define qual cartão recebe destaque.
3. Props levam dados e funções da tela ao componente; o callback comunica o toque.
4. O estado pertence à tela porque o formulário precisa saber a categoria escolhida.
5. Um `TextInput` controlado recebe `value` e atualiza esse valor por `onChangeText`.
6. Os números são strings durante a digitação para permitir vazio e zeros à esquerda.
7. Teclado numérico, limite de caracteres e validação de uma data são conceitos distintos.
8. `ScrollView`, `KeyboardAvoidingView` e `SafeAreaView` resolvem necessidades diferentes de espaço.
9. `navigate` abre Agendar mantendo a Home e evita duplicar o destino ativo; `back` retorna para a tela anterior.
10. Nada é salvo; servidor é fixo, dados são locais e o botão apresenta somente uma mensagem.

## Roteiro manual pendente

- [ ] Abrir Agendar pelo `+` e conferir Valorosos, campos vazios e nenhuma categoria marcada.
- [ ] Selecionar as quatro categorias, rolando horizontalmente até Treino.
- [ ] Confirmar somente um destaque e que tocar novamente mantém a seleção.
- [ ] Voltar à Home e conferir que seu filtro original continua funcionando.
- [ ] Digitar dia `22`, mês `06`, hora `19`, minuto `30` e uma descrição como na referência.
- [ ] Testar colagem, remoção de texto, limite de dois dígitos e descrição de 100 caracteres.
- [ ] No Android e iOS, focar cada campo, principalmente descrição, e rolar com teclado aberto.
- [ ] Confirmar que o campo focado e o botão podem ser alcançados em tela baixa e com texto ampliado.
- [ ] Tocar em Agendar com teclado aberto e conferir a mensagem, sem criação de partida na Home.
- [ ] Tocar no servidor e confirmar que nenhum modal abre.
- [ ] Testar voltar e acesso direto à rota; conferir Login e Detalhes sem regressões.

Resultados dos comandos: [Execução e validação](./05-execucao-e-validacao.md).

Referências técnicas consultadas: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/), [teclado no Expo](https://docs.expo.dev/guides/keyboard-handling/), [TextInput no RN 0.86](https://reactnative.dev/docs/0.86/textinput), [KeyboardAvoidingView](https://reactnative.dev/docs/0.86/keyboardavoidingview), [ScrollView](https://reactnative.dev/docs/0.86/scrollview) e [navegação no Router](https://docs.expo.dev/router/basics/navigation/).
