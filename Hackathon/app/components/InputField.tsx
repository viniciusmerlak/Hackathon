// components/InputField.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Definindo a interface para as props
interface InputFieldProps {
  icon: keyof typeof Ionicons.glyphMap; // Tipando o ícone como um nome válido do Ionicons
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ icon, placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#000" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 25, width: "80%", marginVertical: 10, paddingHorizontal: 15, height: 50, borderWidth: 2, borderLeftColor: "#00e6ff", borderRightColor: "black" },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 40, color: "#000" }
});

export default InputField;