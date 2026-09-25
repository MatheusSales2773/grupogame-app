# Teclado e rolagem em Agendar

[Voltar ao índice](./README.md)

Atualização de 24/09/2026, baseada no arquivo fornecido [referencias/exemplo.js](../referencias/exemplo.js). A alteração está em [src/app/agendar.tsx](../src/app/agendar.tsx).

## O que veio do exemplo

O exemplo combina três responsabilidades diferentes:

| Recurso | Responsabilidade |
| --- | --- |
| `KeyboardAvoidingView` com `behavior="padding"` | Ajustar o espaço do conteúdo quando o teclado aparece |
| `ScrollView` com `contentContainerStyle={{ flexGrow: 1 }}` | Permitir rolar quando o conteúdo não cabe na área disponível |
| `TouchableWithoutFeedback` e `Keyboard.dismiss()` | Fechar o teclado ao tocar no espaço livre |

A tela Agendar já tinha `KeyboardAvoidingView` e `ScrollView`. Antes usava `padding` no iOS e `height` no Android. Agora usa `padding` nas duas plataformas nativas, como no exemplo, e possui a função `fecharTeclado`, ligada ao toque fora dos campos e ao botão Agendar. `bounces={false}` foi acrescentado à rolagem vertical, também como no exemplo.

O exemplo original foi preservado como material de consulta. Não é importado pelo aplicativo. Sua tela de perfil, campos de senha, botões Salvar/Limpar e uso de Haptics não fazem parte deste formulário e não foram copiados. Nenhuma biblioteca foi instalada e TypeScript foi mantido.

## Quem faz a tela subir?

```tsx
<KeyboardAvoidingView
  style={styles.screen}
  enabled={Platform.OS !== 'web'}
  behavior="padding">
```

Esse componente acompanha os eventos do teclado. Com `padding`, ajusta o espaço interno inferior conforme a sobreposição com o teclado. Com o layout flexível, isso reduz a área disponível para o formulário e permite reposicionar/rolar o conteúdo acima dele. Ao fechar o teclado, o espaço é restaurado. Não há um deslocamento fixo em pixels nem uma função nossa alterando manualmente a posição de cada campo.

`styles.screen` usa `flex: 1` para preencher a tela. O ajuste começa no topo, envolvendo área segura e cabeçalho; não foi adicionado `keyboardVerticalOffset`, pois não existe um cabeçalho nativo externo sobreposto a esse contêiner. Na web, `enabled` fica falso: o navegador administra a área visível e a página continua rolável.

`padding` e `height` são estratégias diferentes do componente, não sinônimos. A mudança acompanha o exemplo fornecido; não significa que `padding` seja universalmente superior. O efeito precisa ser testado no dispositivo, pois o sistema e o modo de redimensionamento da janela também influenciam o teclado.

## Para que serve fecharTeclado?

```tsx
function fecharTeclado() {
  Keyboard.dismiss();
}
```

`Keyboard.dismiss()` fecha o teclado e remove o foco do campo. Não apaga o texto nem modifica os estados `day`, `month`, `hour`, `minute` ou `description`. Essa função **não é responsável por subir a tela**: ela cuida do fechamento.

O formulário usa:

```tsx
<TouchableWithoutFeedback onPress={fecharTeclado} accessible={false}>
  <View style={styles.formContent}>
    {/* Categorias, servidor, campos e botão existentes */}
  </View>
</TouchableWithoutFeedback>
```

`onPress={fecharTeclado}` passa a função para ser chamada no toque. Usar `onPress={fecharTeclado()}` executaria a função durante a renderização, o que não é desejado.

`TouchableWithoutFeedback` recebe um único filho: a `View` que organiza o conteúdo. Ele é utilizado aqui para a área livre, sem criar um novo botão visível ou efeito de opacidade. Os botões de ação continuam usando `Pressable`. `accessible={false}` evita transformar o formulário inteiro em um único elemento de acessibilidade; os campos e botões mantêm seus próprios rótulos.

O botão Agendar também chama `fecharTeclado()` antes de exibir a mensagem de simulação. Os valores permanecem nos respectivos estados, sem salvar um agendamento.

## Como a rolagem participa

A estrutura simplificada é:

```text
KeyboardAvoidingView
  SafeAreaView
    View
      ScreenHeader
      ScrollView vertical
        TouchableWithoutFeedback
          View do conteúdo
            Categorias em ScrollView horizontal
            Servidor e campos
            Botão Agendar
```

O cabeçalho continua fora da rolagem vertical. A barra de categorias rola em outro eixo. Campos e botão ficam juntos na área que pode rolar.

- `contentContainerStyle` usa `flexGrow: 1` para preencher a altura disponível, permitindo que o conteúdo seja maior e role.
- A nova `formContent` também usa `flexGrow: 1`, mantendo o rodapé perto da base quando sobra espaço, sem prender o formulário a uma altura fixa.
- `keyboardShouldPersistTaps="handled"` permite que os controles recebam o toque com o teclado aberto. O fechamento ao tocar no espaço livre é tratado pela função acima.
- `keyboardDismissMode` mantém fechamento interativo ao arrastar no iOS e `on-drag` nas demais plataformas.
- `bounces={false}` desativa o efeito elástico da rolagem vertical onde suportado; não impede rolar.
- `SafeAreaView` protege as áreas do sistema. Ela não substitui o ajuste de teclado.

Não foi criado `useState` para saber se o teclado está aberto, nem `useEffect`, listeners manuais ou temporizadores. O componente nativo já cuida dos eventos necessários para essa solução simples.

## O que explicar ao professor

“Usei o mesmo conjunto do exemplo: `KeyboardAvoidingView` ajusta o espaço quando o teclado aparece, `ScrollView` permite alcançar o restante do formulário e `TouchableWithoutFeedback` chama `Keyboard.dismiss()` ao tocar fora. Os campos continuam controlados por estado, então fechar o teclado não apaga o que foi digitado.”

Saiba apontar no código o `behavior`, `flex: 1`, `flexGrow: 1`, `onPress={fecharTeclado}` e a diferença entre ajuste de espaço, rolagem e perda de foco.

## Verificação em aparelho

TypeScript com `--noUnusedLocals --noUnusedParameters` e exportação para Android, iOS e web passaram. A saída foi gerada em `$env:TEMP\grupogame-keyboard-check`, com execução autorizada do Hermes fora do sandbox. ESLint foi tentado, mas permaneceu sem configuração; a instalação foi recusada conforme orientação anterior.

Não havia navegador ou dispositivo conectado às ferramentas. A compilação não comprova o comportamento visual do teclado. Ainda é necessário:

- [ ] Abrir Agendar no Android e no iOS e focar cada um dos cinco campos.
- [ ] Conferir o campo Descrição com o teclado aberto, comparando com `referencias/tela-07-agendar.png`.
- [ ] Rolar e alcançar o botão Agendar em uma tela pequena.
- [ ] Tocar em uma área vazia e confirmar que o teclado fecha sem apagar valores.
- [ ] Trocar de campo e selecionar uma categoria com o teclado aberto.
- [ ] Tocar em Agendar uma vez e confirmar fechamento do teclado e mensagem.
- [ ] Abrir/fechar o teclado novamente e conferir que não sobra espaço vazio excessivo.

Referências técnicas: [KeyboardAvoidingView](https://reactnative.dev/docs/0.86/keyboardavoidingview), [Keyboard.dismiss](https://reactnative.dev/docs/0.86/keyboard), [ScrollView](https://reactnative.dev/docs/0.86/scrollview) e [TouchableWithoutFeedback](https://reactnative.dev/docs/0.86/touchablewithoutfeedback).
