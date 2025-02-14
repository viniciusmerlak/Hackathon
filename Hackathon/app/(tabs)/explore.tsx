import { database } from "./firebaseConfig/firebase";
import { ref, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function SensorDataScreen({ sensorId }: any) {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sensorRef = ref(database, `sensores/${sensorId}`);

    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorData(snapshot.val());
      }
      setLoading(false);
    });

    return () => {}; // O Realtime Database atualiza automaticamente, sem necessidade de unsubscribe
  }, [sensorId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00e676" style={styles.loading} />;
  }

  if (!sensorData) {
    return <Text style={styles.error}>Dados não encontrados</Text>;
  }

  const { nome, touchSensor, touchSensor2 } = sensorData;

  // Cálculo para exibir mais microorganismos quanto menor o valor
  const microorganismos = Math.max(100 - ((touchSensor + touchSensor2) / 2), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <Text style={styles.label}>Touch Sensor 1: {touchSensor}</Text>
      <Text style={styles.label}>Touch Sensor 2: {touchSensor2}</Text>
      <Text style={styles.label}>Quantidade de Microorganismos: {microorganismos}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

//export default SensorDataScreen;
