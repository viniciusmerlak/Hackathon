// app/index.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Questrial_400Regular } from "@expo-google-fonts/questrial";
import { ReadexPro_400Regular } from "@expo-google-fonts/readex-pro";
import AppLoading from "expo-app-loading";
import { styles } from './styles/styles';
import InputField from './components/ImputField';


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Login com:", email, password);
  };

  let [fontsLoaded] = useFonts({
    Questrial_400Regular,
    ReadexPro_400Regular
  });

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
    return <AppLoading />;
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
              icon="person" // Ícone válido do Ionicons
              placeholder="Nome do usuário"
              value={email}
              onChangeText={setEmail}
            />
            <InputField
              icon="lock-closed" // Ícone válido do Ionicons
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