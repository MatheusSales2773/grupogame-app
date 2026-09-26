import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Layout raiz: prepara as fontes e a navegação comum a todas as telas.
// Mantém a abertura do Expo visível enquanto as fontes locais são carregadas.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Os nomes à esquerda são os mesmos usados em fontFamily nos StyleSheets.
  const [fontsLoaded, fontError] = useFonts({
    RajdhaniBold: require('@/assets/fonts/Rajdhani-Bold.ttf'),
    Inter: require('@/assets/fonts/Inter.ttf'),
  });

  // useEffect executa este efeito quando fontsLoaded ou fontError muda.
  // Em caso de erro, também liberamos a abertura para não bloquear o aplicativo.
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontError]);

  // Enquanto aguarda, não monta as telas com fontes ainda indisponíveis.
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {/* Fragment agrupa elementos sem acrescentar uma View ao layout. */}
      <StatusBar style="light" />
      {/* Stack organiza rotas em pilha. Os arquivos de src/app definem as rotas;
          Agendar e servidor/[id] também são descobertos automaticamente.
          headerShown oculta o cabeçalho nativo porque usamos nosso próprio. */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0D133D' },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
      </Stack>
    </>
  );
}
