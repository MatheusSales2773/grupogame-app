import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import Button from './src/components/Button';

export default function App() {
  const [name, setName] = useState('')

  function fecharTeclado() {
    Keyboard.dismiss()
  }

  function handleSave() {
    Alert.alert(`Ola ${name}`)
    Haptics.selectionAsync()
  }

  function handleClean() {
    setName('')
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyAvContainer}
      behavior={'padding'}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
      >
        <TouchableWithoutFeedback onPress={fecharTeclado}>
          <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <Text style={styles.title}>Perfil</Text>

            <View style={styles.main}>
              <TouchableOpacity
                style={styles.btnAvatar}
                activeOpacity={0.5} // ajusta transparencia no clique
              >
                <Image
                  source={{ uri: 'https://avatars.githubusercontent.com/u/62637265?v=4' }}
                  style={styles.avatar}
                />

                <Text style={styles.txtAlterarFoto}>Alterar foto</Text>
              </TouchableOpacity>

              <View style={styles.inputsContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Nome'
                  placeholderTextColor='#7C7C8A'
                  selectionColor='#00B37E'
                  defaultValue={name}
                  onChangeText={(text) => setName(text)}
                />
                <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  defaultValue='marcos@gmail.com'
                  editable={false}
                />
              </View>

              <View style={styles.inputsContainer}>
                <Text style={styles.label}>Alterar senha</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Senha antiga'
                  placeholderTextColor='#7C7C8A'
                  secureTextEntry
                  selectionColor='#00B37E'
                />

                <TextInput
                  style={styles.input}
                  placeholder='Nova senha'
                  placeholderTextColor='#7C7C8A'
                  secureTextEntry
                  selectionColor='#00B37E'
                />
              </View>

              {/* <TouchableOpacity
                style={styles.btn}
                onPress={handleSave}
              >
                <Text style={styles.label}>Atualizar</Text>
              </TouchableOpacity> */}
              <Button title="Salvar" handlePress={handleSave} />
              <Button title="Limpar" handlePress={handleClean} />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyAvContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#202024',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    marginVertical: 24, // cima/baixo
  },
  main: {
    backgroundColor: '#121214',
    flex: 1, // ocupa todo espaço disponivel em tela
    width: '100%',
    paddingVertical: 24, // espaço interno cima/baixo
    paddingHorizontal: 40,
  },
  btnAvatar: {
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 148,
    height: 148,
    borderRadius: 148,
    borderWidth: 2,
    borderColor: '#323238',
  },
  txtAlterarFoto: {
    color: '#00B37E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputsContainer: {
    gap: 16,
    marginTop: 36,
  },
  input: {
    backgroundColor: '#39393C',
    height: 56,
    width: '100%',
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    paddingLeft: 16, // espaço interno na lateral esquerda
  },
  inputDisabled: {
    backgroundColor: '#202024',
    color: '#666',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
