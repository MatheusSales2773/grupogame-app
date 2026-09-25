import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function SignOutModal({ visible, onCancel, onConfirm }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} accessible={false} />
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.sheet}>
          <View style={styles.content} accessibilityViewIsModal>
            <Text style={styles.title} accessibilityRole="header">
              Deseja sair do Game<Text style={styles.highlight}>Play</Text>?
            </Text>
            <View style={styles.actions}>
              <Pressable
                onPress={onCancel}
                accessibilityRole="button"
                accessibilityLabel="Não, permanecer na Home"
                style={({ pressed }) => [styles.button, styles.cancelButton, pressed && styles.pressed]}>
                <Text style={styles.buttonLabel}>Não</Text>
              </Pressable>
              <Pressable
                onPress={onConfirm}
                accessibilityRole="button"
                accessibilityLabel="Sim, sair e voltar ao Login"
                style={({ pressed }) => [styles.button, styles.confirmButton, pressed && styles.pressed]}>
                <Text style={styles.buttonLabel}>Sim</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.75)' },
  sheet: { width: '100%', maxWidth: 600, alignSelf: 'center', backgroundColor: '#0D133D' },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24, gap: 24 },
  title: { fontFamily: 'RajdhaniBold', fontSize: 20, lineHeight: 26, color: '#DDE3F0', textAlign: 'center' },
  highlight: { color: '#E91446' },
  actions: { flexDirection: 'row', gap: 8 },
  button: { flex: 1, minHeight: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  cancelButton: { borderWidth: 1, borderColor: '#243189' },
  confirmButton: { backgroundColor: '#E91446' },
  buttonLabel: { fontFamily: 'Inter', fontSize: 14, lineHeight: 20, color: '#DDE3F0', padding: 12 },
  pressed: { opacity: 0.75 },
});
