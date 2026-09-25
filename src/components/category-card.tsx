import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Category } from '@/data/home';

type CategoryCardProps = {
  category: Category;
  selected: boolean;
  onPress: () => void;
  accessibilityHint?: string;
  showSelectionIndicator?: boolean;
  dimUnselected?: boolean;
};

export function CategoryCard({
  category,
  selected,
  onPress,
  accessibilityHint = 'Filtra as partidas. Toque novamente para mostrar todas.',
  showSelectionIndicator = false,
  dimUnselected = false,
}: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={category.title}
      accessibilityState={{ selected }}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        showSelectionIndicator && selected && styles.selectedWithIndicator,
        pressed && styles.pressed,
        dimUnselected && !selected && styles.unselected,
      ]}>
      {showSelectionIndicator && (
        <View style={[styles.indicator, selected && styles.indicatorSelected]} />
      )}
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
  selectedWithIndicator: {
    borderColor: '#243189',
  },
  indicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#243189',
  },
  indicatorSelected: {
    backgroundColor: '#E91446',
    borderColor: '#E91446',
  },
  pressed: {
    opacity: 0.75,
  },
  unselected: {
    opacity: 0.4,
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
