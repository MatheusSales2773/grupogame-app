# Confirmação de saída

[Voltar ao índice](./README.md)

O modal de saída havia ficado fora das quatro telas solicitadas inicialmente. Foi acrescentado após o relato de que a tela de sair não funcionava, usando `referencias/tela-08-sair.png` como referência. O modal da lista de servidores continua excluído.

## Como usar

1. Na Home, tocar no avatar do usuário.
2. A Home fica escurecida e aparece a confirmação na parte inferior.
3. **Não** fecha o modal e mantém a Home com seu filtro.
4. **Sim** fecha o modal e usa `router.replace('/')` para voltar ao Login.

Tocar no fundo escuro também cancela. O botão voltar do Android, enquanto o modal está aberto, chama `onRequestClose` e cancela a confirmação. Não há interceptação do botão voltar do sistema quando o modal está fechado. O texto GamePlay segue a referência visual; o nome do projeto permanece GrupoGame.

## Código e conceitos

- [Home](../src/app/home.tsx): envolve o avatar em `Pressable`, mantém `showSignOut` com `useState` e fornece as ações.
- [SignOutModal](../src/components/sign-out-modal.tsx): componente específico para organizar a sobreposição, pergunta e botões sem aumentar o JSX da lista.
- `visible`: prop booleana que controla a exibição do `Modal` nativo.
- `onCancel`: callback que atualiza `showSignOut` para `false`.
- `onConfirm`: callback que fecha o modal e substitui a Home pelo Login.
- `transparent` permite enxergar a Home sob o fundo escuro; `animationType="fade"` faz a transição de opacidade.
- `justifyContent: 'flex-end'` coloca o painel embaixo. Os botões usam linha e `flex: 1` para dividir a largura. `SafeAreaView` protege a área inferior.

Não é uma nova rota. Não usa biblioteca adicional, autenticação real, token ou limpeza de sessão do Discord. No fluxo normal, Login → Home já usa `replace`; sair usa `replace` novamente, sem manter a Home como tela anterior da saída. Isso controla o histórico, não protege rotas contra acesso direto.

## Validação

TypeScript com verificação de itens não utilizados e exportação Android/iOS/web passaram. A exportação usou `npx.cmd expo export --platform all --output-dir "$env:TEMP\grupogame-signout-check"`, com execução autorizada do Hermes fora do sandbox. ESLint permaneceu sem configuração; sua instalação foi recusada. O teste por toque em aparelho permanece necessário.

- [ ] Tocar no avatar e comparar o modal com a referência.
- [ ] Cancelar por Não, fundo escuro e voltar do Android com modal aberto.
- [ ] Confirmar por Sim e conferir o retorno ao Login.
- [ ] Entrar novamente e confirmar que o modal começa fechado.
- [ ] Conferir que o filtro, os cards e o `+` continuam funcionando.

Referências: [Modal no React Native 0.86](https://reactnative.dev/docs/0.86/modal) e [navegação do Expo Router](https://docs.expo.dev/router/basics/navigation/).
