import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { servers } from '@/data/servers';

type Props = {
  visible: boolean;
  selectedServerId: string | null;
  onSelect: (serverId: string) => void;
  onClose: () => void;
};

export function ServerSelectModal({ visible, selectedServerId, onSelect, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessible={false} />
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.sheet}>
          <View style={styles.content} accessibilityViewIsModal>
            <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Fechar seleção de servidor"
              style={styles.handleArea}>
              <View style={styles.handle} />
            </Pressable>
            <FlatList
              data={servers}
              keyExtractor={(server) => server.id}
              extraData={selectedServerId}
              accessibilityLabel="Selecione um servidor"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => (
                <Pressable
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

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.75)' },
  sheet: { height: '88%', width: '100%', maxWidth: 600, alignSelf: 'center', backgroundColor: '#0D133D' },
  content: { flex: 1 },
  handleArea: { height: 112, alignItems: 'center', paddingTop: 12 },
  handle: { width: 36, height: 2, borderRadius: 1, backgroundColor: '#526DFF' },
  list: { paddingHorizontal: 24, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 20, minHeight: 92 },
  image: { width: 64, height: 68, borderRadius: 8, backgroundColor: '#1B245F' },
  info: { flex: 1, minHeight: 92, flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#1B245F' },
  text: { flex: 1, gap: 4 },
  name: { fontFamily: 'RajdhaniBold', fontSize: 18, lineHeight: 24, color: '#DDE3F0' },
  role: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#ABB1CC' },
  pressed: { opacity: 0.7 },
});
