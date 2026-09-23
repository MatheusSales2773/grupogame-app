import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { Player } from '@/data/servers';

type Props = { player: Player };

export function PlayerItem({ player }: Props) {
  const available = player.status === 'available';

  return (
    <View style={styles.row}>
      {player.avatar ? (
        <Image source={player.avatar} style={styles.avatar} contentFit="cover" accessible={false} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.initials} accessible={false}>{player.initials}</Text>
        </View>
      )}
      <View style={styles.details}>
        <Text style={styles.name}>{player.name}</Text>
        <View style={styles.status}>
          <View style={[styles.dot, { backgroundColor: available ? '#32BD50' : '#E91446' }]} />
          <Text style={styles.statusText}>{available ? 'Disponível' : 'Ocupado'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingLeft: 24 },
  avatar: {
    width: 48, height: 48, borderRadius: 8, backgroundColor: '#24336B',
    borderWidth: 1, borderColor: '#3C4980', alignItems: 'center', justifyContent: 'center',
  },
  initials: { fontFamily: 'RajdhaniBold', fontSize: 20, color: '#DDE3F0' },
  details: {
    flex: 1, gap: 4, paddingVertical: 16, paddingRight: 24,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#24305B',
  },
  name: { fontFamily: 'RajdhaniBold', fontSize: 18, lineHeight: 22, color: '#DDE3F0' },
  status: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#ABB1CC' },
});
