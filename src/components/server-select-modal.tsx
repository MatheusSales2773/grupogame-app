import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { servers } from '@/data/servers';

// Agendar controla estes valores. O modal só apresenta dados e comunica ações.
// onSelect recebe apenas o ID; onClose fecha sem trocar o servidor selecionado.
type Props = {
  visible: boolean;
  selectedServerId: string | null;
  onSelect: (serverId: string) => void;
  onClose: () => void;
};

export function ServerSelectModal({ visible, selectedServerId, onSelect, onClose }: Props) {
  // Modal é uma sobreposição, não uma rota. visible controla sua exibição.
  // onRequestClose trata o voltar do Android enquanto o modal está aberto.
  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* O fundo ocupa a tela e permite cancelar. A área do traço também fecha,
            oferecendo uma ação nomeada para leitores de tela. Não há gesto de arrastar. */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessible={false} />
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.sheet}>
          <View style={styles.content} accessibilityViewIsModal>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Fechar seleção de servidor"
              style={styles.handleArea}>
              <View style={styles.handle} />
            </Pressable>
            {/* keyExtractor identifica linhas pelo ID. extraData atualiza a indicação
                acessível de seleção quando só selectedServerId muda.
                renderItem transforma cada registro em uma linha clicável. */}
            <FlatList
              data={servers}
              keyExtractor={(server) => server.id}
              extraData={selectedServerId}
              accessibilityLabel="Selecione um servidor"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <Pressable
                  // A função só é chamada ao tocar; Agendar recebe o ID e fecha o modal.
                  onPress={() => onSelect(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.name}, ${item.isAdmin ? 'Administrador' : 'Convidado'}`}
                  accessibilityState={{ selected: item.id === selectedServerId }}
                  accessibilityHint="Seleciona este servidor e retorna ao formulário"
                  style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
                  <Image source={item.image} style={styles.image} contentFit="cover" accessible={false} />
                  <View style={styles.info}>
                    <View style={styles.text}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.role}>{item.isAdmin ? 'Administrador' : 'Convidado'}</Text>
                    </View>
                    <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                      size={18} tintColor="#ABB1CC" />
                  </View>
                </Pressable>
              )}
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

// Overlay cobre o formulário. flex-end posiciona o painel na base da tela.
// A altura de 88% deixa parte da tela anterior visível; FlatList rola o que não couber.
const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.75)' },
  sheet: { height: '88%', width: '100%', maxWidth: 600, alignSelf: 'center', backgroundColor: '#0D133D' },
  content: { flex: 1 },
  handleArea: { height: 112, alignItems: 'center', paddingTop: 12 },
  handle: { width: 36, height: 2, borderRadius: 1, backgroundColor: '#526DFF' },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 20, minHeight: 92 },
  image: { width: 64, height: 68, borderRadius: 8, backgroundColor: '#1B245F' },
  // A borda pertence às informações, começando após a imagem como no protótipo.
  info: { flex: 1, minHeight: 92, flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#1B245F' },
  text: { flex: 1, gap: 4 },
  name: { fontFamily: 'RajdhaniBold', fontSize: 18, lineHeight: 24, color: '#DDE3F0' },
  role: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#ABB1CC' },
  pressed: { opacity: 0.7 },
});
