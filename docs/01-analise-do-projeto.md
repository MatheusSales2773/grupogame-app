# Análise do projeto

[Voltar ao índice](./README.md)

## Contexto

O projeto começou com o template do Expo. Embora o componente inicial se chamasse `HomeScreen`, ele apresentava “Welcome to Expo”; não era a Home do protótipo. A análise inicial não alterou arquivos. Depois foram implementados, em etapas separadas, Login, Home, Detalhes e Agendar. Este documento preserva os achados iniciais e identifica a situação atual dos arquivos.

## Estrutura encontrada

```text
src/
  app/               Rotas e layout de navegação
  components/        Componentes do template
    ui/              Exemplo de conteúdo expansível
  constants/         Tema, fontes e espaçamentos
  hooks/             Hooks de tema
  global.css         Configuração de fontes para web
assets/              Imagens e ícones; agora também assets de Login, Home e Detalhes
referencias/         Dez imagens do protótipo
scripts/             Script de reinicialização do template
```

Na raiz há `package.json`, `package-lock.json`, `app.json`, `tsconfig.json`, README, licença e instruções para agentes. `.vscode` contém preferências do editor; `.claude` contém configuração de ferramenta de desenvolvimento. Não existem diretórios nativos `ios/` e `android/`.

O projeto utiliza npm, com `package-lock.json`, e não possui `bun.lock`. O script `reset-project` move ou remove a estrutura inicial: não foi executado e não é necessário para desenvolver as telas.

## Tecnologias

Fonte: [package.json](../package.json). Versões declaradas no momento desta documentação:

| Tecnologia | Versão | Papel |
| --- | --- | --- |
| Expo | `~57.0.24` | Ambiente do aplicativo |
| React | `19.2.3` | Componentes, renderização e hooks |
| React Native | `0.86.3` | Interface nativa |
| TypeScript | `~6.0.3` | Tipagem de código e props |
| Expo Router | `~57.0.22` | Navegação por arquivos |
| Expo Image | `~57.0.5` | Imagens, inclusive no Login |
| Expo Font | `~57.0.4` | Fontes locais do Login |
| Expo Splash Screen | `~57.0.9` | Controle da tela de abertura |
| Expo Status Bar | `~57.0.1` | Aparência da barra de status |
| Safe Area Context | `~5.7.0` | Áreas seguras da tela |
| Reanimated / Worklets | `4.5.1` / `0.10.1` | Animações do template |
| React Native Web / React DOM | `~0.21.0` / `19.2.3` | Suporte à web |

Também estão declarados `@expo/ui`, `expo-constants`, `expo-device`, `expo-glass-effect`, `expo-linking`, `expo-symbols`, `expo-system-ui`, `expo-web-browser`, `react-native-gesture-handler`, `react-native-screens` e `@types/react`. Nem todos são utilizados diretamente pelo Login; nenhuma dependência foi adicionada nessa etapa.

O TypeScript está em modo estrito. O alias `@/` aponta para `src/`, e `@/assets/` aponta para `assets/`. O `app.json` configura orientação vertical, ícones, splash, esquema de links, rotas tipadas e React Compiler. As configurações visuais de abertura do template não foram redesenhadas na etapa de Login.

## Código inicial e situação atual

| Arquivo ou grupo | Situação |
| --- | --- |
| `src/app/index.tsx` | Era a demonstração “Welcome to Expo”; agora contém o Login |
| `src/app/_layout.tsx` | Usava abas e abertura animada; agora carrega fontes e usa Stack |
| `src/app/home.tsx` | Inicialmente vazio; agora exibe saudação, categorias, partidas e filtro local |
| `src/data/home.ts` | Dados simulados e tipos de usuário, categorias e partidas |
| `category-card.tsx` e `appointment-card.tsx` | Cartões reutilizados nos itens das listas da Home |
| `src/app/servidor/[id].tsx` | Detalhes; lê ID da rota, busca dados e renderiza banner, jogadores e ações |
| `src/app/agendar.tsx` | Formulário com escolha de servidor, seleção única de categoria, campos controlados e ajuste de teclado |
| `src/data/servers.ts` | Seis servidores e grupo de jogadores simulados |
| `screen-header.tsx` e `player-item.tsx` | Cabeçalho e linhas de jogadores de Detalhes |
| `src/app/explore.tsx` | Demonstração preservada; continua sendo uma rota, sem acesso pela interface do Login |
| `app-tabs.tsx` e `app-tabs.web.tsx` | Preservados, mas não utilizados pelo layout atual |
| `themed-text.tsx` e `themed-view.tsx` | Componentes de tema preservados; podem ser avaliados nas próximas telas |
| `constants/theme.ts` e `hooks/` | Infraestrutura de tema do template, preservada |
| `animated-icon*` | Animações do template preservadas, sem uso pelo layout atual |
| `ui/collapsible.tsx` | Exemplo de estado e renderização condicional |
| `external-link.tsx` | Abertura de links externos |
| `hint-row.tsx` e `web-badge.tsx` | Elementos demonstrativos do template |

Não há backend, banco de dados, sessão autenticada ou persistência implementados.

## Referências visuais

Todas as dez imagens de [referencias](../referencias) foram analisadas:

| Arquivo | Conteúdo e uso |
| --- | --- |
| `tela-01-login.png` | Referência principal do Login: personagem, título, descrição e botão Discord |
| `tela-02-home.png` | Saudação, avatar, botão `+`, categorias e partidas agendadas |
| `tela-2.1-home.png` | Na verdade, mostra Detalhes do servidor: banner, descrição e jogadores |
| `tela-03-agendar.png` | Formulário sem categoria ou servidor selecionados |
| `tela-04-agendar-categoria- selecionada.png` | Destaque visual da categoria escolhida |
| `tela-05-selecione-servidor.png` | Modal da lista de servidores, incluído por solicitação posterior |
| `tela-06-agendar-servidor selecionado.png` | Formulário com Valorosos/Valorant selecionado |
| `tela-07-agendar.png` | Formulário preenchido com teclado aberto |
| `tela-08-sair.png` | Confirmação de saída, fora das quatro telas solicitadas |
| `Projeto-Inteiro.png` | Visão conjunta das telas e ligações do fluxo |

As imagens de Agendar representam estados da mesma tela, e não quatro telas distintas. O padrão visual usa azul escuro, botões vermelhos, textos claros, títulos condensados e categorias em faixa horizontal.

## Assets e pontos ainda indefinidos

Inicialmente, os assets eram apenas os do Expo. Para o Login foram adicionadas a ilustração e o ícone do projeto educacional original, além das fontes Rajdhani Bold e Inter. Origem e licenças estão em [assets/README.md](../assets/README.md).

Para a Home foram adicionados ícones e imagens locais de demonstração; algumas capas e o avatar diferem dos recortes da referência. A quarta categoria, parcialmente cortada, foi identificada como Treino no projeto educacional original. Detalhes usa o banner original de Lendários, reutiliza o avatar de Tiago e mostra iniciais para os outros dois jogadores. Há pequenas diferenças entre as imagens de Agendar, como os rótulos “Horário” e “Hora e minuto”.

“Entrar na partida” exibe uma confirmação de simulação. Compartilhar oferece nome e descrição ao sistema, sem link de convite. A integração real com Discord não foi implementada. Agendar foi limitado à interface e estado local: não atualiza a Home nem persiste dados. Reutiliza imagens locais e agora permite escolher o grupo pelo [modal de servidores](./13-selecao-de-servidor.md).
