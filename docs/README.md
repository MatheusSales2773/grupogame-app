# Documentação do GrupoGame

Documentação do trabalho acadêmico em React Native, Expo e TypeScript. Este conjunto registra a análise inicial, o plano aprovado e as etapas de Login, Home, Detalhes do servidor e Agendar. As explicações descrevem o estado atual; mudanças anteriores ficam identificadas como histórico.

Para estudar e apresentar o projeto, consulte a [apostila completa em PDF](../output/pdf/GrupoGame-guia-completo.pdf). Ela reúne arquitetura, decisões, conceitos, fluxo das telas, perguntas para a banca e o código principal comentado.

Se precisar gerar o PDF novamente, siga as instruções em [docs/pdf/README.md](./pdf/README.md). O arquivo final não depende do ambiente Python para ser aberto.

## Por onde começar

1. [Análise do projeto](./01-analise-do-projeto.md): estrutura, tecnologias, código inicial e referências visuais.
2. [Plano de implementação](./02-plano-de-implementacao.md): escopo, decisões aprovadas e próximas etapas.
3. [Tela de Login explicada](./03-tela-de-login.md): arquivos, JSX, estilos, props, eventos, navegação e carregamento de fontes.
4. [Guia para apresentação](./04-guia-de-apresentacao.md): roteiro e perguntas que o professor pode fazer.
5. [Execução e validação](./05-execucao-e-validacao.md): comandos, verificações realizadas e testes manuais pendentes.
6. [Tela Home explicada](./06-tela-home.md): dados locais, componentes, listas, filtro e navegação para Detalhes.
7. [Histórico de alterações](./07-historico-de-alteracoes.md): o que foi feito em cada etapa e o que permanece pendente.
8. [Detalhes do servidor](./08-detalhes-do-servidor.md): rota dinâmica, dados locais, jogadores, props, estilos e ações.
9. [Tela Agendar](./09-tela-agendar.md): seleção única de categoria, campos controlados, teclado, rolagem e simulação local.
10. [Revisão final](./10-revisao-final.md): fluxo, correções, comparação com referências, compilação e limites dos testes.
11. [Confirmação de saída](./11-confirmacao-de-saida.md): avatar da Home, modal, cancelar e voltar ao Login.
12. [Teclado e rolagem](./12-teclado-e-rolagem.md): adaptação de `referencias/exemplo.js`, ajuste de espaço e função para fechar o teclado.
13. [Seleção de servidor](./13-selecao-de-servidor.md): lista da tela cinco, estado local, escolha e troca do grupo.

## Estado documentado

| Parte | Situação |
| --- | --- |
| Análise das dez imagens de referência | Concluída |
| Plano geral | Aprovado, com implementação de uma tela por vez |
| Login | Implementado; conferência visual no aparelho pendente |
| Entrada com Discord | Simulada, sem autenticação ou acesso à conta |
| Navegação para `/home` | Configurada no código |
| Home | Implementada com dados locais, categorias e lista de partidas |
| Detalhes do servidor | Implementado; recebe ID pela rota e exibe dados locais; revisão visual pendente |
| Agendar e seleção de categorias | Implementados em uma rota, com escolha de servidor e campos locais; teste de teclado em aparelho pendente |
| Modal da lista de servidores | Implementado por solicitação posterior, com seis grupos locais e retorno da escolha ao formulário |
| Modal de saída | Implementado após a revisão, por solicitação adicional; abre ao tocar no avatar da Home |
| Revisão técnica das quatro telas | Concluída; navegação repetida e marcador de categoria ajustados; interação em aparelho pendente |
| Exportação Android/iOS/web | Passou com `--no-bytecode` por bloqueio de permissão do `hermesc.exe` no Windows |

Ao tocar em **Entrar com Discord**, o código substitui o Login pela Home. Os cartões abrem `/servidor/[id]`, passando somente o identificador do servidor. Detalhes permite voltar e simular a entrada na partida; compartilhar abre a opção do sistema quando disponível. O botão `+` abre `/agendar`, inicialmente sem servidor escolhido. Tocar no seletor abaixo das categorias abre a lista de grupos. Agendar mantém a seleção e os campos apenas no estado da tela e não salva partidas.

## Regras acordadas

- Manter React Native, Expo e TypeScript.
- Usar StyleSheet e Flexbox, priorizando as bibliotecas existentes.
- Implementar uma tela por vez, sem antecipar as demais.
- Extrair componentes apenas quando houver reutilização real ou ganho claro de organização.
- Não configurar ESLint por enquanto.
- Não corrigir problemas do template que não impeçam a execução.
- Não implementar autenticação real, persistência ou outras funcionalidades sem definição de escopo.
- Atualizar a documentação junto com cada implementação: estado atual, explicação da tela, arquivos envolvidos, validações e histórico de alterações.

A tabela acima descreve o estado atual. Não marcar uma funcionalidade ou teste como concluído apenas porque está planejado. Os links para o código são relativos à pasta `docs`.
