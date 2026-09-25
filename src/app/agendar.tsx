import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryCard } from '@/components/category-card';
import { ScreenHeader } from '@/components/screen-header';
import { categories, type CategoryId } from '@/data/home';

// Servidor fixo de demonstração: não existe seleção por modal nesta etapa.
const selectedServer = {
  name: 'Valorosos',
  game: 'Valorant',
  image: require('@/assets/images/home/valorant.png'),
};

export default function ScheduleScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  function handleBack() {
    if (router.canGoBack()) router.back();
    else router.replace('/home');
  }

  function fecharTeclado() {
    Keyboard.dismiss();
  }

  function handleSchedule() {
    fecharTeclado();
    // Apenas feedback local: não salva nem adiciona uma partida à Home.
    setShowFeedback(true);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      enabled={Platform.OS !== 'web'}
      behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScreenHeader title="Agendar partida" onBack={handleBack} />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}>
            {/* Como no exemplo: tocar no espaço livre fecha o teclado. */}
            <TouchableWithoutFeedback onPress={fecharTeclado} accessible={false}>
              <View style={styles.formContent}>
                <Text style={[styles.label, styles.categoryLabel]} accessibilityRole="header">Categoria</Text>
                <ScrollView
                  horizontal
                  style={styles.categoryScroll}
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.categories}>
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      selected={selectedCategoryId === category.id}
                      onPress={() => setSelectedCategoryId(category.id)}
                      showSelectionIndicator
                      accessibilityHint="Seleciona esta categoria para a partida. Apenas uma pode ser selecionada."
                    />
                  ))}
                </ScrollView>

                <View style={styles.form}>
                  <View style={styles.server} accessibilityLabel="Servidor fixo de demonstração: Valorosos, Valorant">
                    <Image source={selectedServer.image} style={styles.serverImage} contentFit="cover" accessible={false} />
                    <View style={styles.serverInfo}>
                      <Text style={styles.serverName}>{selectedServer.name}</Text>
                      <Text style={styles.serverGame}>{selectedServer.game}</Text>
                    </View>
                  </View>

                  <View style={styles.dateAndTime}>
                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Dia e mês</Text>
                      <View style={styles.inputRow}>
                        <TextInput
                          accessibilityLabel="Dia" value={day}
                          onChangeText={(text) => setDay(text.replace(/\D/g, ''))}
                          keyboardType="number-pad" maxLength={2}
                          selectionColor="#E91446" style={styles.numberInput}
                        />
                        <Text style={styles.separator}>/</Text>
                        <TextInput
                          accessibilityLabel="Mês" value={month}
                          onChangeText={(text) => setMonth(text.replace(/\D/g, ''))}
                          keyboardType="number-pad" maxLength={2}
                          selectionColor="#E91446" style={styles.numberInput}
                        />
                      </View>
                    </View>

                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Horário</Text>
                      <View style={styles.inputRow}>
                        <TextInput
                          accessibilityLabel="Hora" value={hour}
                          onChangeText={(text) => setHour(text.replace(/\D/g, ''))}
                          keyboardType="number-pad" maxLength={2}
                          selectionColor="#E91446" style={styles.numberInput}
                        />
                        <Text style={styles.separator}>:</Text>
                        <TextInput
                          accessibilityLabel="Minuto" value={minute}
                          onChangeText={(text) => setMinute(text.replace(/\D/g, ''))}
                          keyboardType="number-pad" maxLength={2}
                          selectionColor="#E91446" style={styles.numberInput}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.descriptionHeader}>
                    <Text style={styles.label}>Descrição</Text>
                    <Text style={styles.limit}>Max 100 caracteres</Text>
                  </View>
                  <TextInput
                    accessibilityLabel="Descrição da partida"
                    accessibilityHint="Máximo de 100 caracteres"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    maxLength={100}
                    selectionColor="#E91446"
                    style={styles.descriptionInput}
                  />
                </View>

                <View style={styles.footer}>
                  {showFeedback && (
                    <Text style={styles.feedback} accessibilityLiveRegion="polite">
                      Demonstração: nenhum agendamento foi salvo.
                    </Text>
                  )}
                  <Pressable
                    onPress={handleSchedule}
                    accessibilityRole="button"
                    accessibilityLabel="Agendar"
                    accessibilityHint="Simulação local, sem salvar um agendamento"
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
                    <Text style={styles.buttonLabel}>Agendar</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0D133D' },
  safeArea: { flex: 1 },
  container: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingTop: 24, paddingBottom: 24 },
  formContent: { flexGrow: 1 },
  label: { fontFamily: 'RajdhaniBold', fontSize: 18, lineHeight: 24, color: '#DDE3F0' },
  categoryLabel: { marginHorizontal: 24, marginBottom: 12 },
  categoryScroll: { flexGrow: 0, flexShrink: 0 },
  categories: { paddingHorizontal: 24, gap: 8 },
  form: { paddingHorizontal: 24, marginTop: 28 },
  server: {
    flexDirection: 'row', alignItems: 'center', minHeight: 68,
    borderWidth: 1, borderColor: '#243189', borderRadius: 8, overflow: 'hidden',
  },
  serverImage: { width: 64, height: 68, backgroundColor: '#1B245F' },
  serverInfo: { flex: 1, paddingHorizontal: 16, paddingVertical: 8, gap: 4 },
  serverName: { fontFamily: 'RajdhaniBold', fontSize: 20, lineHeight: 24, color: '#DDE3F0' },
  serverGame: { fontFamily: 'Inter', fontSize: 13, lineHeight: 20, color: '#ABB1CC' },
  dateAndTime: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    gap: 20, marginTop: 28,
  },
  fieldGroup: { gap: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  numberInput: {
    width: 48, minHeight: 48, padding: 8, textAlign: 'center',
    fontFamily: 'Inter', fontSize: 14, color: '#DDE3F0',
    borderRadius: 8, borderWidth: 1, borderColor: '#243189', backgroundColor: '#1B245F',
  },
  separator: { fontFamily: 'Inter', fontSize: 16, color: '#ABB1CC' },
  descriptionHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 8, marginTop: 24, marginBottom: 12,
  },
  limit: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#ABB1CC' },
  descriptionInput: {
    minHeight: 120, padding: 12, textAlignVertical: 'top',
    fontFamily: 'Inter', fontSize: 14, lineHeight: 22, color: '#DDE3F0',
    borderRadius: 8, borderWidth: 1, borderColor: '#243189', backgroundColor: '#1B245F',
  },
  footer: { marginTop: 'auto', paddingTop: 40, paddingHorizontal: 24, gap: 12 },
  button: { minHeight: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#E91446' },
  buttonLabel: { padding: 16, fontFamily: 'Inter', fontSize: 14, lineHeight: 20, color: '#FFFFFF' },
  pressed: { opacity: 0.75 },
  feedback: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#DDE3F0' },
});
