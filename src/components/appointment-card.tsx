import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Appointment } from '@/data/home';

// O card recebe os dados da partida, o rótulo da categoria e uma ação opcional.
// A assinatura do callback exige um ID de servidor e não retorna um valor (void).
type AppointmentCardProps = {
  appointment: Appointment;
  categoryLabel: string;
  onPress?: (serverId: string) => void;
};

export function AppointmentCard({ appointment, categoryLabel, onPress }: AppointmentCardProps) {
  // Valores calculados a partir das props: não precisam de estados independentes.
  const role = appointment.isHost ? 'Anfitrião' : 'Visitante';
  const roleColor = appointment.isHost ? '#E91446' : '#32BD50';

  return (
    <Pressable
      // Sem callback, o card fica desabilitado. ?. chama a função somente se existir.
      // A função anônima adia a chamada e entrega o ID à Home quando houver um toque.
      disabled={!onPress}
      onPress={() => onPress?.(appointment.serverId)}
      accessible
      accessibilityRole="button"
      accessibilityState={{ disabled: !onPress }}
      accessibilityLabel={`${appointment.title}, ${categoryLabel}, ${appointment.date} às ${appointment.time}, ${role}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={appointment.image} style={styles.cover} contentFit="cover" accessible={false} />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{appointment.title}</Text>
          <Text style={styles.category}>{categoryLabel}</Text>
        </View>

        <View style={styles.metadata}>
          <View style={styles.dateGroup}>
            <Image
              source={require('@/assets/images/home/calendar.svg')}
              style={styles.smallIcon}
              contentFit="contain"
              accessible={false}
            />
            <Text style={styles.date}>{appointment.date} às {appointment.time}h</Text>
          </View>

          <View style={styles.roleGroup}>
            <Image
              source={require('@/assets/images/home/player.svg')}
              style={styles.smallIcon}
              contentFit="contain"
              tintColor={roleColor}
              accessible={false}
            />
            <Text style={[styles.role, { color: roleColor }]}>{role}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// Card em linha: capa com tamanho fixo e details com flex: 1 para o espaço restante.
// wrap acomoda metadados em outra linha; tintColor reaproveita o ícone com outra cor.
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  pressed: { opacity: 0.75 },
  cover: {
    width: 64,
    height: 68,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#243189',
    backgroundColor: '#171F52',
  },
  details: {
    flex: 1,
    minHeight: 70,
    paddingTop: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1B2565',
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
    rowGap: 4,
  },
  title: {
    flexShrink: 1,
    fontFamily: 'RajdhaniBold',
    fontSize: 20,
    lineHeight: 24,
    color: '#DDE3F0',
  },
  category: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 18,
    color: '#ABB1CC',
  },
  metadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    columnGap: 8,
    rowGap: 6,
  },
  dateGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  smallIcon: { width: 16, height: 16 },
  date: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 18,
    color: '#DDE3F0',
  },
  role: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 18,
  },
});
