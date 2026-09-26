import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlayerItem } from '@/components/player-item';
import { ScreenHeader } from '@/components/screen-header';
import { servers } from '@/data/servers';

// Gera os endereços dos servidores também na exportação estática para web.
export function generateStaticParams() {
  return servers.map((server) => ({ id: server.id }));
}

export default function ServerDetailsScreen() {
  // A rota recebe somente o ID. find devolve o registro correspondente ou undefined.
  // O tipo admite parâmetro ausente/repetido; sem correspondência exibimos o aviso abaixo.
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const server = servers.find((item) => item.id === id);
  // Ligamos a mensagem ao ID para não exibir feedback de outro servidor ao mudar a rota.
  const [feedback, setFeedback] = useState<{ serverId: string; message: string } | null>(null);

  function handleBack() {
    // back retira a tela atual da pilha. Sem histórico (link direto), replace abre Home.
    if (router.canGoBack()) router.back();
    else router.replace('/home');
  }

  function handleJoin() {
    // Guarda apenas uma mensagem de demonstração: não entra em uma partida real.
    if (!server) return;
    setFeedback({ serverId: server.id, message: 'Entrada simulada. Nenhuma conexão com o Discord foi realizada.' });
  }

  async function handleShare() {
    // async/await aguarda a API de compartilhamento do sistema. Não cria convite Discord.
    if (!server) return;
    try {
      await Share.share({ message: `${server.name}\n${server.description}` });
    } catch (error) {
      // Cancelamento não é tratado como falha; outros erros geram um aviso local.
      if (error instanceof Error && error.name === 'AbortError') return;
      setFeedback({ serverId: server.id, message: 'Compartilhamento indisponível neste dispositivo.' });
    }
  }

  // Retorno antecipado evita acessar propriedades de um servidor inexistente.
  if (!server) {
    return (
      <SafeAreaView style={styles.screen}>
        <ScreenHeader title="Detalhes" onBack={handleBack} />
        <Text style={styles.notFound}>Servidor não encontrado. Volte para escolher uma partida.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <ScreenHeader title="Detalhes" onBack={handleBack} onShare={handleShare} />
        {/* O banner é o cabeçalho da lista; jogadores são itens com IDs próprios.
            PlayerItem recebe cada jogador por prop, sem conhecer a navegação. */}
        <FlatList
          style={styles.list}
          data={server.players}
          keyExtractor={(player) => player.id}
          renderItem={({ item }) => <PlayerItem player={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <View style={styles.banner}>
                <Image source={server.banner} style={StyleSheet.absoluteFill}
                  contentFit="cover" accessible={false} />
                <View style={styles.bannerContent}>
                  <Text style={styles.serverName} accessibilityRole="header">{server.name}</Text>
                  <Text style={styles.description}>{server.description}</Text>
                </View>
              </View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle} accessibilityRole="header">Jogadores</Text>
                <Text style={styles.total}>Total {server.players.length}</Text>
              </View>
            </View>
          }
          ListEmptyComponent={<Text style={styles.notFound}>Nenhum jogador neste servidor.</Text>}
        />
        <View style={styles.footer}>
          {/* && renderiza a mensagem somente quando pertence ao servidor atual.
              ?. permite verificar feedback mesmo quando seu valor é null. */}
          {feedback?.serverId === server.id && (
            <Text style={styles.feedback} accessibilityLiveRegion="polite">{feedback.message}</Text>
          )}
          <Pressable onPress={handleJoin} accessibilityRole="button"
            accessibilityLabel="Entrar na partida"
            accessibilityHint="Simula a entrada, sem conexão com o Discord"
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <View style={styles.buttonIcon}>
              <Image source={require('@/assets/images/login/discord.png')}
                style={styles.discordIcon} contentFit="contain" accessible={false} />
            </View>
            <Text style={styles.buttonLabel}>Entrar na partida</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// A lista usa flex: 1 e ocupa o espaço entre cabeçalho e rodapé.
// absoluteFill cobre o banner com a imagem; o fundo translúcido ajuda a ler os textos.
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0D133D' },
  container: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
  list: { flex: 1 },
  banner: { minHeight: 234, justifyContent: 'flex-end' },
  bannerContent: { paddingHorizontal: 24, paddingVertical: 20, gap: 8, backgroundColor: 'rgba(13,19,61,0.45)' },
  serverName: { fontFamily: 'RajdhaniBold', fontSize: 28, lineHeight: 34, color: '#DDE3F0' },
  description: { fontFamily: 'Inter', fontSize: 13, lineHeight: 20, color: '#DDE3F0' },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 8, paddingHorizontal: 24, marginTop: 24, marginBottom: 8,
  },
  sectionTitle: { fontFamily: 'RajdhaniBold', fontSize: 20, lineHeight: 26, color: '#DDE3F0' },
  total: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#ABB1CC' },
  footer: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24, gap: 12 },
  button: { flexDirection: 'row', alignItems: 'center', minHeight: 56, backgroundColor: '#E91446', borderRadius: 8 },
  buttonIcon: {
    width: 56, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center',
    borderRightWidth: 1, borderRightColor: '#C3133D',
  },
  discordIcon: { width: 24, height: 18 },
  buttonLabel: {
    flex: 1, paddingHorizontal: 8, paddingVertical: 16, textAlign: 'center',
    fontFamily: 'Inter', fontSize: 14, lineHeight: 20, color: '#FFFFFF',
  },
  pressed: { opacity: 0.75 },
  feedback: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#DDE3F0' },
  notFound: { padding: 24, fontFamily: 'Inter', fontSize: 14, lineHeight: 22, color: '#DDE3F0' },
});
