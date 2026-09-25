# Execução e validação

[Voltar ao índice](./README.md)

## Executar o projeto

Na pasta raiz, com as dependências já instaladas:

```sh
npm start
```

Para iniciar diretamente a versão web:

```sh
npm run web
```

Também existem `npm run android` e `npm run ios`, que iniciam o Expo para essas plataformas e dependem de um ambiente compatível. Não é necessário executar o script `reset-project`.

A instalação das dependências existentes em uma nova cópia pode ser feita com `npm ci`, usando o `package-lock.json`. Nenhuma instalação de dependências foi necessária para implementar Login, Home, Detalhes ou Agendar nesta cópia.

## Checagem de TypeScript

```sh
npx tsc --noEmit --incremental false
```

O comando verifica tipos sem emitir JavaScript nem arquivo incremental de compilação.

Na análise inicial, ocorreram erros de declaração nos imports `animated-icon.module.css` e `@/global.css`. Após iniciar o Expo, as declarações geradas pelo ambiente permitiram que a checagem passasse. Não foi feita correção manual nos componentes antigos para resolver isso.

O Expo pode gerar arquivos locais ignorados pelo Git, como `expo-env.d.ts` e conteúdo de `.expo/`. Eles não representam novas telas nem alterações manuais na configuração do projeto.

## Registro da validação do Login

| Verificação | Resultado |
| --- | --- |
| Checagem TypeScript após iniciar o Expo | Passou |
| `git diff --check` | Sem erros de whitespace; houve avisos de normalização LF/CRLF |
| Exportação de bundle Android | Passou |
| Exportação de bundle iOS | Passou |
| Exportação web e rotas estáticas | Passou |
| Instalação/execução em aparelho ou emulador | Não validada nesta etapa |
| Comparação visual da tela renderizada | Pendente |
| Toque e navegação em execução | Pendente; ligação verificada no código |
| ESLint | Não configurado nem executado, conforme orientação |

Na validação de exportação foi utilizado, no PowerShell:

```powershell
npx expo export --platform all --output-dir "$env:TEMP\grupogame-login-check"
```

A saída foi gravada fora do repositório, em uma pasta temporária. A primeira tentativa foi bloqueada por permissão de execução do compilador Hermes; a repetição autorizada fora do sandbox concluiu com sucesso. Não foi necessário alterar o aplicativo por causa disso.

O servidor de desenvolvimento chegou a iniciar, mas não havia navegador conectado disponível para interação automatizada. Ele foi encerrado ao terminar a verificação. Para visualizar a tela, iniciar novamente com os comandos acima.

Exportar bundles verifica a compilação; não gera por si só um aplicativo instalado nem comprova que o layout está correto em todos os aparelhos.

## Registro da validação da Home

As verificações abaixo foram realizadas ao implementar a segunda tela; não foram repetidas nesta atualização exclusivamente documental.

| Verificação | Resultado |
| --- | --- |
| `tsc --noEmit --incremental false` | Passou |
| Exportação de bundles Android, iOS e web | Passou |
| `git diff --check` | Sem erros de whitespace; avisos de normalização LF/CRLF |
| Comparação dos hashes de Login, layout e `package.json` | Arquivos preservados durante a implementação da Home |
| Links locais da documentação | Sem destinos ausentes na conferência da etapa |
| Comparação visual, filtros e toques no aparelho | Pendentes |
| ESLint | Não configurado nem executado, conforme orientação |

A exportação utilizou `npx expo export --platform all --output-dir "$env:TEMP\grupogame-home-check"`, no PowerShell, com saída temporária fora do repositório. Não havia navegador conectado para a conferência visual. Os resultados completos e o roteiro manual da Home estão em [Tela Home explicada](./06-tela-home.md).

## Registro da validação de Detalhes do servidor

| Verificação | Resultado |
| --- | --- |
| `npx.cmd tsc --noEmit --incremental false` | Passou |
| Exportação de bundles Android, iOS e web | Passou |
| Rotas web dos seis servidores simulados | Geradas na exportação estática |
| Correspondência entre partidas e servidores, IDs e assets | Seis correspondências válidas; sem IDs duplicados ou assets ausentes |
| Conteúdo dos seis arquivos HTML exportados | Cada página contém o nome correto e o botão principal |
| Links locais em `docs/` e `assets/README.md` | 73 destinos conferidos, sem arquivos ausentes |
| Hashes de Login, layout, dados e cartões da Home, `package.json` | Preservados |
| Mudanças em `home.tsx` | Restritas ao import do Router, handler e prop de navegação |
| `git diff --check` | Sem erros de whitespace; avisos LF/CRLF |
| `npx.cmd expo lint` | Interrompido: ESLint não configurado; recusada instalação/configuração |
| Conferência visual e testes de toque | Pendentes; nenhum navegador ou aparelho conectado disponível |

O primeiro comando `npx` foi recusado pela política de scripts do PowerShell. Utilizar `npx.cmd` permitiu executar as ferramentas sem mudar a política do sistema. A checagem inicial também identificou o nome antigo `StyleSheet.absoluteFillObject`; o código foi ajustado para `StyleSheet.absoluteFill`, disponível no React Native 0.86, e a verificação passou.

```powershell
npx.cmd tsc --noEmit --incremental false
npx.cmd expo export --platform all --output-dir "$env:TEMP\grupogame-details-check"
```

A exportação usou execução autorizada fora do sandbox para o compilador Hermes, com saída temporária. Nenhum build foi publicado nem instalado em dispositivo. A tentativa de lint cumpriu a verificação prevista em `AGENTS.md`, mas a análise do ESLint não foi concluída: sua configuração continua adiada conforme orientação do trabalho.

O roteiro de IDs, retorno, simulação, compartilhamento e telas pequenas está em [Detalhes do servidor](./08-detalhes-do-servidor.md). Os testes manuais continuam pendentes.

## Registro da validação de Agendar

| Verificação | Resultado |
| --- | --- |
| `npx.cmd tsc --noEmit --incremental false` | Passou |
| Exportação de bundles Android, iOS e web | Passou; 13 rotas estáticas, incluindo `/agendar` |
| Hashes de Login, Detalhes, layout, cabeçalho, jogador, cartão de partida, dados e dependências | Dez arquivos preservados |
| Alteração no `CategoryCard` | Somente prop opcional de acessibilidade, com padrão anterior mantido |
| Alteração na Home nesta etapa | Ativação do `+` com destino `/agendar` |
| HTML exportado de `/agendar` | Contém servidor, quatro campos numéricos e uma área de descrição |
| Links locais da documentação | 89 destinos válidos |
| `git diff --check` | Sem erros de whitespace; avisos LF/CRLF |
| `npx.cmd expo lint` | Não concluiu: configuração ausente; recusada instalação/configuração |
| Execução visual, seleção, digitação e teclado em aparelho | Pendentes; nenhum navegador conectado disponível |

Comandos utilizados no PowerShell:

```powershell
npx.cmd tsc --noEmit --incremental false
npx.cmd expo export --platform all --output-dir "$env:TEMP\grupogame-schedule-check"
```

A exportação foi autorizada fora do sandbox para execução do Hermes e gravou somente em pasta temporária. Não houve publicação ou instalação em aparelho. A configuração de ESLint permaneceu adiada. Os testes de teclado não podem ser considerados concluídos pela checagem de tipos ou geração dos bundles.

O roteiro de categorias, campos, limite de descrição, teclado, rolagem, retorno e simulação está em [Tela Agendar](./09-tela-agendar.md).

## Revisão final das quatro telas

Após os ajustes, passaram `npx.cmd tsc --noEmit --incremental false --noUnusedLocals --noUnusedParameters` e a exportação Android/iOS/web para `$env:TEMP\grupogame-final-review`. Foram geradas 13 rotas, com os nove endereços principais conferidos no HTML. Imports e assets locais, IDs e correspondências entre partidas/servidores também passaram.

O teste isolado da implementação real de `StackRouter` reproduziu duplicação com duas ações `PUSH`. Com `NAVIGATE`, Detalhes e Agendar mantiveram somente um destino; voltar preservou a chave da Home. A Home foi ajustada para usar `router.navigate`. O caso de acesso direto sem histórico também foi conferido isoladamente.

A revisão acrescentou o marcador de seleção de categorias somente em Agendar. Não houve alteração de Login, Detalhes, configuração ou dependências. ESLint permaneceu sem configuração; sua instalação foi recusada. A exportação emitiu somente aviso de cores do ambiente, sem warning de React Native observado nessa etapa.

Não houve navegador/aparelho conectado. Não foram executados testes por toque, digitação, rolagem ou teclado em uma interface renderizada, nem comparação de screenshots do aplicativo. Os resultados, diferenças visuais e limitações estão em [Revisão final](./10-revisao-final.md).

## 24/09/2026 — Ajuste de teclado baseado no exemplo

TypeScript com verificação de itens não utilizados passou, assim como a exportação Android/iOS/web para `$env:TEMP\grupogame-keyboard-check`. A etapa adaptou Agendar com `behavior="padding"`, fechamento por toque no espaço livre e `fecharTeclado()`, preservando os campos controlados.

O lint continuou sem configuração e nenhuma dependência foi instalada. Não havia aparelho ou navegador conectado; o ajuste visual do teclado e os toques ainda precisam ser testados. Explicação e roteiro em [Teclado e rolagem](./12-teclado-e-rolagem.md).

## Roteiro manual pendente — Login e transição para Home

### Ajuste de opacidade em Agendar — 24/09/2026

`npx.cmd tsc --noEmit --incremental false --noUnusedLocals --noUnusedParameters` passou após a adição da prop `dimUnselected`. O comando `npx.cmd expo lint` solicitou instalar/configurar ESLint; a instalação foi recusada conforme a orientação do projeto. Nenhuma dependência foi adicionada. Não foi repetida a exportação, pois a mudança se limita a uma prop e um estilo condicional.

No aparelho, conferir que todas as categorias começam apagadas, apenas a escolhida fica com cores normais e a anterior volta à opacidade 0,4 ao trocar. Confirmar também que a Home mantém seu visual. Essa conferência visual ainda não foi executada.

### Login

- [ ] Abrir o aplicativo e confirmar que o Login é a tela inicial.
- [ ] Comparar ilustração, título, descrição, botão e espaçamentos com `referencias/tela-01-login.png`.
- [ ] Confirmar que Rajdhani e Inter carregam corretamente.
- [ ] Verificar que não há abas Home/Explore na interface do Login.
- [ ] Conferir áreas seguras e barra de status.
- [ ] Testar uma tela de altura pequena e verificar a rolagem.
- [ ] Testar texto ampliado e verificar se o botão permanece acessível.
- [ ] Pressionar o botão e observar a redução de opacidade.
- [ ] Soltar o botão e confirmar a navegação para `/home`.
- [ ] Confirmar que o destino mostra a Home com saudação, categorias e seis partidas, sem erro de rota inexistente.
- [ ] Confirmar que não é aberto login externo do Discord.
- [ ] Executar também os roteiros de [Home](./06-tela-home.md), [Detalhes](./08-detalhes-do-servidor.md) e [Agendar](./09-tela-agendar.md).

Para voltar a observar o Login na web após a navegação, abrir a URL raiz `/` diretamente. Como a entrada usa `replace`, o Login não é mantido como tela anterior dessa navegação. Para uma nova demonstração no aplicativo nativo, reabrir a rota inicial.

Ao realizar os testes, registrar plataforma, tamanho de tela, resultado e qualquer diferença visual observada. Não marcar os itens como concluídos apenas porque a compilação passou.

## 24/09/2026 — Seleção de servidor em Agendar

- Passou: `npx.cmd tsc --noEmit --incremental false --noUnusedLocals --noUnusedParameters`.
- Passou: `npx.cmd expo export --platform all --output-dir "$env:TEMP\grupogame-server-select-check"`, gerando bundles Android/iOS/web e 13 rotas estáticas.
- `npx.cmd expo lint` foi executado, mas não concluiu: não existe configuração de ESLint. A oferta de instalação foi recusada conforme solicitado; nenhum pacote foi adicionado.
- A exportação mostrou apenas aviso de conflito entre `NO_COLOR` e `FORCE_COLOR` do ambiente.
- Não foram realizados testes por toque em aparelho nesta etapa. A compilação não comprova a interação do modal ou sua fidelidade visual. Roteiro em [Seleção de servidor](./13-selecao-de-servidor.md).

## Próximas validações

Repetir verificações relevantes quando houver alterações funcionais. Configurar ESLint somente quando essa etapa for solicitada: o comando `expo lint` pode tentar instalar dependências e criar configuração quando ela não existe.

Antes de implementar novas APIs do Expo ou React Native, consultar a documentação correspondente à versão instalada, conforme [AGENTS.md](../AGENTS.md). A documentação desta pasta não substitui essa consulta.
