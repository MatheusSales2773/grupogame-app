import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { Category } from '@/data/home';

type CategoryCardProps = {
  category: Category;
  selected: boolean;
  onPress: () => void;
};

export function CategoryCard({ category, selected, onPress }: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={category.title}
      accessibilityState={{ selected }}
      accessibilityHint="Filtra as partidas. Toque novamente para mostrar todas."
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}>
      <Image source={category.icon} style={styles.icon} contentFit="contain" accessible={false} />
      <Text style={styles.title}>{category.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 104,
    minHeight: 120,
    paddingHorizontal: 8,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#243189',
    backgroundColor: '#1B245F',
  },
  selected: {
    borderColor: '#E91446',
    backgroundColor: '#243189',
  },
  pressed: {
    opacity: 0.75,
  },
  icon: {
    width: 48,
    height: 48,
  },
  title: {
    fontFamily: 'RajdhaniBold',
    fontSize: 15,
    lineHeight: 20,
    color: '#DDE3F0',
    textAlign: 'center',
  },
});
