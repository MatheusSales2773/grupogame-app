import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppointmentCard } from '@/components/appointment-card';
import { CategoryCard } from '@/components/category-card';
import { SignOutModal } from '@/components/sign-out-modal';
import { appointments, categories, user, type CategoryId } from '@/data/home';

export default function HomeScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
  const [showSignOut, setShowSignOut] = useState(false);

  const visibleAppointments = selectedCategoryId
    ? appointments.filter((appointment) => appointment.categoryId === selectedCategoryId)
    : appointments;

  function handleSelectCategory(categoryId: CategoryId) {
    // Tocar novamente na mesma categoria remove o filtro.
    setSelectedCategoryId((current) => current === categoryId ? null : categoryId);
  }

  function handleOpenServer(serverId: string) {
    router.navigate({ pathname: '/servidor/[id]', params: { id: serverId } });
  }

  function handleSignOut() {
    setShowSignOut(false);
    // Saída simulada: substitui a Home pelo Login, sem sessão real do Discord.
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={visibleAppointments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Pressable
                onPress={() => setShowSignOut(true)}
                accessibilityRole="button"
                accessibilityLabel="Sair"
                accessibilityHint="Abre a confirmação de saída"
                style={({ pressed }) => pressed && styles.avatarPressed}>
                <Image source={user.avatar} style={styles.avatar} contentFit="cover" accessible={false} />
              </Pressable>
              <View style={styles.greeting}>
                <Text style={styles.greetingText}>
                  Olá, <Text style={styles.userName}>{user.name}</Text>
                </Text>
                <Text style={styles.message}>{user.message}</Text>
              </View>

              <Pressable
                onPress={() => router.navigate('/agendar')}
                accessibilityRole="button"
                accessibilityLabel="Agendar partida"
                style={styles.addButton}>
                <Text style={styles.addIcon}>+</Text>
              </Pressable>
            </View>

            <FlatList
              horizontal
              data={categories}
              extraData={selectedCategoryId}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
              renderItem={({ item }) => (
                <CategoryCard
                  category={item}
                  selected={selectedCategoryId === item.id}
                  onPress={() => handleSelectCategory(item.id)}
                />
              )}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle} accessibilityRole="header">Partidas agendadas</Text>
              <Text style={styles.total}>Total {visibleAppointments.length}</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            categoryLabel={categories.find((category) => category.id === item.categoryId)?.matchLabel ?? ''}
            onPress={handleOpenServer}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma partida nesta categoria.</Text>}
      />
      <SignOutModal
        visible={showSignOut}
        onCancel={() => setShowSignOut(false)}
        onConfirm={handleSignOut}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D133D',
  },
  list: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
    gap: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E91446',
    backgroundColor: '#E91446',
  },
  avatarPressed: { opacity: 0.75 },
  greeting: { flex: 1, gap: 4 },
  greetingText: {
    fontFamily: 'Inter',
    fontSize: 20,
    lineHeight: 28,
    color: '#DDE3F0',
  },
  userName: { fontFamily: 'RajdhaniBold', fontSize: 24 },
  message: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 18,
    color: '#ABB1CC',
  },
  addButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#E91446',
  },
  addIcon: {
    fontFamily: 'Inter',
    fontSize: 28,
    lineHeight: 32,
    color: '#FFFFFF',
  },
  categories: { paddingHorizontal: 24, gap: 8 },
  sectionHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'RajdhaniBold',
    fontSize: 20,
    lineHeight: 26,
    color: '#DDE3F0',
  },
  total: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 20,
    color: '#ABB1CC',
  },
  empty: {
    paddingHorizontal: 24,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 22,
    color: '#ABB1CC',
  },
});
