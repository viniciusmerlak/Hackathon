import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import MapView, { Polygon, Marker } from "react-native-maps";
import { calculateGrid } from "../utils/calculateGrid";

// Função para calcular a envoltória convexa
const convexHull = (points: { latitude: number; longitude: number }[]) => {
    if (points.length < 3) return points;

    const sortedPoints = points.slice().sort((a, b) => a.latitude - b.latitude);

    const crossProduct = (o: any, a: any, b: any) => {
        return (a.longitude - o.longitude) * (b.latitude - o.latitude) - (a.latitude - o.latitude) * (b.longitude - o.longitude);
    };

    const lowerHull: any[] = [];
    for (let i = 0; i < sortedPoints.length; i++) {
        while (lowerHull.length >= 2 && crossProduct(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], sortedPoints[i]) <= 0) {
            lowerHull.pop();
        }
        lowerHull.push(sortedPoints[i]);
    }

    const upperHull: any[] = [];
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
        while (upperHull.length >= 2 && crossProduct(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], sortedPoints[i]) <= 0) {
            upperHull.pop();
        }
        upperHull.push(sortedPoints[i]);
    }

    upperHull.pop();
    lowerHull.pop();

    return [...lowerHull, ...upperHull];
};

type Coordinate = {
    latitude: number;
    longitude: number;
};

const isPointInPolygon = (point: Coordinate, polygon: Coordinate[]) => {
    let isInside = false;
    const x = point.latitude;
    const y = point.longitude;
    let j = polygon.length - 1;

    for (let i = 0; i < polygon.length; i++) {
        const xi = polygon[i].latitude;
        const yi = polygon[i].longitude;
        const xj = polygon[j].latitude;
        const yj = polygon[j].longitude;

        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) isInside = !isInside;

        j = i;
    }
    return isInside;
};

const MapScreen = () => {
    const [region] = useState({
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const [drawnArea, setDrawnArea] = useState<Coordinate[]>([]);
    const [sensorGrid, setSensorGrid] = useState<{ coordinate: Coordinate }[]>([]);
    const [locked, setLocked] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState<number | null>(null);

    const handleMapPress = (event: any) => {
        if (locked) return;

        const { coordinate } = event.nativeEvent;

        if (drawnArea.length >= 6) return;

        setDrawnArea((prev) => [...prev, coordinate]);
    };

    const handleConfirm = () => {
        if (drawnArea.length >= 3) {
            setLocked(true);
            setSensorGrid(calculateGrid(drawnArea)); // Gera os sensores
        }
    };

    const handleRemoveAll = () => {
        setDrawnArea([]);
        setSensorGrid([]);
        setLocked(false);
        setSelectedSensor(null);
    };

    // Calcular a envoltória convexa
    const hullPoints = drawnArea.length >= 3 ? convexHull(drawnArea) : [];

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={region} onPress={handleMapPress}>
                {hullPoints.length >= 3 && (
                    <Polygon
                        coordinates={hullPoints}
                        strokeWidth={2}
                        strokeColor="blue"
                        fillColor="rgba(0,0,255,0.2)"
                    />
                )}

                {drawnArea.map((coord, index) => (
                    <Marker key={index} coordinate={coord} title={`Ponto ${index + 1}`} />
                ))}

                {sensorGrid
                    .filter((sensor) => isPointInPolygon(sensor.coordinate, drawnArea))
                    .map((sensor, index) => (
                        <Marker
                            key={index}
                            coordinate={sensor.coordinate}
                            title={`Sensor ${index + 1}`}
                            onPress={() => setSelectedSensor(index + 1)} // Seleciona o sensor
                        />
                    ))}
            </MapView>

            <View style={styles.buttonContainer}>
                {!locked && drawnArea.length >= 3 && (
                    <Button title="OK" onPress={handleConfirm} />
                )}
                <Button title="Remover Tudo" onPress={handleRemoveAll} />
            </View>

            {/* Exibe o botão de "Ver Estatísticas" apenas quando o sensor 1 é selecionado */}
            {selectedSensor === 1 && (
                <View style={styles.statsButtonContainer}>
                    {/* <Button title="Ver Estatísticas" onPress={() => {
                        navigation.navigate("RelatorioScreen")
                    }} /> */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        flexDirection: "row",
        gap: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    statsButtonContainer: {
        position: "absolute",
        bottom: 80,
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
});

export default MapScreen;
