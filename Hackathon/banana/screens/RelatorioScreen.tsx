import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RelatorioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Estatísticas</Text>
      {/* Exiba as informações de estatísticas aqui */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default RelatorioScreen;
