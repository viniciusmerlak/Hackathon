// app/index.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Questrial_400Regular } from "@expo-google-fonts/questrial";
import { ReadexPro_400Regular } from "@expo-google-fonts/readex-pro";
import * as SplashScreen from 'expo-splash-screen';
import { styles } from './styles/styles';
import InputField from './components/InputField';

// Impede que a tela de splash seja ocultada automaticamente
SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const [fontsLoaded] = useFonts({
    Questrial_400Regular,
    ReadexPro_400Regular
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Oculta a tela de splash quando as fontes estiverem carregadas
    }
  }, [fontsLoaded]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Login com:", email, password);
  };

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(fadeAnim, {
        toValue: 0,
        speed: 1,
        bounciness: 10,
        useNativeDriver: true,
      }).start(() => setShowLogin(true));
    }, 2000);
  }, []);

  if (!fontsLoaded) {
    return null; // Retorna null enquanto as fontes estão carregando
  }

  return (
    <LinearGradient colors={["#5acd84", "#0097bf"]} style={styles.container}>
      {!showLogin ? (
        <Animated.View style={[styles.welcomeScreen, { opacity: fadeAnim }]}>
          <Text style={[styles.startText, { fontFamily: "Questrial_400Regular" }]}>Vamos começar</Text>
        </Animated.View>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={[styles.title, { fontFamily: "Sondos" }]}>Realize seu login</Text>

          <InputField
            icon="person"
            placeholder="Nome do usuário"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            icon="lock-closed"
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={[styles.buttonText, { fontFamily: "ReadexPro_400Regular" }]}>Vamos lá!</Text>
          </TouchableOpacity>

          <Text style={[styles.footerText, { fontFamily: "Sondos" }]}>Seu futuro começa aqui</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default LoginScreen;