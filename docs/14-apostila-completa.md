# 01. Como estudar este projeto

Este material explica o GrupoGame como um projeto acadêmico de aplicativo: problema, objetivos, arquitetura, dados, telas, decisões de implementação e evidências de verificação. A base é o código local da edição de 24/09/2026, já comentado em português. O nome GamePlay aparece em algumas referências visuais; o projeto local se chama grupogame-app.

O objetivo do aplicativo é demonstrar uma interface para organizar partidas entre grupos de jogadores. O usuário entra pela tela de Login, consulta partidas, vê os detalhes de um servidor e preenche um formulário para agendar. A categoria e o servidor escolhidos são representados por estado local. A interface responde aos toques, mas não existe integração real com Discord nem banco de dados.

## Como o material está organizado

1. Entenda o produto e o mapa de pastas antes de decorar linhas de código.
2. Estude componentes, JSX, TypeScript, props e estado. São a base das quatro telas.
3. Acompanhe cada fluxo do toque até a mudança visual.
4. Use o roteiro de apresentação e responda às perguntas sem consultar o texto.
5. Consulte o apêndice para localizar a implementação completa de cada arquivo.

Os exemplos dos capítulos são recortes ou adaptações didáticas identificadas no texto. Eles explicam um conceito isolado e podem omitir imports ou estilos. O apêndice transcreve os 13 arquivos principais e três configurações, incluindo comentários, sem trocar a implementação por exemplos. A numeração lateral do apêndice serve para consulta e não faz parte do código.

## A resposta que importa na apresentação

Para cada parte, responda: **o que faz, por que foi feita dessa maneira, de onde vêm os dados e o que acontece depois do toque**. Dizer apenas “isso é um useState” identifica a ferramenta, mas não explica sua responsabilidade.

> Exemplo de explicação: “Guardo somente o ID da categoria porque o formulário permite uma única seleção. Cada cartão compara seu ID com esse estado. Quando o usuário toca, o callback atualiza o ID e o React aplica o destaque ao cartão correspondente.”

Não apresente a imagem de referência como se fosse uma captura do aplicativo funcionando. As imagens desta apostila são identificadas como protótipos. Também não confunda uma exportação bem-sucedida com testes de teclado e toque em um celular.

# 02. Problema, requisitos e escopo

## Problema representado

Grupos de jogadores precisam combinar categoria de partida, servidor, data, horário e descrição. O projeto representa essa organização em uma interface móvel. Seu propósito acadêmico é demonstrar composição de componentes, navegação e mudanças de estado, mantendo o código simples de ler e explicar.

| Parte | O que foi implementado | Limite da demonstração |
| --- | --- | --- |
| Login | Ilustração, apresentação e botão Discord | O botão navega; não autentica |
| Home | Saudação, categorias, filtro e partidas | Dados locais, sem agenda remota |
| Detalhes | Servidor, banner, descrição e jogadores | Status de jogadores fictícios |
| Agendar | Categoria, grupo, campos e teclado | Nada é gravado ou enviado |
| Lista de servidores | Modal, rolagem, escolha e troca | Seis grupos simulados |
| Saída | Confirmação e retorno ao Login | Não há sessão real para encerrar |

## Requisitos técnicos

- Preservar React Native, Expo e TypeScript existentes.
- Usar StyleSheet e Flexbox para construir a interface.
- Aproveitar componentes e bibliotecas já instalados.
- Usar Expo Router para a navegação entre telas.
- Evitar estado global, backend ou abstrações sem necessidade.
- Documentar decisões e manter diferenças visuais conhecidas registradas.

O modal de servidores e a confirmação de saída foram adicionados por solicitações posteriores ao escopo inicial. O estado atual começa com “Selecione um servidor”; Valorosos não é mais uma escolha fixa. As categorias de Agendar começam apagadas e somente a escolhida fica com o destaque normal.

## Critério de conclusão acadêmica

A aplicação deve demonstrar o fluxo e permitir explicar as decisões de interface e código. Não seria correto afirmar que ela agenda uma partida real: o botão informa explicitamente que nenhum agendamento foi salvo. Também não há validação completa de calendário ou de intervalo de horas.

# 03. Referências visuais e leitura das telas

As referências definem hierarquia, cores, fontes, alinhamentos e estados. Uma tela é composta por elementos interativos reais; não foi implementada simplesmente exibindo uma captura de tela como fundo.

@images tela-01-login.png|tela-02-home.png|tela-2.1-home.png

**Login:** a ilustração chama a atenção, o título apresenta o propósito e o botão oferece uma ação principal. **Home:** avatar e saudação aparecem no topo; o botão + abre o formulário; categorias ficam em faixa horizontal; as partidas formam a lista vertical. **Detalhes:** o banner apresenta o grupo, seguido da lista de jogadores e da ação de entrada.

@page

## Agendar é uma tela com vários estados

@images tela-03-agendar.png|tela-06-agendar-servidor selecionado.png|tela-07-agendar.png

As imagens não exigem uma rota por situação. A mesma tela pode estar vazia, ter uma categoria selecionada, mostrar Valorosos e conter campos preenchidos. O teclado também altera o espaço disponível sem transformar o formulário em outra rota.

O estado atual utiliza a categoria vazia e nenhum servidor escolhido ao abrir. Depois do toque, a seleção se reflete nos mesmos componentes. No protótipo existem pequenas diferenças de rótulos entre capturas; a implementação usa **Horário** e **Max 100 caracteres**.

@page

## Os dois modais

@images tela-05-selecione-servidor.png|tela-08-sair.png

O seletor de servidores aparece sobre Agendar. A confirmação de saída aparece sobre a Home. Ambos são sobreposições controladas por um booleano de estado. Não é necessário criar novas páginas de navegação para esses comportamentos.

Algumas imagens locais diferem dos recortes do protótipo. Valorosos usa um logo de Valorant, e alguns jogadores usam iniciais. A lista reutiliza os seis grupos existentes; nomes e ordem não são uma reprodução integral dos grupos visíveis na tela cinco. O fundo das telas é sólido, sem reproduzir todos os efeitos de gradiente das referências.

# 04. Tecnologias e o papel de cada uma

O projeto usa npm e possui package-lock.json. As versões abaixo são as declaradas em package.json nesta edição. O prefixo ~ permite atualizações compatíveis dentro da faixa indicada; o lockfile registra a resolução de dependências usada na instalação.

| Tecnologia | Versão declarada | Responsabilidade |
| --- | --- | --- |
| Expo | ~57.0.24 | Ferramentas e integração para desenvolver e exportar o app |
| React | 19.2.3 | Componentes, renderização, props e hooks |
| React Native | 0.86.3 | View, Text, inputs, listas, modais e layout nativo |
| TypeScript | ~6.0.3 | Verificação estática de tipos |
| Expo Router | ~57.0.22 | Rotas por arquivos e navegação em pilha |
| Expo Image | ~57.0.5 | Exibição de imagens locais |
| Expo Font | ~57.0.4 | Carregamento das fontes locais |
| Expo Symbols | ~57.0.3 | Ícones de voltar, compartilhar e seta |
| Safe Area Context | ~5.7.0 | Ajuste às áreas reservadas pelo sistema |

React e React Native não são a mesma coisa. React fornece o modelo de componentes e atualização da interface. React Native oferece componentes que representam elementos de interface nas plataformas suportadas. Expo reúne ferramentas e módulos que já estavam no projeto. Expo Router organiza como as telas são encontradas e abertas.

## Biblioteca instalada não significa uso direto em todas as telas

O package.json também inclui React DOM e React Native Web para web; Splash Screen e Status Bar para a abertura e a barra de status; Screens, Gesture Handler, Reanimated e Worklets; além de módulos como expo-device, expo-constants, expo-linking, expo-system-ui, expo-web-browser, expo-glass-effect e @expo/ui. Parte dessa base veio do template ou é utilizada pela infraestrutura.

Não se deve afirmar que foi programada uma animação própria com Reanimated só porque a dependência está instalada. Os modais do trabalho usam a animação fornecida pelo Modal. Nenhum pacote novo foi necessário para implementar as quatro telas e as seleções.

> Por que manter essa base? Ela já resolve as necessidades do trabalho. Uma migração aumentaria o esforço e os riscos sem melhorar os conceitos que precisam ser demonstrados.

# 05. Arquitetura: visão geral

A organização é simples e separada por responsabilidade. Não há uma implementação formal de Clean Architecture, MVC completo ou camadas de domínio, repositório e infraestrutura. As telas coordenam estado e ações; os componentes organizam partes visuais; os dados locais representam a demonstração.

@diagram architecture

## Quem decide e quem apresenta

Uma tela, como Agendar, decide qual categoria e qual servidor estão selecionados. CategoryCard recebe os dados e a informação de seleção. O cartão não cria uma segunda seleção própria. Quando recebe um toque, chama a função passada pela tela. Isso mantém uma única origem para a informação.

Os dados em src/data podem ser importados por várias partes da interface. O módulo servers.ts atende tanto Detalhes quanto o seletor. Separar esses dados evita colocar registros extensos diretamente no JSX. Assets reúne os recursos visuais que essas telas precisam.

## Por que os estilos permanecem junto dos componentes

Cada tela termina com StyleSheet.create. Assim, quem abre o arquivo encontra lógica, JSX e aparência na mesma leitura. Para o tamanho atual, isso facilita manutenção e apresentação. A paleta se repete em alguns arquivos; essa repetição é uma escolha simples, não a existência de um sistema de tema central aplicado às quatro telas.

Essa arquitetura evita criar pasta services sem serviço, pasta store sem estado global ou um formulário genérico com dezenas de props. Se o projeto crescesse, seria possível revisar essas decisões com base em necessidades reais. Não é preciso antecipar essa estrutura para explicar o aplicativo atual.

# 06. Pastas, arquivos e decisões de organização

Árvore focada nos arquivos do trabalho. As pastas auxiliares do template continuam presentes e são explicadas na sequência.

```text
grupogame-app/
  src/
    app/
      _layout.tsx
      index.tsx
      home.tsx
      agendar.tsx
      servidor/
        [id].tsx
    components/
      category-card.tsx
      appointment-card.tsx
      screen-header.tsx
      player-item.tsx
      server-select-modal.tsx
      sign-out-modal.tsx
    data/
      home.ts
      servers.ts
  assets/
    fonts/
    images/
  referencias/
  docs/
  output/pdf/
  package.json
  package-lock.json
  app.json
  tsconfig.json
```

## Por que cada pasta existe

**src/app:** é especial para o Expo Router. Os arquivos definem destinos de navegação. index.tsx representa /, home.tsx representa /home e servidor/[id].tsx representa um destino dinâmico. _layout.tsx configura o navegador comum. Componentes auxiliares não ficam aqui para não virarem rotas acidentalmente.

**src/components:** partes visuais usadas várias vezes ou que organizam um trecho importante. CategoryCard aparece nas categorias de Home e Agendar. ScreenHeader atende Detalhes e Agendar. PlayerItem e AppointmentCard se repetem em listas. Os dois modais ficam separados porque contêm sua própria árvore visual e estilos.

**src/data:** contém tipos e dados de demonstração. É possível trocar um nome ou examinar os IDs sem procurar dentro de uma tela. Os tipos permanecem junto dos registros porque são pequenos e diretamente relacionados; não foi necessária uma pasta types separada.

**assets:** arquivos exibidos pelo app, como imagens, ícones e fontes. **referencias:** material usado como orientação visual e o exemplo.js de teclado. Uma referência não vira automaticamente um recurso exibido na interface.

**docs:** decisões e explicações. **output/pdf:** artefato final para estudo. O gerador da apostila fica em docs/pdf e não participa do bundle do aplicativo.

## O que veio do template

src/app/explore.tsx permanece como rota de demonstração, sem botão no fluxo principal. Componentes app-tabs, animated-icon, themed-text, themed-view, ui/collapsible e arquivos de hooks e constants pertencem à base inicial. Não foram removidos apenas para “limpar” a arquitetura. O layout atual usa Stack, não as abas preservadas.

node_modules contém dependências instaladas; .expo contém arquivos de trabalho do Expo; .git contém histórico de versionamento. Essas pastas não representam novas telas ou camadas de negócio. scripts/reset-project.js pertence ao template e não é necessário para executar o trabalho.

> Resposta para o professor: “Separei rotas, componentes e dados para que cada arquivo tenha uma responsabilidade fácil de encontrar. Mantive estilos junto da interface e tipos junto dos dados porque o projeto é pequeno. Evitei pastas e abstrações que ainda não teriam uso.”

# 07. Configuração e execução

## Os quatro arquivos de configuração mais importantes

**package.json** informa nome, entrada, scripts e dependências. A entrada expo-router/entry inicia a integração do Router. **package-lock.json** registra a árvore resolvida de pacotes para tornar instalações mais consistentes. **app.json** configura o aplicativo Expo. **tsconfig.json** configura o compilador TypeScript.

No app.json, a orientação é portrait, a exportação web é static e os plugins incluem Router e Splash Screen. As opções typedRoutes e reactCompiler estão habilitadas. Isso não significa que todas as APIs foram otimizadas manualmente ou que o app tem autenticação; são configurações de ferramentas.

## O alias dos imports

Trecho real de tsconfig.json:

```json
"paths": {
  "@/*": ["./src/*"],
  "@/assets/*": ["./assets/*"]
}
```

O import de @/components/category-card aponta para src/components/category-card. Já @/assets/images/... aponta para assets/images/... na raiz, por causa do mapeamento mais específico. Isso reduz caminhos relativos longos, como várias sequências de ../. O alias facilita localização; não cria uma camada de arquitetura.

## Comandos para demonstrar

```powershell
npm.cmd start
npm.cmd run android
npm.cmd run ios
npm.cmd run web
npx.cmd tsc --noEmit --incremental false
```

Os scripts android e ios iniciam o Expo com a opção da plataforma. Executar um simulador iOS local depende de ambiente compatível; no Windows não se deve prometer abrir o simulador da Apple. Expo Go em aparelho e emuladores disponíveis dependem da configuração do ambiente e da compatibilidade com o SDK instalado.

No PowerShell deste projeto, .cmd evita o bloqueio de execução de scripts .ps1. npm start usa o script start, que chama expo start. Não execute reset-project para “abrir” o trabalho: ele é um utilitário de reinicialização da base.

Não existem pastas nativas ios e android mantidas manualmente neste projeto. As configurações do Expo são a base para gerar projetos nativos quando necessário. A exportação usada nas verificações gera bundles; ela não equivale a instalar um APK ou publicar em uma loja.

# 08. React, componentes e JSX

Um componente é uma função que descreve uma parte da interface. O React chama essa função durante a renderização. O retorno usa JSX, uma sintaxe que mistura elementos visuais e expressões JavaScript. Em arquivos .tsx, isso aparece junto da tipagem TypeScript.

Exemplo didático, simplificado para mostrar a composição:

```tsx
function Saudacao({ nome }: { nome: string }) {
  return (
    <View>
      <Text>Olá, {nome}</Text>
    </View>
  );
}
```

View organiza os filhos; Text exibe conteúdo textual; nome é uma prop. As chaves inserem uma expressão no JSX. O componente poderia receber “Tiago” ou outro nome sem alterar sua estrutura. Nomes de componentes começam com letra maiúscula para distingui-los dos elementos especiais reconhecidos pela sintaxe.

## Os componentes usados no projeto

| Elemento | Papel no aplicativo |
| --- | --- |
| View e Text | Estrutura visual e textos |
| Pressable | Ação ao toque e feedback de pressionamento |
| ScrollView | Conteúdo rolável do Login e do formulário |
| FlatList | Listas de partidas, categorias, jogadores e servidores |
| TextInput | Entrada de dia, mês, hora, minuto e descrição |
| Modal | Seleção de servidor e confirmação de saída |
| KeyboardAvoidingView | Ajuste de espaço quando o teclado aparece |
| SafeAreaView | Áreas seguras, importada de safe-area-context |
| Image e SymbolView | Recursos visuais dos pacotes Expo já instalados |

StyleSheet não é uma tag visual. É uma API que organiza objetos de estilo. useState e useEffect também não são elementos da tela: são hooks usados durante a execução de componentes.

## Renderização condicional

O JSX pode incluir ou omitir um elemento conforme um valor. O projeto usa showFeedback && (...) para exibir a mensagem somente depois do toque. Usa um ternário para escolher entre foto e iniciais do jogador. Usa selectedServer?.name ?? 'Selecione um servidor' para fornecer um texto inicial quando ainda não há escolha.

> A interface é uma descrição do estado atual. Em vez de procurar um botão e mudar sua cor manualmente, atualizamos o estado e deixamos o JSX calcular o próximo resultado.

# 09. TypeScript e sintaxe que aparece no código

TypeScript adiciona verificação estática ao JavaScript. Ele ajuda a detectar props faltando, valores incompatíveis e nomes incorretos antes da execução. Os tipos não substituem validação de dados recebidos de uma API e não garantem que uma data digitada exista no calendário.

Trecho real dos tipos:

```tsx
export type CategoryId = 'ranked' | 'duel' | 'fun' | 'training';

type Props = {
  visible: boolean;
  selectedServerId: string | null;
  onSelect: (serverId: string) => void;
  onClose: () => void;
};
```

CategoryId é uma união de quatro valores literais. Ela restringe o conjunto de IDs aceitos. selectedServerId aceita uma string ou null. A função onSelect recebe um ID e retorna void: o chamador não espera um valor de retorno útil. onClose não recebe parâmetros.

## Símbolos que você precisa reconhecer

| Sintaxe | Como explicar |
| --- | --- |
| `export` e `import` | Tornam um valor disponível e o utilizam em outro módulo |
| `import type` | Importa somente um tipo para a verificação estática |
| `avatar?: ...` | A propriedade é opcional |
| `Category[]` | Um array de categorias |
| `const { id } = ...` | Desestrutura uma propriedade do objeto retornado |
| `const [valor, setter] = ...` | Desestrutura o par retornado pelo hook |
| `===` | Compara valor sem conversão automática de tipo |
| `?.` | Acessa ou chama apenas se o valor não for nulo/indefinido |
| `??` | Fornece alternativa para null ou undefined |
| `condicao ? a : b` | Escolhe entre dois resultados |
| `() => ...` | Cria uma função, frequentemente usada como callback |

Uma arrow function não é executada só por ser criada. Em onPress={() => handleSelectCategory(item.id)}, a expressão define uma função que será chamada depois, no toque. Se fosse onPress={handleSelectCategory(item.id)}, a função seria chamada durante a renderização e seu resultado seria passado como prop. Esse não é o fluxo pretendido.

O projeto usa strict: true. Isso obriga o código a considerar situações como null e undefined. O estado inicial sem servidor e o tratamento de servidor não encontrado são exemplos em que a tipagem orienta uma interface mais explícita.

# 10. Props, callbacks, estado e dados derivados

Props são entradas de um componente. Estado é informação mantida por uma instância de componente ao longo das renderizações. Um callback é uma função passada como prop para comunicar uma ação. Dados derivados são valores calculados a partir de props, estado ou registros existentes.

## Exemplo central: CategoryCard

Trecho de uso em Agendar, com a dica de acessibilidade omitida para facilitar a leitura:

```tsx
<CategoryCard
  category={category}
  selected={selectedCategoryId === category.id}
  onPress={() => setSelectedCategoryId(category.id)}
  showSelectionIndicator
  dimUnselected
/>
```

category contém o nome e o ícone. selected é um booleano calculado. onPress é a função que atualiza o estado da tela. As props sem valor explícito, como dimUnselected, equivalem a passar true. CategoryCard não guarda outra cópia da seleção em useState.

## O ciclo de atualização

1. A tela renderiza com selectedCategoryId igual a null.
2. Todos os cartões recebem selected=false.
3. O usuário toca em Ranqueada e o callback solicita a atualização para 'ranked'.
4. O React processa o estado e renderiza a tela novamente.
5. A comparação dá true somente para Ranqueada e seu estilo muda.

O setter não altera imediatamente a variável da renderização que já está em execução. Cada renderização lê seu próprio valor de estado. Quando a próxima atualização depende do valor anterior, a forma funcional é útil: setSelectedCategoryId(current => ...).

## Evitar estado desnecessário

visibleAppointments é calculado com filter; o total vem de visibleAppointments.length. selectedServer vem de servers.find. Texto e cor do papel do jogador são calculados a partir de props. Não há necessidade de criar um setter para cada uma dessas informações.

Se o total fosse guardado separadamente, seria necessário lembrar de atualizá-lo sempre que o filtro mudasse. Calculá-lo da lista elimina essa possibilidade de divergência. Esse é o motivo concreto para usar dados derivados, e não apenas uma preferência de estilo.

## Onde o estado vive

Home mantém filtro e abertura da saída. Agendar mantém categoria, servidor, modal, campos e feedback. Detalhes mantém a mensagem de feedback. Login não precisa de estado local. Os modais recebem o estado da tela que os controla. Não foi necessário Context, Redux ou outro gerenciador global.

# 11. Dados simulados e relações entre IDs

src/data/home.ts reúne usuário, categorias e partidas. src/data/servers.ts reúne servidores e jogadores. Esses dados são constantes locais importadas pelas telas. Não há fetch, requisição HTTP ou serviço remoto alimentando as listas.

| Tipo | Identificação e campos | Onde é usado |
| --- | --- | --- |
| Category | id, title, matchLabel, icon | Home e Agendar |
| Appointment | id, serverId, categoryId, título, data, hora, imagem, isHost | Cards da Home |
| Server | id, name, game, image, banner, description, isAdmin, players | Detalhes e seletor |
| Player | id, name, initials, avatar opcional, status | Lista de jogadores |

Uma partida possui seu próprio id e um serverId. O primeiro identifica a linha da lista; o segundo aponta para o servidor. Não são a mesma responsabilidade. Várias partidas poderiam apontar para um mesmo servidor, ainda que os dados atuais sejam pequenos.

## Ligação concreta

A partida match-5 contém serverId: 'valorosos'. O registro do servidor tem id: 'valorosos'. Quando o card envia esse identificador para a rota, Detalhes encontra o grupo com find. Em Agendar, o mesmo ID identifica a escolha, mas não é necessário navegar para Detalhes para selecioná-lo.

Trecho real da busca em Agendar:

```tsx
const selectedServer = servers.find(
  (server) => server.id === selectedServerId
);
```

find retorna um elemento ou undefined. filter retorna um novo array com os elementos que satisfazem a condição. map transforma cada elemento e retorna outro array; por isso é usado para montar cartões e gerar parâmetros de rotas estáticas. Nenhuma dessas três operações precisa modificar o array original.

## Simulação e consistência

O mesmo grupo fictício de três jogadores é compartilhado entre os servidores. Os status não são presença online real. isAdmin é o papel do usuário no grupo; isHost é o papel em uma partida. Uma pessoa pode ser anfitriã de uma partida sem que isso signifique administrar todo o servidor.

O sexto grupo e algumas imagens são alternativas de demonstração. A origem dos assets está registrada em assets/README.md. Esses registros não significam que o aplicativo acessou contas ou recebeu permissão de usuários reais do Discord.

# 12. Navegação: rotas, pilha e parâmetros

@diagram navigation

O Expo Router associa arquivos a caminhos. O Stack do layout raiz organiza as telas em uma pilha. Abrir uma tela pode colocar um destino sobre o anterior; voltar pode retirar a tela atual e revelar a anterior. Um modal de React Native, por sua vez, não adiciona uma rota a essa pilha.

| Arquivo | Caminho | Função |
| --- | --- | --- |
| src/app/index.tsx | / | Login |
| src/app/home.tsx | /home | Lista principal |
| src/app/agendar.tsx | /agendar | Formulário |
| src/app/servidor/[id].tsx | /servidor/valorosos, por exemplo | Detalhes por ID |

## Métodos usados

**replace:** troca a rota atual. No Login, replace('/home') evita deixar aquela instância do Login abaixo da Home. A saída também substitui Home por /. Isso é navegação, não uma proteção de autenticação.

**navigate:** abre ou retorna a um destino conforme o estado da pilha. A Home usa navigate para Detalhes e Agendar. Na revisão, foi preferido a push para evitar empilhar repetidamente o mesmo destino ativo em toques duplicados. Isso não é uma afirmação de que qualquer combinação possível de rotas nunca produzirá outra instância.

**back:** volta na pilha. handleBack verifica canGoBack; quando não há histórico, como em acesso direto, replace('/home') oferece um destino de retorno.

## Passar um ID, não um objeto inteiro

```tsx
router.navigate({
  pathname: '/servidor/[id]',
  params: { id: serverId },
});
```

Detalhes lê o parâmetro por useLocalSearchParams e consulta os dados locais. A URL fica curta, os dados têm uma origem definida e o destino pode ser acessado diretamente pelo identificador. Se não houver correspondência, a tela mostra “Servidor não encontrado”. O parâmetro não é convertido em um servidor confiável apenas por estar tipado.

generateStaticParams retorna os IDs conhecidos para gerar as páginas na exportação estática web. Essa função atende ao processo de exportação; o usuário não a chama ao tocar em uma partida. A rota de template /explore continua existente, embora não faça parte do fluxo principal.

# 13. Inicialização, fontes e tela de Login

## O que acontece antes da primeira tela

_layout.tsx chama preventAutoHideAsync fora do componente para manter a abertura enquanto as fontes são preparadas. useFonts carrega RajdhaniBold e Inter de arquivos locais. useEffect observa fontsLoaded e fontError; quando uma dessas condições libera a espera, oculta a abertura. Se ainda estiver carregando, o componente retorna null.

O array de dependências de useEffect informa quais valores provocam nova execução do efeito após a renderização. Esse hook é adequado aqui porque esconder a abertura é um efeito externo à descrição do JSX. Não seria necessário usar useEffect só para calcular o nome do servidor a partir de um ID.

O layout retorna um Fragment com StatusBar e Stack. Fragment agrupa elementos sem criar uma View extra. headerShown: false evita um cabeçalho nativo adicional sobre os cabeçalhos desenhados pelo projeto.

## Login passo a passo

1. SafeAreaView protege o conteúdo das áreas do sistema.
2. ScrollView permite rolar caso a altura seja insuficiente.
3. Image exibe a ilustração local com contentFit="contain".
4. View agrupa título, descrição e botão.
5. Pressable chama handleSignIn, que substitui a rota pela Home.

Trecho real da ação, sem comentários:

```tsx
function handleSignIn() {
  router.replace('/home');
}
```

Não há usuário e senha, token, OAuth ou consulta ao Discord nessa função. O nome do botão pertence ao protótipo, mas a ação é uma simulação acadêmica. A tela não usa useState porque não há um valor local editável ou selecionável que ela precise lembrar.

## Decisões visuais

A ilustração mantém a proporção com aspectRatio. O contêiner possui largura máxima para não esticar indefinidamente na web. marginTop negativo aproxima o texto da imagem, acompanhando a composição da referência. O botão usa row para colocar ícone e legenda lado a lado; o texto usa flex: 1 para preencher o espaço restante.

Pressable fornece pressed à função de style. O array aplica styles.buttonPressed durante o toque, reduzindo a opacidade. Isso é um feedback temporário de interação e não um estado de autenticação.

# 14. Home: listas, filtro e composição

A Home é a tela de consulta. Ela combina perfil fictício, ação de agendar, categorias e partidas. Os dados vêm de src/data/home.ts. O estado selectedCategoryId controla o filtro; showSignOut controla o modal de saída. Uma escolha não interfere na outra.

## Como a lista é calculada

Trecho real:

```tsx
const visibleAppointments = selectedCategoryId
  ? appointments.filter(
      (appointment) => appointment.categoryId === selectedCategoryId
    )
  : appointments;
```

Sem seleção, são exibidas todas as partidas. Com seleção, filter produz as correspondentes. O total usa visibleAppointments.length, por isso acompanha o resultado. A mensagem de lista vazia fica em ListEmptyComponent.

## Como o toque alterna o filtro

```tsx
setSelectedCategoryId(
  (current) => current === categoryId ? null : categoryId
);
```

Se a categoria tocada já for a atual, o estado volta a null. Se for outra, o ID muda. Essa regra pertence à Home. Em Agendar, tocar novamente na categoria atual mantém a seleção, pois a função da tela é escolher uma opção para o formulário, não alternar um filtro.

## Duas direções de rolagem

A FlatList vertical recebe visibleAppointments e renderiza AppointmentCard. O topo está em ListHeaderComponent, então saudação e categorias acompanham a rolagem principal. Dentro do cabeçalho há uma FlatList horizontal para as categorias. As direções distintas atendem ao protótipo.

keyExtractor retorna IDs estáveis. O React consegue relacionar os itens anteriores aos novos quando a lista muda. Usar o índice como identificação seria menos adequado em uma lista que pode ser filtrada. extraData={selectedCategoryId} faz a lista horizontal considerar a mudança visual de seleção mesmo mantendo o array categories.

## Delegar a ação do card

AppointmentCard recebe a partida, o rótulo da categoria e handleOpenServer. Ao toque, entrega appointment.serverId. A Home decide usar o Router. Essa separação permite explicar o card como interface e a tela como coordenadora da navegação.

O avatar abre a confirmação de saída. O botão + chama navigate('/agendar'). Nenhuma dessas ações precisa editar o array original de partidas.

# 15. Componentes reutilizáveis e suas props

Reutilização não significa transformar todos os elementos em componentes genéricos. O projeto separa elementos repetidos ou suficientemente grandes para tornar a tela mais legível. Cada componente tem poucas entradas e uma responsabilidade identificável.

| Componente | Entradas principais | Por que foi separado |
| --- | --- | --- |
| CategoryCard | category, selected, onPress e opções visuais | Repetido em duas telas e em várias categorias |
| AppointmentCard | appointment, categoryLabel, onPress opcional | Organiza cada partida da Home |
| ScreenHeader | title, onBack, onShare opcional | Reutiliza título e ações em duas telas |
| PlayerItem | player | Padroniza as linhas da lista de jogadores |
| ServerSelectModal | visible, selectedServerId, onSelect, onClose | Organiza a lista e a sobreposição |
| SignOutModal | visible, onCancel, onConfirm | Isola a confirmação sem aumentar a Home |

## CategoryCard: mesma interface, regras diferentes

O cartão recebe selected, em vez de calcular sozinho a escolha do formulário. Isso evita que cada cartão mantenha um booleano independente e mais de um fique marcado. O callback permite que Home e Agendar tenham comportamentos distintos usando a mesma aparência base.

showSelectionIndicator e dimUnselected começam em false. A Home não precisa fornecê-los e mantém a aparência original. Agendar ativa ambos. accessibilityHint também é opcional e possui texto padrão apropriado ao filtro da Home; Agendar passa uma instrução de seleção única.

## Props opcionais na prática

ScreenHeader só mostra compartilhar quando recebe onShare. Caso contrário, uma View vazia reserva a largura do botão, mantendo o título centralizado. O componente não precisa saber se está em Agendar ou em Detalhes: a presença do callback define a ação disponível.

AppointmentCard fica desabilitado se onPress não existir. A chamada onPress?.(appointment.serverId) usa encadeamento opcional. Na Home atual o callback é fornecido, então o card navega normalmente.

## O que não foi extraído

Os campos numéricos compartilham estilo, mas não viraram um componente universal de formulário. Os botões do Login e de Detalhes reutilizam o ícone, porém continuam em suas telas. A semelhança pode justificar uma extração futura; não foi necessário reestruturar uma tela funcional só para eliminar poucas linhas repetidas.

# 16. Detalhes do servidor

O arquivo servidor/[id].tsx representa uma tela capaz de mostrar qualquer servidor local conhecido. Não existe um arquivo separado para Valorosos, Lendários e os demais grupos. O parâmetro escolhe os dados que alimentam a mesma estrutura de JSX.

## Leitura e proteção contra ausência de dados

Trecho real:

```tsx
const { id } = useLocalSearchParams<{ id?: string | string[] }>();
const server = servers.find((item) => item.id === id);
```

Se o ID estiver ausente, inválido ou não corresponder a uma string esperada, find não encontra registro. O retorno antecipado if (!server) exibe um aviso e o cabeçalho de voltar. Isso evita acessar server.players quando server não existe.

## A lista de jogadores

FlatList recebe server.players. Seu cabeçalho contém banner, nome, descrição e a linha “Jogadores / Total”. Cada registro é passado a PlayerItem, que decide mostrar avatar ou iniciais. O texto e a cor do status vêm de player.status, não de um estado de presença atualizado pela rede.

O rodapé com a ação principal fica fora da lista e a lista recebe flex: 1. Isso destina a ela o espaço entre o cabeçalho e o rodapé. O banner tem imagem absoluta cobrindo sua área e um fundo translúcido sob os textos para favorecer a leitura.

## Entrar e compartilhar

handleJoin atualiza feedback com o ID atual e uma mensagem de entrada simulada. Ao renderizar, a tela só mostra a mensagem se feedback.serverId corresponder ao servidor atual. Assim, uma mensagem produzida para outro grupo não aparece como se fosse desta tela.

handleShare usa async/await para aguardar Share.share. O sistema recebe nome e descrição. Não há link de convite do Discord. Um cancelamento identificado como AbortError é ignorado; outras falhas mostram uma mensagem local de indisponibilidade. A experiência de compartilhamento depende da plataforma.

handleBack usa o histórico da pilha, com retorno para Home quando não houver histórico. O cabeçalho apenas dispara esse callback. Esse é um exemplo de componente visual reutilizável sem responsabilidade própria sobre rotas.

# 17. Agendar: uma tela, vários estados

Agendar usa uma única rota para todas as situações do protótipo. O formulário não cria novas telas quando uma categoria é selecionada, quando o teclado abre ou quando um servidor é escolhido. São mudanças de estado e de espaço disponível na mesma interface.

| Estado | Valor inicial | O que controla |
| --- | --- | --- |
| selectedCategoryId | null | Uma categoria escolhida |
| selectedServerId | null | Um grupo escolhido |
| showServerSelect | false | Visibilidade do modal de grupos |
| day, month, hour, minute | String vazia | Valores dos campos numéricos |
| description | String vazia | Texto de até 100 caracteres |
| showFeedback | false | Mensagem após tocar em Agendar |

selectedServer não aparece como outro useState porque é derivado do ID com find. Essa escolha mantém os dados do grupo em um único lugar. O booleano do modal não é o mesmo que a escolha: é possível ter um grupo escolhido com o modal fechado ou aberto.

## Exclusividade da categoria

Um único ID já impõe que só um cartão compare igual ao estado atual. Guardar quatro booleanos exigiria desmarcar os outros manualmente a cada toque. A implementação evita essa coordenação adicional.

Trecho real do array de estilos em CategoryCard:

```tsx
[
  styles.card,
  selected && styles.selected,
  showSelectionIndicator && selected && styles.selectedWithIndicator,
  pressed && styles.pressed,
  dimUnselected && !selected && styles.unselected,
]
```

styles.unselected define opacity: 0.4. Um cartão não escolhido fica apagado, inclusive ícone e texto. Ao selecionar, essa condição se torna falsa, deixando de aplicar a baixa opacidade. O cartão anterior recebe novamente o estilo. A regra aparece depois do feedback de pressionamento para não clarear indevidamente uma opção ainda não selecionada durante o toque.

showSelectionIndicator exibe o quadrado no canto. Ele fica vermelho quando selected é true. O estilo selectedWithIndicator mantém a borda azul em Agendar. Na Home, a seleção continua com borda vermelha e sem as opções visuais adicionais.

> Opacidade não significa desabilitado. Um cartão apagado continua recebendo toques. A seleção é uma regra de estado; o destaque é uma consequência dessa regra no estilo.

# 18. TextInput e formulário controlado

Um campo controlado recebe seu texto do estado e informa alterações por callback. O usuário digita, onChangeText recebe o novo texto, o setter atualiza o estado e a renderização devolve o valor para o componente. O dado não fica oculto apenas dentro do input.

Trecho de Agendar, com props visuais omitidas:

```tsx
const [day, setDay] = useState('');

<TextInput
  value={day}
  onChangeText={(text) => setDay(text.replace(/\D/g, ''))}
  keyboardType="number-pad"
  maxLength={2}
/>
```

## Por que o número é uma string

TextInput trabalha com texto. A string permite representar o campo vazio e um mês como “06” sem perder o zero. Transformar tudo em número durante a digitação dificultaria esses estados intermediários. Uma aplicação com agendamento real poderia converter e validar os valores no momento apropriado.

Na expressão regular, \D representa um caractere que não é dígito. A flag g aplica a substituição a todas as ocorrências. replace(..., '') remove esses caracteres. Isso é útil inclusive ao colar texto ou digitar pela web. keyboardType solicita um teclado adequado, mas sozinho não garante a validade do valor.

## Descrição

description é uma string separada. O input recebe value={description}, onChangeText={setDescription}, multiline e maxLength={100}. Como o setter aceita o novo texto, pode ser passado diretamente. textAlignVertical: 'top' posiciona o conteúdo no início da área de escrita.

## Limites de entrada não são validação de negócio

Dois dígitos não garantem que “99” seja um mês válido. maxLength de 100 não verifica se a descrição é útil. O projeto não impede um envio com campos vazios e não calcula datas futuras. O botão exibe apenas a mensagem de demonstração.

Quando Agendar é desmontada e depois aberta novamente, os estados começam nos valores iniciais. Abrir e fechar o modal não desmonta o formulário; por isso não apaga os campos. Não existe persistência após fechamento do app ou recarregamento.

# 19. Teclado e rolagem: o exemplo.js aplicado

O arquivo referencias/exemplo.js foi fornecido como referência de comportamento. Ele envolve o conteúdo com KeyboardAvoidingView, usa ScrollView e fecha o teclado por TouchableWithoutFeedback chamando Keyboard.dismiss. O projeto adaptou esses conceitos ao formulário existente, sem copiar funções de perfil, haptics, senha ou salvamento que não fazem parte do trabalho.

## Três necessidades distintas

| Necessidade | Recurso | O que resolve |
| --- | --- | --- |
| Ajustar espaço com teclado | KeyboardAvoidingView | Compensa a sobreposição do teclado |
| Alcançar conteúdo maior | ScrollView | Permite deslocar o formulário |
| Fechar teclado por ação | Keyboard.dismiss | Dispensa o teclado e remove foco |

KeyboardAvoidingView usa behavior="padding" no Android e iOS e fica desativado na web. A intenção é ajustar o espaço inferior quando o teclado se sobrepõe à tela. Isso depende do comportamento da plataforma; a compilação não garante que todos os campos fiquem confortáveis em todos os aparelhos.

## Estrutura simplificada, equivalente à organização atual

```tsx
<KeyboardAvoidingView behavior="padding">
  <SafeAreaView>
    <View>
      <ScreenHeader title="Agendar partida" onBack={handleBack} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={fecharTeclado}>
          <View>{/* categorias, servidor, campos e botão */}</View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  </SafeAreaView>
</KeyboardAvoidingView>
```

Este trecho omite estilos e outras props para mostrar a hierarquia. O código completo está no apêndice. A View interna é o filho único de TouchableWithoutFeedback; accessible={false} evita agrupar o formulário inteiro como um único elemento acessível.

## Props e decisões

keyboardShouldPersistTaps="handled" permite que botões tratem o toque com o teclado aberto. keyboardDismissMode usa interactive no iOS e on-drag nas demais plataformas. bounces={false} desativa o efeito elástico onde suportado. flexGrow: 1 permite preencher a altura disponível sem impedir que o conteúdo cresça e role.

fecharTeclado chama Keyboard.dismiss. A mesma função é usada ao tocar em espaço livre, abrir a seleção de servidor e acionar Agendar. Ela não altera day ou description. O botão está dentro da rolagem, o que ajuda a alcançá-lo em uma área reduzida.

> O que dizer: “Eu não movo cada campo manualmente. O contêiner ajusta o espaço com o teclado, a rolagem permite alcançar os elementos e a função fecharTeclado apenas dispensa o teclado. Os valores continuam no estado.”

# 20. Seleção de servidor: tela cinco

O bloco abaixo das categorias começa com “Selecione um servidor”, área de imagem vazia e seta. Ele é um Pressable. Quando tocado, fecha o teclado e muda showServerSelect para true. O ServerSelectModal aparece sobre Agendar, mantendo o formulário montado.

## Contrato entre tela e modal

Trecho real das funções da tela, sem comentários:

```tsx
function handleOpenServers() {
  fecharTeclado();
  setShowServerSelect(true);
}

function handleSelectServer(serverId: string) {
  setSelectedServerId(serverId);
  setShowServerSelect(false);
}
```

O modal recebe visible, selectedServerId, onSelect e onClose. Ele não tem seu próprio useState de seleção. Cada linha chama onSelect(item.id), e a função acima atualiza o formulário. O fluxo é um callback entre componentes, não uma navegação de ida e volta com objetos na URL.

## Como a lista funciona

FlatList usa servers como data, server.id como chave e selectedServerId em extraData. A indicação de seleção para leitores de tela é calculada por comparação de IDs. Cada Pressable contém a miniatura, o nome, o papel fictício no grupo e a seta.

O painel ocupa 88% da altura disponível. Sua lista pode rolar. Um fundo escuro mantém a tela anterior perceptível. O topo possui um traço que também funciona como área de fechamento por toque. Não existe implementação de gesto de arrastar o painel.

## Fechamento e preservação

Escolher um item fecha e atualiza a seleção. Tocar no fundo ou no traço fecha sem mudar o ID. onRequestClose trata o botão voltar do Android enquanto o modal está aberto. Nenhuma dessas ações limpa os campos ou troca a categoria.

Ao reabrir, o servidor escolhido continua conhecido. Ao escolher outro, o único ID é substituído, e o bloco usa find para exibir os novos dados. O formulário não está salvando uma relação no banco; está apenas representando uma escolha temporária.

# 21. Confirmação de saída

A Home possui showSignOut, inicialmente false. Tocar no avatar muda o valor para true e exibe SignOutModal. Cancelar chama onCancel, que fecha o modal. Confirmar chama onConfirm, associado a handleSignOut da Home.

Trecho real:

```tsx
function handleSignOut() {
  setShowSignOut(false);
  router.replace('/');
}
```

O modal é uma apresentação da decisão. Ele não importa o Router nem conhece detalhes da rota de Login. A Home mantém essa responsabilidade. Isso torna a separação fácil de explicar: o componente informa a intenção, e a tela decide a consequência.

## Por que não foi criada uma rota /sair

A confirmação é temporária e depende da tela atual. Ela precisa aparecer sobre a Home e permitir cancelar mantendo o filtro. Um Modal controlado por estado é suficiente e evita criar uma etapa de navegação para uma pergunta simples.

transparent e o fundo escuro permitem perceber a Home atrás do painel. animationType="fade" fornece a transição visual. onRequestClose usa o cancelamento quando o botão voltar do Android é acionado. Tocar fora também cancela. Os botões Não e Sim dividem a largura por flex: 1 em um contêiner row.

## Saída simulada não é segurança de sessão

Não há token para revogar, credenciais para apagar ou servidor para notificar. Trocar a rota pela tela inicial demonstra a saída visual. Como não existe autenticação nem proteção de rotas, abrir /home diretamente não é bloqueado por uma sessão.

> Resposta para o professor: “A confirmação usa estado e callbacks. Ao confirmar, a Home substitui sua rota pelo Login. É uma simulação do fluxo; autenticação, proteção de rotas e encerramento de sessão real estão fora do projeto.”

# 22. StyleSheet, Flexbox e adaptação de layout

StyleSheet.create organiza objetos nomeados. O JSX aplica esses objetos por style. O React Native aceita arrays de estilos; propriedades posteriores sobrescrevem anteriores. O projeto usa isso para feedback de toque, categoria selecionada e opacidade de opções não escolhidas.

## Eixos do Flexbox

O padrão dos contêineres é coluna. Nesse caso, justifyContent distribui no eixo vertical e alignItems no horizontal. Com flexDirection: 'row', o eixo principal passa a ser horizontal. Não é correto memorizar que justifyContent é sempre horizontal: ele depende da direção.

Exemplo didático equivalente ao cabeçalho da Home:

```tsx
header: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 20,
},
greeting: { flex: 1 },
```

O avatar e o botão têm dimensões definidas. greeting recebe o espaço restante. gap define a distância entre filhos. Em outras partes, justifyContent: 'space-between' separa título e total ou os dois grupos de data e horário.

## Propriedades que aparecem com frequência

| Propriedade | Interpretação no projeto |
| --- | --- |
| flex: 1 | Ocupa uma parcela flexível do espaço disponível |
| flexGrow: 1 | Permite ao conteúdo crescer e preencher espaço livre |
| flexShrink: 0 | Evita que a faixa de categorias seja comprimida |
| flexWrap: 'wrap' | Permite outra linha quando falta largura |
| padding | Espaço interno do contêiner |
| margin | Espaço externo ao elemento |
| marginTop: 'auto' | Usa espaço livre acima do rodapé quando disponível |
| maxWidth | Limita expansão em telas largas |
| minHeight | Define altura mínima, permitindo crescer com conteúdo |
| borderRadius | Arredonda os cantos |
| position: 'absolute' | Posiciona em relação à área do contêiner sem ocupar fluxo normal |

## Tamanho, cor e imagem

Os números de layout não são pixels físicos fixos: são unidades lógicas. width: '100%' usa uma proporção da largura disponível. aspectRatio preserva uma relação entre largura e altura. contentFit="contain" mostra a imagem inteira; cover preenche a área, podendo recortar bordas.

A paleta usa fundo #0D133D, áreas #1B245F, bordas #243189, textos #DDE3F0 e destaque #E91446. RajdhaniBold aparece nos títulos e Inter nos textos. O uso consistente ajuda a reconhecer hierarquia visual.

## Limitações de responsividade

Rolagem, quebra de linha e larguras máximas ajudam, mas não substituem teste em aparelho pequeno, texto ampliado, teclado aberto e áreas seguras distintas. Não houve reprodução de todos os efeitos visuais do protótipo. Esses limites precisam ser descritos com honestidade na apresentação.

# 23. Acessibilidade, assets e cuidados de interface

Acessibilidade faz parte do significado dos componentes. Um botão visual precisa comunicar sua função, e a seleção de uma categoria não deve depender apenas de uma cor para quem usa leitor de tela.

## Props usadas

accessibilityRole="button" identifica ações. accessibilityLabel fornece um nome compreensível. accessibilityHint explica a consequência do toque. accessibilityState informa selected ou disabled. accessibilityLiveRegion="polite" é usado nas mensagens, com suporte que depende da plataforma. accessibilityViewIsModal indica a sobreposição para tecnologias assistivas onde suportado.

Imagens decorativas recebem accessible={false} para não repetir informação que já aparece no texto. Um card de partida reúne em seu rótulo nome, categoria, data, horário e papel. PlayerItem também exibe “Disponível” ou “Ocupado”, além do ponto colorido.

Isso não significa que a aplicação passou por uma auditoria completa de acessibilidade. Leitor de tela, ordem de foco, contraste e texto ampliado continuam itens para verificação prática.

## Recursos locais

As imagens são carregadas por require com caminhos estáticos. Isso permite ao empacotador localizar os assets. As fontes são carregadas uma vez no layout raiz e usadas pelo nome registrado. Não há download de avatar do Discord em tempo de execução.

Os materiais vieram das referências e de recursos educacionais e públicos registrados em assets/README.md. A autoria das marcas, personagens e artes permanece com seus titulares. O projeto é uma demonstração acadêmica; usar uma imagem local não transfere sua autoria.

## Cuidar do que a interface promete

“Entrar com Discord” acompanha a referência, mas a dica e a documentação esclarecem a simulação. “Agendar” não exibe uma confirmação falsa de salvamento: informa que nenhum agendamento foi salvo. Compartilhar envia texto ao sistema, sem afirmar que criou um convite.

As categorias apagadas não ficam disabled. Desativá-las impediria justamente a ação de escolhê-las. Esse é um exemplo importante da diferença entre aparência e comportamento.

# 24. Decisões técnicas e alternativas

Uma boa defesa do projeto relaciona cada escolha a uma necessidade. A solução atual foi dimensionada para quatro telas, poucos dados e uma apresentação acadêmica.

| Escolha | Motivo concreto | Quando reavaliar |
| --- | --- | --- |
| Estado local | Cada formulário/filtro pertence a uma tela | Dados compartilhados e mutáveis entre muitas telas |
| ID na rota | Endereço simples e busca em fonte definida | Integração real ainda pode preservar o mesmo padrão |
| Modal para grupo | Seleção temporária mantém formulário montado | Fluxo de seleção grande e independente |
| Dados em src/data | Clareza e reutilização sem backend | Quando existir API e necessidade de carregamento |
| Estilos no arquivo | Leitura direta de cada tela | Repetição visual extensa ou tema dinâmico real |
| Sem biblioteca de formulário | Cinco campos simples com estado local | Formulários complexos e muitas regras |
| Componentes pequenos | Repetição real e organização | Novos usos demonstrarem uma abstração comum |

## Exemplo didático: uma escolha versus vários booleanos

Uma alternativa seria guardar rankedSelected, duelSelected, funSelected e trainingSelected. Cada toque precisaria marcar um e desmarcar três. É possível implementar corretamente, mas cria combinações inválidas, como dois valores true.

```tsx
// Padrão adotado: uma única informação representa a escolha.
const [selectedCategoryId, setSelectedCategoryId] =
  useState<CategoryId | null>(null);
```

## Exemplo didático: cálculo em vez de sincronização

```tsx
// O projeto calcula o total do resultado atual.
const total = visibleAppointments.length;
```

Esse exemplo dá um nome ao cálculo para explicá-lo; no JSX real, a expressão é usada diretamente. Não existe um useState chamado total na Home. Criá-lo exigiria sincronizá-lo com o filtro, sem benefício neste caso.

## Exemplo didático: callback em vez de dependência de navegação

Um AppointmentCard poderia importar router e navegar sozinho. O projeto preferiu receber onPress, porque a tela já coordena seus destinos. O card comunica um ID, e a Home escolhe o comportamento. Isso reduz a responsabilidade do componente sem criar um sistema de eventos complexo.

Não foi criado backend, armazenamento, autenticação ou validação real. Essas seriam evoluções de escopo, não funcionalidades escondidas em bibliotecas existentes. As decisões atuais precisam ser julgadas pelo objetivo acadêmico que atendem.

# 25. Verificações, limites e demonstração manual

## O que foi verificado tecnicamente

O histórico registra execução de TypeScript com noEmit e verificações de variáveis/parâmetros não usados. Após a seleção de servidor, a exportação Expo gerou bundles Android, iOS e web e 13 rotas estáticas. Isso inclui rotas da infraestrutura e do template, além das telas principais.

Na etapa de comentários, o JavaScript gerado sem comentários foi comparado antes e depois nos 13 arquivos principais. As saídas permaneceram idênticas. Esse resultado confirma que a documentação no código não mudou o código executável gerado.

ESLint foi tentado, mas não está configurado. A instalação foi recusada conforme a decisão de não configurá-lo por enquanto. Não se deve registrar “lint passou”. A exportação anterior mostrou aviso relacionado às variáveis de cor do ambiente, não uma comprovação de ausência de warnings em toda execução nativa.

## O que a compilação não prova

- Não prova fidelidade visual pixel a pixel ao protótipo.
- Não prova que o teclado ficou confortável em todos os aparelhos.
- Não prova o funcionamento por toque em Android e iOS reais.
- Não transforma o formulário em um agendamento persistido.
- Não comprova autenticação, autorização ou presença online.

## Roteiro de demonstração do fluxo

1. Abrir Login e tocar em Entrar com Discord; explicar replace.
2. Na Home, mostrar saudação, categorias e total de partidas.
3. Selecionar uma categoria; repetir o toque e mostrar que o filtro sai.
4. Abrir uma partida; explicar seu serverId e a busca em Detalhes.
5. Voltar; conferir que não foi criada uma nova Home desnecessariamente.
6. Tocar em +; mostrar o formulário vazio e categorias apagadas.
7. Escolher duas categorias sucessivamente; mostrar a exclusividade.
8. Abrir o seletor, escolher Valorosos, reabrir e trocar o grupo.
9. Preencher dia, mês, hora, minuto e descrição; mostrar o teclado e a rolagem.
10. Fechar a lista sem escolher e confirmar que os campos permanecem.
11. Tocar em Agendar; ler a mensagem de demonstração.
12. Voltar à Home, abrir saída pelo avatar, cancelar e depois confirmar.

Esse roteiro ainda deve ser executado no aparelho que será usado na apresentação. Registre plataforma, tamanho de tela e resultado. Se uma ação não funcionar, relate o caso concreto; não substitua o teste por uma afirmação baseada apenas na leitura do código.

# 26. Roteiro para explicar o projeto ao professor

## Abertura: propósito e limite

“O GrupoGame é uma demonstração de organização de partidas. Desenvolvemos quatro telas principais usando React Native com Expo e TypeScript. O objetivo foi reproduzir as referências e demonstrar componentes, navegação e estado local. Os dados são simulados e não existe autenticação real ou salvamento.”

## Arquitetura: explique o motivo, não só o nome

“src/app define as rotas e coordena as telas. src/components contém partes repetidas ou grandes o suficiente para separar. src/data organiza os registros de demonstração e seus tipos. assets guarda imagens e fontes, enquanto referencias guarda o material visual. Mantive os estilos próximos da interface porque isso facilita ler o projeto nesta escala.”

## Demonstração guiada pelo código

Abra _layout.tsx para explicar fontes e Stack. Em index.tsx, mostre JSX e o onPress. Em home.tsx, localize selectedCategoryId e visibleAppointments. Abra CategoryCard para mostrar como uma prop calculada altera o estilo. Em Detalhes, mostre useLocalSearchParams e find.

Em Agendar, siga a sequência completa: useState do ID, comparação em selected, callback que muda o estado e opacidade condicional. Depois mostre um TextInput controlado. Abra o modal de grupos e explique que onSelect retorna um ID à tela. Termine com fecharTeclado e a diferença entre ajustar espaço, rolar e dispensar o teclado.

## Modelo de resposta para qualquer trecho

1. **Responsabilidade:** “Este trecho controla a escolha da categoria.”
2. **Entrada:** “Ele recebe o ID da opção tocada.”
3. **Transformação:** “O setter troca o ID guardado.”
4. **Resultado:** “A próxima renderização destaca apenas esse cartão.”
5. **Motivo:** “Um único ID evita seleções simultâneas.”

## Como reagir a uma pergunta que você não sabe

Localize o componente, as props e a função chamada. Explique o que é verificável no código antes de supor uma resposta. Se for um recurso não implementado, diga isso: “Não há persistência nesta etapa; o estado dura enquanto a tela está montada.” É melhor delimitar o trabalho do que prometer um comportamento inexistente.

Não é necessário decorar cada tamanho e cada cor. É importante saber por que uma linha usa flexDirection, por que um campo é string, por que uma lista tem key e quem é o dono do estado. Use o apêndice como consulta, não como texto para ler inteiro durante a apresentação.

# 27. Perguntas que podem aparecer na banca

## Fundamentos

**Qual a diferença entre React e React Native?** React fornece componentes e o modelo de atualização da interface; React Native fornece componentes e integração para construir interfaces nas plataformas suportadas. Expo organiza ferramentas e módulos usados pelo projeto.

**O que é JSX?** É a sintaxe usada para descrever a árvore de componentes. As chaves permitem expressões JavaScript, e as tags recebem props.

**Por que usar TypeScript?** Para verificar contratos de dados e componentes durante o desenvolvimento. Ele ajuda a detectar usos incorretos, mas não valida uma data de calendário por si só.

**O que diferencia prop de estado?** A prop é recebida de fora do componente; o estado é mantido por uma instância. No CategoryCard, selected é prop. Na tela Agendar, selectedCategoryId é estado.

## Arquitetura e componentes

**Por que componentes não ficam em app?** Porque essa pasta define rotas no Expo Router. Separá-los evita destinos acidentais e deixa claro o que é tela.

**Por que os tipos ficam em data?** Eles são pequenos e descrevem diretamente os registros simulados. Uma pasta types separada não resolveria uma necessidade atual.

**O projeto usa MVC?** Não há uma implementação formal desse padrão. A separação escolhida é por responsabilidade: rotas/telas, componentes e dados locais.

**Por que não usou Redux?** Os estados pertencem a telas específicas e o compartilhamento necessário é resolvido por props e callbacks. Não há estado global complexo que justifique a dependência.

**Por que criar um modal separado se ele é usado só uma vez?** Porque ele contém uma lista ou confirmação com árvore visual e estilos próprios, e a separação deixa a tela significativamente mais legível.

## Estado e listas

**Como garante apenas uma categoria selecionada?** Guardando um único ID e comparando cada cartão a ele. Só um ID pode corresponder ao valor atual.

**Por que a categoria da Home pode ser desmarcada e a de Agendar não?** A Home alterna um filtro; Agendar escolhe uma opção do formulário. Cada tela passa um callback adequado à sua regra.

**Qual a diferença entre map, filter e find?** map transforma todos os itens; filter retorna um array de correspondências; find retorna a primeira correspondência ou undefined.

**Por que usar key?** Para identificar itens de forma estável entre renderizações. Um ID estável é mais apropriado que a posição em listas que mudam ou são filtradas.

**Por que extraData?** Para a FlatList considerar a mudança de um valor que afeta seus itens, como seleção, mesmo quando data mantém a mesma referência.

**Os dados locais são estado?** Não. São arrays exportados. O estado guarda escolhas e entradas do usuário; a tela consulta os arrays para obter informações.

## Navegação e formulário

**Por que passar somente um ID na rota?** Para manter o endereço simples e buscar os dados em uma origem definida. O destino também consegue lidar com acesso direto e ID inexistente.

**Qual a diferença entre back e replace?** back usa o histórico para retornar; replace troca o destino atual. O fallback sem histórico usa replace para Home.

**O modal cria outra tela na pilha?** Não. Ele é uma sobreposição controlada por estado e mantém a tela anterior montada.

**Por que o dia é uma string?** Porque o campo pode estar vazio e precisa preservar zeros à esquerda. A entrada textual pode ser convertida e validada em uma etapa futura.

**O teclado numérico valida o horário?** Não. Ele facilita digitar. O código remove não dígitos e limita o comprimento, mas não valida intervalos de hora e minuto.

**O que faz KeyboardAvoidingView?** Ajusta o layout em resposta ao teclado. ScrollView permite alcançar o conteúdo e Keyboard.dismiss fecha o teclado. São funções diferentes.

**Fechar o modal apaga o formulário?** Não, porque os estados continuam em Agendar. Ao desmontar e reabrir a rota, os valores iniciais são recriados.

## Limites e qualidade

**Login e saída são reais?** São fluxos visuais simulados. Não existe token, OAuth, proteção de rota ou sessão Discord.

**Agendar salva na Home?** Não. O botão apenas informa a demonstração. Não altera o array de partidas nem grava em banco.

**Compilar significa que tudo foi testado?** Não. TypeScript verifica tipos e a exportação gera bundles. Toque, teclado, aparência e acessibilidade exigem testes de interface.

**Por que algumas capas são diferentes?** Foram reutilizados assets locais disponíveis e registrados. A estrutura segue as referências, mas alguns recortes exatos não estavam disponíveis.

# 28. Exercícios e respostas esperadas

Use estes exercícios para treinar explicações e prever o comportamento. Eles não pedem alteração do aplicativo entregue.

## 1. Preveja a seleção

Agendar começa com null. O usuário toca em Duelo 1x1 e depois em Treino. Qual estado fica guardado e quais cartões ficam apagados?

**Resposta:** 'training'. Apenas Treino recebe selected=true. As outras categorias recebem o estilo de opacidade 0,4. Não existem três operações extras para desmarcá-las.

## 2. Compare as duas telas

Na Home, toque duas vezes em Diversão. Repita em Agendar. O que muda?

**Resposta:** a Home termina sem filtro, pois a segunda seleção retorna a null. Agendar continua com 'fun', porque o callback apenas atribui o ID tocado.

## 3. Explique a busca sem resultado

O endereço contém /servidor/inexistente. O que acontece?

**Resposta:** find não encontra um servidor. O retorno antecipado exibe a mensagem apropriada com voltar; o código não tenta renderizar players de undefined.

## 4. Diferencie callback de execução imediata

Por que onPress={handleBack} e onPress={() => handleSelectServer(item.id)} são válidos?

**Resposta:** ambos passam funções para executar no toque. O primeiro já possui tudo de que precisa; o segundo cria uma função para fornecer o ID do item. Chamar handleSelectServer(item.id) diretamente no valor da prop executaria a ação durante a renderização.

## 5. Pense no campo controlado

O usuário cola “a2b” no dia. O que a função de mudança tenta armazenar?

**Resposta:** ela remove os caracteres não numéricos do texto recebido. O maxLength também participa do processamento do input, então a entrada recebida pode ser limitada pela plataforma. O conceito a explicar é que a função armazena somente os dígitos que chegam ao callback, sem garantir uma data válida.

## 6. Separe aparências de regras

Se opacity fosse 0,4 mas onPress continuasse funcionando, o cartão estaria desabilitado?

**Resposta:** não. Estaria apenas apagado visualmente. disabled seria outra prop com efeito no comportamento de interação.

## 7. Demonstre o ciclo completo do servidor

Explique, sem ler o código, como o toque em Valorosos chega ao formulário.

**Resposta:** a linha do modal chama onSelect com o ID. Agendar recebe o callback, atualiza selectedServerId e fecha o modal. Na próxima renderização, find localiza Valorosos e o bloco mostra nome, imagem e jogo.

## 8. Identifique uma evolução e seu impacto

Se futuramente fosse necessário salvar partidas, bastaria mudar o texto da mensagem?

**Resposta:** não. Seriam necessários requisitos de validação, persistência, tratamento de falhas e atualização da fonte de dados da Home. Essa evolução não está implementada e exigiria novo escopo.

# 29. Glossário e mapa de consulta

| Termo | Significado neste projeto |
| --- | --- |
| Componente | Função que descreve uma parte da interface |
| JSX | Sintaxe de composição visual com expressões JavaScript |
| Prop | Entrada recebida por um componente |
| Estado | Informação mantida entre renderizações da instância |
| Setter | Função usada para solicitar atualização de estado |
| Callback | Função fornecida para ser chamada em resposta a uma ação |
| Hook | Recurso como useState ou useEffect usado por componentes |
| Renderização | Cálculo da descrição visual a partir dos valores atuais |
| Dado derivado | Resultado calculado de dados, props ou estado |
| Rota | Caminho associado a uma tela |
| Stack | Organização de destinos em pilha |
| Parâmetro | Valor usado para identificar ou configurar um destino |
| Modal | Sobreposição temporária controlada pela interface |
| Asset | Arquivo de imagem, ícone, fonte ou outro recurso |
| Bundle | Código e recursos preparados para uma plataforma |
| Persistência | Armazenamento que sobrevive ao estado temporário da tela |
| Mock | Dado ou comportamento simulado para demonstração |
| Tipagem estática | Verificação de contratos de código antes da execução |

## Em qual arquivo encontro cada assunto?

Fontes e useEffect: _layout.tsx. Entrada simulada: index.tsx. Filtro e total: home.tsx. Parâmetro e servidor inexistente: servidor/[id].tsx. Formulário e teclado: agendar.tsx. Props e estilo condicional: category-card.tsx. ID enviado pelo card: appointment-card.tsx. Props opcionais: screen-header.tsx. Avatar alternativo: player-item.tsx. Lista de grupos: server-select-modal.tsx. Confirmação: sign-out-modal.tsx. Tipos e registros: os dois arquivos de data.

## Como usar o apêndice

Os capítulos A01 a A13 contêm os arquivos funcionais completos e comentados. A14 a A16 contêm package.json, tsconfig.json e app.json. Não incluem node_modules nem os exemplos preservados do template, porque estes não compõem as quatro telas do trabalho. O material principal explica o papel desses arquivos preservados.

O código é uma fotografia desta edição. Se o projeto mudar depois, gere novamente a apostila para não apresentar uma versão antiga. A origem e o hash dos arquivos transcritos são registrados no arquivo de fontes gerado junto do PDF.

# 30. Referências e critérios de evidência

## Fonte principal: o próprio projeto

Esta apostila foi construída a partir dos arquivos de src/app, src/components e src/data, das configurações da raiz, dos documentos de docs e das imagens de referencias. O código completo transcrito no apêndice é a principal evidência de como a implementação funciona. As decisões históricas foram conferidas com a implementação atual para não manter Valorosos como fixo ou o seletor como excluído.

## Documentação técnica

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/): referência correspondente ao SDK declarado.
- [Expo Router: navegação](https://docs.expo.dev/router/basics/navigation/): destinos, pilha e parâmetros.
- [Expo Font](https://docs.expo.dev/versions/v57.0.0/sdk/font/): carregamento de fontes locais.
- [Expo Symbols](https://docs.expo.dev/versions/v57.0.0/sdk/symbols/): nomes de símbolos por plataforma.
- [React Native 0.86: FlatList](https://reactnative.dev/docs/0.86/flatlist): listas, chaves e extraData.
- [React Native 0.86: Modal](https://reactnative.dev/docs/0.86/modal): sobreposição e fechamento.
- [React Native 0.86: TextInput](https://reactnative.dev/docs/0.86/textinput): entradas de texto e props.
- [React Native 0.86: KeyboardAvoidingView](https://reactnative.dev/docs/0.86/keyboardavoidingview): ajuste de layout para teclado.
- [React Native 0.86: ScrollView](https://reactnative.dev/docs/0.86/scrollview): conteúdo rolável e interação com teclado.
- [React: estado como fotografia](https://react.dev/learn/state-as-a-snapshot): valores de cada renderização.
- [React: compartilhar estado](https://react.dev/learn/sharing-state-between-components): dono do estado e comunicação por props.
- [TypeScript: tipos do cotidiano](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html): unions, arrays e tipos de objetos.

As explicações dos capítulos relacionam esses conceitos ao código do projeto; não são transcrições dos manuais. O conteúdo deve ser lido junto da versão instalada, pois APIs de Expo e React Native mudam entre versões.

## Origem visual

Os protótipos foram fornecidos na pasta referencias. assets/README.md registra as fontes dos recursos locais, incluindo materiais educacionais GamePlay/NLW da Rocketseat, fontes Google Fonts e capas/logos usados na demonstração. Esta apostila não atribui a autoria dessas artes ao desenvolvimento do aplicativo.

## Declaração de limites

Os registros de compilação e exportação são evidências técnicas das etapas executadas. Não foram tratados como prova de interação em aparelho ou comparação pixel a pixel. O app não possui autenticação real, banco de dados, persistência de formulário, calendário validado ou sincronização com servidores externos. Esses limites fazem parte de uma explicação correta do trabalho.
