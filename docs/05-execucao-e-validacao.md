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

A instalação das dependências existentes em uma nova cópia pode ser feita com `npm ci`, usando o `package-lock.json`. Nenhuma instalação de dependências foi necessária para implementar Login ou Home nesta cópia.

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

## Roteiro manual pendente — Login e transição para Home

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
- [ ] Executar também o roteiro de filtros, listas e ações desativadas em [Tela Home explicada](./06-tela-home.md).

Para voltar a observar o Login na web após a navegação, abrir a URL raiz `/` diretamente. Como a entrada usa `replace`, o Login não é mantido como tela anterior dessa navegação. Para uma nova demonstração no aplicativo nativo, reabrir a rota inicial.

Ao realizar os testes, registrar plataforma, tamanho de tela, resultado e qualquer diferença visual observada. Não marcar os itens como concluídos apenas porque a compilação passou.

## Validações futuras

Repetir verificações relevantes quando houver alterações funcionais. Configurar ESLint somente quando essa etapa for solicitada: o comando `expo lint` pode tentar instalar dependências e criar configuração quando ela não existe.

Antes de implementar novas APIs do Expo ou React Native, consultar a documentação correspondente à versão instalada, conforme [AGENTS.md](../AGENTS.md). A documentação desta pasta não substitui essa consulta.
