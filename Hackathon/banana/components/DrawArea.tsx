import React, { useState } from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import { Polygon, Marker } from "react-native-maps";

type Coordinate = {
  latitude: number;
  longitude: number;
};

type DrawAreaProps = {
  onComplete: (coordinates: Coordinate[]) => void;
  drawnArea: Coordinate[];
};

const DrawArea: React.FC<DrawAreaProps> = ({ onComplete, drawnArea }) => {
  const [currentPath, setCurrentPath] = useState<Coordinate[]>([]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setCurrentPath([]);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { locationX, locationY } = evt.nativeEvent;
      const newPoint = {
        latitude: locationY,
        longitude: locationX,
      };
      setCurrentPath((prevPath) => [...prevPath, newPoint]);
    },
    onPanResponderRelease: () => {
      onComplete(currentPath);
    },
  });

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      {drawnArea.length > 2 && (
        <Polygon
          coordinates={drawnArea}
          strokeWidth={2}
          strokeColor="blue"
          fillColor="rgba(0,0,255,0.2)"
        />
      )}
      {drawnArea.map((coord, index) => (
        <Marker key={index} coordinate={coord} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DrawArea;