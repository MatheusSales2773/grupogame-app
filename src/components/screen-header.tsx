import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  onBack: () => void;
  onShare?: () => void;
};

export function ScreenHeader({ title, onBack, onShare }: Props) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Voltar"
        style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
        <SymbolView name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
          size={24} tintColor="#DDE3F0" />
      </Pressable>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      {onShare ? (
        <Pressable onPress={onShare} accessibilityRole="button" accessibilityLabel="Compartilhar servidor"
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <SymbolView name={{ ios: 'square.and.arrow.up', android: 'share', web: 'share' }}
            size={24} tintColor="#E91446" />
        </Pressable>
      ) : <View style={styles.action} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 64, paddingHorizontal: 12, flexDirection: 'row',
    alignItems: 'center', backgroundColor: '#1B245F',
  },
  action: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  title: {
    flex: 1, textAlign: 'center', fontFamily: 'RajdhaniBold',
    fontSize: 20, lineHeight: 26, color: '#DDE3F0',
  },
  pressed: { opacity: 0.7 },
});
