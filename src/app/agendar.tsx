import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
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
import { ServerSelectModal } from '@/components/server-select-modal';
import { categories, type CategoryId } from '@/data/home';
import { servers } from '@/data/servers';

export default function ScheduleScreen() {
  // Um único ID garante seleção de apenas uma categoria; null é o estado inicial vazio.
  // useState mantém o valor entre renderizações e seu setter atualiza a interface.
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
  // A escolha do servidor e a abertura da lista são estados independentes.
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [showServerSelect, setShowServerSelect] = useState(false);
  // Derivamos o objeto pelo ID, sem duplicar nome, jogo e imagem em outros estados.
  const selectedServer = servers.find((server) => server.id === selectedServerId);
  // TextInput trabalha com strings: permitem vazio e zeros à esquerda, como "06".
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');
  // Controla apenas a mensagem de demonstração do botão Agendar.
  const [showFeedback, setShowFeedback] = useState(false);

  function handleBack() {
    // Retira a tela da pilha; se veio por link direto sem histórico, substitui por Home.
    if (router.canGoBack()) router.back();
    else router.replace('/home');
  }

  function fecharTeclado() {
    // Remove o foco/fecha o teclado, mas não limpa os estados dos campos.
    Keyboard.dismiss();
  }

  function handleSchedule() {
    fecharTeclado();
    // Apenas feedback local: não salva nem adiciona uma partida à Home.
    setShowFeedback(true);
  }

  function handleOpenServers() {
    // A lista aparece sobre o formulário; os campos continuam montados e preservados.
    fecharTeclado();
    setShowServerSelect(true);
  }

  function handleSelectServer(serverId: string) {
    // Callback recebido pelo modal: guarda o ID escolhido e fecha a lista.
    setSelectedServerId(serverId);
    setShowServerSelect(false);
  }

  // padding ajusta o espaço inferior quando o teclado sobrepõe a tela nativa.
  // A ScrollView permite alcançar o conteúdo quando a área disponível diminui.
  // Na web, o navegador controla o viewport; o KeyboardAvoidingView fica desativado.
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      enabled={Platform.OS !== 'web'}
      behavior="padding">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScreenHeader title="Agendar partida" onBack={handleBack} />

          {/* handled permite tocar nos botões com teclado aberto; arrastar a rolagem
              também pode dispensá-lo. O comportamento interactive é usado no iOS. */}
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
                  {/* map transforma o array pequeno em cartões; key identifica cada um.
                      A tela calcula selected e passa um callback. Trocar o ID faz a
                      categoria anterior perder o destaque, sem quatro booleanos. */}
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      selected={selectedCategoryId === category.id}
                      onPress={() => setSelectedCategoryId(category.id)}
                      showSelectionIndicator
                      dimUnselected
                      accessibilityHint="Seleciona esta categoria para a partida. Apenas uma pode ser selecionada."
                    />
                  ))}
                </ScrollView>

                <View style={styles.form}>
                  {/* Renderização condicional: sem escolha há um espaço para a imagem.
                      ?. acessa o nome se existir servidor; ?? fornece o texto inicial. */}
                  <Pressable onPress={handleOpenServers} accessibilityRole="button"
                    accessibilityLabel={selectedServer ? `Servidor: ${selectedServer.name}, ${selectedServer.game}` : 'Selecione um servidor'}
                    accessibilityHint="Abre a lista para escolher ou trocar o servidor"
                    style={({ pressed }) => [styles.server, pressed && styles.pressed]}>
                    {selectedServer ? (
                      <Image source={selectedServer.image} style={styles.serverImage} contentFit="cover" accessible={false} />
                    ) : <View style={styles.serverImage} />}
                    <View style={styles.serverInfo}>
                      <Text style={styles.serverName}>{selectedServer?.name ?? 'Selecione um servidor'}</Text>
                      {selectedServer && <Text style={styles.serverGame}>{selectedServer.game}</Text>}
                    </View>
                    <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
                      size={18} tintColor="#ABB1CC" style={styles.serverChevron} />
                  </Pressable>

                  <View style={styles.dateAndTime}>
                    <View style={styles.fieldGroup}>
                      <Text style={styles.label}>Dia e mês</Text>
                      <View style={styles.inputRow}>
                        {/* Campo controlado: value lê o estado e onChangeText o atualiza.
                            A expressão regular remove tudo que não é dígito. O teclado
                            numérico facilita digitar; maxLength limita a dois caracteres.
                            Isso não valida se a data ou o horário realmente existem. */}
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
                  {/* multiline permite várias linhas; maxLength limita a 100 caracteres.
                      setDescription pode ser passado diretamente porque recebe o texto. */}
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
                  {/* && só inclui a mensagem no JSX depois do toque em Agendar. */}
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
      {/* O modal recebe props, sem criar outra rota. Fechar não redefine os campos. */}
      <ServerSelectModal visible={showServerSelect} selectedServerId={selectedServerId}
        onSelect={handleSelectServer} onClose={() => setShowServerSelect(false)} />
    </KeyboardAvoidingView>
  );
}

// StyleSheet centraliza a aparência; os valores de estado decidem o conteúdo exibido.
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0D133D' },
  safeArea: { flex: 1 },
  container: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
  scroll: { flex: 1 },
  // Preenche a altura livre, mas deixa o conteúdo crescer para permitir rolagem.
  scrollContent: { flexGrow: 1, paddingTop: 24, paddingBottom: 24 },
  formContent: { flexGrow: 1 },
  label: { fontFamily: 'RajdhaniBold', fontSize: 18, lineHeight: 24, color: '#DDE3F0' },
  categoryLabel: { marginHorizontal: 24, marginBottom: 12 },
  // A faixa horizontal não deve esticar nem encolher na direção vertical.
  categoryScroll: { flexGrow: 0, flexShrink: 0 },
  categories: { paddingHorizontal: 24, gap: 8 },
  form: { paddingHorizontal: 24, marginTop: 28 },
  server: {
    // row alinha imagem, texto e seta. overflow recorta a imagem nos cantos arredondados.
    flexDirection: 'row', alignItems: 'center', minHeight: 68,
    borderWidth: 1, borderColor: '#243189', borderRadius: 8, overflow: 'hidden',
  },
  serverImage: { width: 64, height: 68, backgroundColor: '#1B245F' },
  serverInfo: { flex: 1, paddingHorizontal: 16, paddingVertical: 8, gap: 4 },
  serverName: { fontFamily: 'RajdhaniBold', fontSize: 20, lineHeight: 24, color: '#DDE3F0' },
  serverGame: { fontFamily: 'Inter', fontSize: 13, lineHeight: 20, color: '#ABB1CC' },
  serverChevron: { marginRight: 16 },
  dateAndTime: {
    // Os grupos ficam lado a lado; wrap permite quebrar em telas estreitas.
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
  // Empurra o botão para baixo quando há espaço; ele continua dentro da rolagem.
  footer: { marginTop: 'auto', paddingTop: 40, paddingHorizontal: 24, gap: 12 },
  button: { minHeight: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: '#E91446' },
  buttonLabel: { padding: 16, fontFamily: 'Inter', fontSize: 14, lineHeight: 20, color: '#FFFFFF' },
  pressed: { opacity: 0.75 },
  feedback: { fontFamily: 'Inter', fontSize: 12, lineHeight: 18, color: '#DDE3F0' },
});
