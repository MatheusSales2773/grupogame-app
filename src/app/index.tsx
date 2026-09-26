import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// index.tsx corresponde à rota inicial (/). Um componente retorna a interface em JSX.
// Esta tela não precisa de useState: não possui campos nem dados que mudem localmente.
export default function LoginScreen() {
  function handleSignIn() {
    // Entrada simulada: não autentica nem acessa a conta do Discord.
    // replace troca a rota atual: voltar da Home não retorna a este Login pela pilha.
    router.replace('/home');
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* SafeAreaView respeita recortes/barras do aparelho; ScrollView permite
          rolar em telas baixas. contentContainerStyle estiliza o conteúdo interno. */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* require inclui o arquivo local no bundle. contain preserva a imagem inteira.
              accessible=false evita anunciar uma ilustração apenas decorativa. */}
          <Image
            source={require('@/assets/images/login/illustration.png')}
            style={styles.illustration}
            contentFit="contain"
            accessible={false}
          />

          <View style={styles.content}>
            <Text style={styles.title} accessibilityRole="header">
              Conecte-se{'\n'}e organize suas{'\n'}jogatinas
            </Text>

            <Text style={styles.description}>
              Crie grupos para jogar seus games{'\n'}favoritos com seus amigos
            </Text>

            {/* Passamos a função a onPress, sem executá-la durante a renderização.
                pressed é fornecido pelo Pressable para o feedback visual do toque.
                As props de acessibilidade descrevem a ação ao leitor de tela. */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Entrar com Discord"
              accessibilityHint="Abre a Home em uma demonstração sem autenticação"
              onPress={handleSignIn}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <View style={styles.buttonIcon}>
                <Image
                  source={require('@/assets/images/login/discord.png')}
                  style={styles.discordIcon}
                  contentFit="contain"
                  accessible={false}
                />
              </View>
              <Text style={styles.buttonLabel}>Entrar com Discord</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// StyleSheet organiza os estilos. Números representam unidades lógicas de layout.
// flex: 1 ocupa o espaço disponível; flexGrow permite ao conteúdo crescer e rolar.
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D133D',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 56,
  },
  container: {
    width: '100%',
    maxWidth: 420,
  },
  illustration: {
    width: '100%',
    aspectRatio: 375 / 360,
  },
  content: {
    // Aproxima o título da ilustração, como na referência.
    marginTop: -60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'RajdhaniBold',
    fontSize: 40,
    lineHeight: 40,
    color: '#DDE3F0',
    textAlign: 'center',
  },
  description: {
    marginTop: 16,
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 25,
    color: '#DDE3F0',
    textAlign: 'center',
  },
  button: {
    // row coloca ícone e texto lado a lado; alignItems centraliza na vertical.
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    marginTop: 48,
    marginHorizontal: 24,
    backgroundColor: '#E91446',
    borderRadius: 4,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonIcon: {
    width: 56,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#C3133D',
  },
  discordIcon: {
    width: 24,
    height: 18,
  },
  buttonLabel: {
    // Ocupa o espaço restante depois do ícone, mantendo o texto centralizado.
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
