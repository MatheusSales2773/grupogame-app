# Tela de Login explicada

[Voltar ao índice](./README.md)

## Objetivo e referência

Substituir a tela inicial do Expo por uma tela próxima de [tela-01-login.png](../referencias/tela-01-login.png), com ilustração, título, descrição e botão “Entrar com Discord”. A entrada é simulada. O aplicativo não solicita credenciais, não chama a API do Discord e não cria uma sessão autenticada.

Foi usado fundo azul escuro sólido. A ilustração já contém os detalhes gráficos do personagem e das faixas vermelhas. Textos e botão são elementos reais da interface; a captura de referência não é usada como fundo da tela inteira.

## Arquivos da implementação

| Arquivo | Responsabilidade |
| --- | --- |
| [src/app/index.tsx](../src/app/index.tsx) | Componente `LoginScreen`, JSX, ação do botão e estilos |
| [src/app/_layout.tsx](../src/app/_layout.tsx) | Fontes, splash, barra de status e Stack |
| [src/app/home.tsx](../src/app/home.tsx) | Destino da entrada; inicialmente vazio e implementado na segunda etapa |
| [illustration.png](../assets/images/login/illustration.png) | Ilustração do Login |
| [discord.png](../assets/images/login/discord.png) | Ícone do botão |
| [Rajdhani-Bold.ttf](../assets/fonts/Rajdhani-Bold.ttf) | Fonte do título |
| [Inter.ttf](../assets/fonts/Inter.ttf) | Fonte da descrição e do botão |
| [Rajdhani-OFL.txt](../assets/fonts/Rajdhani-OFL.txt) | Licença da fonte Rajdhani |
| [Inter-OFL.txt](../assets/fonts/Inter-OFL.txt) | Licença da fonte Inter |
| [assets/README.md](../assets/README.md) | Origem dos recursos visuais |

Não foi necessário alterar `package.json`, instalar bibliotecas ou criar componentes genéricos. As fontes são carregadas no layout para também ficarem disponíveis às futuras telas.

## JSX: a estrutura visual

JSX é a sintaxe usada para descrever a interface dentro do código. Em arquivos `.tsx`, ela pode ser combinada com TypeScript. O `return` de `LoginScreen` contém esta árvore:

```text
SafeAreaView
└── ScrollView
    └── View: contêiner
        ├── Image: ilustração
        └── View: conteúdo
            ├── Text: título
            ├── Text: descrição
            └── Pressable: botão
                ├── View: área do ícone
                │   └── Image: Discord
                └── Text: legenda
```

As chaves inserem expressões JavaScript no JSX. Por exemplo, `style={styles.title}` acessa um objeto de estilos, e `{'\n'}` insere uma quebra de linha no texto.

No layout, `<>...</>` é um Fragment. Ele agrupa `StatusBar` e `Stack` sem adicionar uma `View` ao layout.

## Componentes utilizados

| Componente | Origem | Uso |
| --- | --- | --- |
| `View` | React Native | Agrupar e posicionar elementos |
| `Text` | React Native | Renderizar textos |
| `ScrollView` | React Native | Permitir rolagem quando o conteúdo não couber |
| `Pressable` | React Native | Responder ao toque e informar se está pressionado |
| `SafeAreaView` | `react-native-safe-area-context` | Respeitar áreas ocupadas pelo sistema |
| `Image` | `expo-image` | Exibir imagens locais |
| `Stack` | `expo-router` | Organizar a navegação em pilha |
| `StatusBar` | `expo-status-bar` | Usar conteúdo claro na barra de status |

`StyleSheet` é uma API para organizar estilos; não é um elemento visual da árvore.

## StyleSheet e Flexbox

`StyleSheet.create` reúne objetos nomeados. Cada nome descreve uma parte da tela, como `title`, `button` ou `illustration`.

| Propriedade | Efeito na tela |
| --- | --- |
| `flex: 1` na tela | Ocupa o espaço disponível no contêiner |
| `flexGrow: 1` no conteúdo da rolagem | Preenche a altura disponível quando o conteúdo é menor |
| `justifyContent: 'center'` | Centraliza no eixo principal; na coluna, verticalmente |
| `alignItems: 'center'` | Centraliza no eixo transversal; na coluna, horizontalmente |
| `flexDirection: 'row'` no botão | Coloca ícone e legenda lado a lado |
| `flex: 1` na legenda | Ocupa o espaço restante ao lado do ícone |
| `alignSelf: 'stretch'` | Faz o elemento esticar no eixo transversal do seu pai |
| `width: '100%'` e `maxWidth: 420` | Usa a largura disponível com um limite em telas largas |
| `aspectRatio: 375 / 360` | Calcula a altura da ilustração a partir da largura |
| `marginTop: -60` | Aproxima o conteúdo da parte inferior da ilustração |
| `minHeight: 56` | Define uma altura mínima para o botão |

Em React Native, o sentido padrão do Flexbox é coluna. Ao mudar o botão para linha, os eixos também mudam: `alignItems` passa a alinhar verticalmente.

`margin` define espaço externo; `padding`, espaço interno. `textAlign` alinha o texto dentro de seu próprio espaço, enquanto `alignItems` posiciona os filhos de um contêiner.

As cores principais são `#0D133D` no fundo, `#DDE3F0` nos textos e `#E91446` no botão. O título usa Rajdhani Bold, tamanho 40 e altura de linha 40; a descrição usa Inter, tamanho 16 e altura de linha 25.

A rolagem e a largura flexível ajudam a adaptação. Ainda é necessário conferir visualmente telas menores e texto ampliado no aparelho.

## Props

Props são valores enviados a um componente para configurar sua aparência ou comportamento.

| Prop | Exemplo ou função |
| --- | --- |
| `style` | Aplica o objeto ou a lista de estilos |
| `source` | Recebe a imagem local por `require(...)` |
| `contentFit="contain"` | Mantém a imagem inteira, sem distorcer sua proporção |
| `contentContainerStyle` | Estiliza o contêiner interno da `ScrollView` |
| `showsVerticalScrollIndicator={false}` | Oculta a barra de rolagem, sem desativar a rolagem |
| `onPress` | Recebe a função executada no toque |
| `accessibilityRole` | Identifica título e botão para tecnologias assistivas |
| `accessibilityLabel` e `accessibilityHint` | Informam o nome do botão e a ação simulada |
| `accessible={false}` | Trata as imagens como decorativas na navegação assistiva |
| `screenOptions` | Configura o Stack, incluindo fundo e ausência de cabeçalho |
| `name` em `Stack.Screen` | Identifica a rota configurada |

O botão não recebe uma prop personalizada criada pelo projeto: ele usa as props do próprio `Pressable`.

## onPress e entrada simulada

Trecho da implementação:

```tsx
function handleSignIn() {
  // Entrada simulada: não autentica nem acessa a conta do Discord.
  router.replace('/home');
}
```

O botão recebe `onPress={handleSignIn}`. Isso entrega a referência da função para ser chamada depois. Escrever `onPress={handleSignIn()}` executaria a função durante a renderização, em vez de aguardar o toque.

A ação não consulta servidor nem salva dados. Ela apenas navega.

## Navegação

O Expo Router usa os arquivos de `src/app` para definir rotas:

- `index.tsx` corresponde a `/`, a entrada do aplicativo.
- `home.tsx` corresponde a `/home`.
- `_layout.tsx` define como essas telas se organizam.

`router.replace('/home')` substitui a rota atual. Diferentemente de adicionar uma tela com `push`, não mantém o Login como entrada anterior dessa navegação. Essa escolha organiza o histórico; não é um mecanismo de segurança ou autenticação.

A primeira versão da Home continha somente este código temporário:

```tsx
export default function HomeScreen() {
  return null;
}
```

`null` significa que o componente não renderiza interface. Esse trecho é histórico: atualmente a Home já apresenta saudação, categorias e partidas, conforme [a documentação da segunda tela](./06-tela-home.md). O Login continua navegando para a mesma rota, sem alteração de seu código. As abas antigas deixaram de ser usadas pelo layout, mas seus arquivos foram preservados.

## Estado do toque

O Login não declara `useState`: não há campos nem seleção que exijam estado próprio.

```tsx
style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
```

O próprio `Pressable` fornece `pressed`. Quando é verdadeiro, o segundo estilo aplica `opacity: 0.75`. Quando é falso, permanece o estilo normal. Trata-se de feedback visual do toque, sem simular carregamento ou autenticação.

## Fontes, useEffect e splash

No layout, `useFonts` recebe um objeto que associa os nomes `RajdhaniBold` e `Inter` aos arquivos locais. Esses mesmos nomes aparecem em `fontFamily`.

O hook retorna `fontsLoaded` e `fontError`. Enquanto não há carregamento concluído nem erro, o layout retorna `null`. `SplashScreen.preventAutoHideAsync()` mantém a abertura visível durante a preparação.

Um `useEffect` observa `[fontsLoaded, fontError]` e chama `SplashScreen.hide()` quando a preparação termina ou falha. O tratamento do erro evita manter a splash indefinidamente; se uma fonte falhar, sua aparência precisa ser verificada. O hook gerencia internamente o estado do carregamento, sem um `useState` adicional no código do projeto.

## Limites desta etapa

- Não existe autenticação Discord, token ou sessão.
- Home, Detalhes e Agendar estão implementados. O código do Login foi preservado nessas etapas.
- A splash nativa e os ícones do aplicativo mantêm a configuração do template.
- A compilação foi validada, mas o visual e o toque ainda precisam de conferência manual.

Referências técnicas consultadas na implementação: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/), [Expo Font](https://docs.expo.dev/versions/v57.0.0/sdk/font/), [Splash Screen](https://docs.expo.dev/versions/v57.0.0/sdk/splash-screen/), [navegação do Expo Router](https://docs.expo.dev/router/basics/navigation/) e [Pressable no React Native 0.86](https://reactnative.dev/docs/0.86/pressable).
