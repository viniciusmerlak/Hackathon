import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import MapView, { Marker, Polygon, MapPressEvent } from "react-native-maps"; // Corrigido aqui
import { Ionicons } from "@expo/vector-icons";

interface Coordinate {
  latitude: number;
  longitude: number;
}

const MappingScreen = () => {
  const [polygonCoords, setPolygonCoords] = useState<Coordinate[]>([]);
  const [sensorPositions, setSensorPositions] = useState<Coordinate[]>([]);

  const handleMapPress = (event: MapPressEvent) => { // Corrigido aqui
    const { coordinate } = event.nativeEvent;
    setPolygonCoords([...polygonCoords, coordinate]);
  };

  const calculateSensorPositions = () => {
    if (polygonCoords.length < 3) {
      alert("Desenhe pelo menos 3 pontos para formar uma área.");
      return;
    }

    const newSensors: Coordinate[] = [];
    for (let i = 0; i < 5; i++) {
      const lat = polygonCoords[0].latitude + (Math.random() - 0.5) * 0.01;
      const lng = polygonCoords[0].longitude + (Math.random() - 0.5) * 0.01;
      newSensors.push({ latitude: lat, longitude: lng });
    }

    setSensorPositions(newSensors);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        onPress={handleMapPress}
      >
        {polygonCoords.length > 0 && (
          <Polygon
            coordinates={polygonCoords}
            strokeColor="#000"
            fillColor="rgba(0, 150, 255, 0.3)"
            strokeWidth={2}
          />
        )}
        {sensorPositions.map((position, index) => (
          <Marker key={index} coordinate={position} title={`Sensor ${index + 1}`} />
        ))}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={calculateSensorPositions}>
        <Text style={styles.buttonText}>Calcular Posições dos Sensores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={() => setPolygonCoords([])}>
        <Ionicons name="trash-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Limpar Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#0AAD41",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  clearButton: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default MappingScreen;