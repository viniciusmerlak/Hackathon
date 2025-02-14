import React from 'react';
import { Marker } from 'react-native-maps';



// Tipos para as props do componente
type SensorMarkerProps = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  conductivity?: number;
};

const SensorMarker: React.FC<SensorMarkerProps> = ({ coordinate, conductivity }) => {
  // Função para recomendar um bioremediador
  const recommendBioremediator = (conductivity: number): string => {
    if (conductivity > 100) {
      return 'Bioremediador A';
    } else if (conductivity > 50) {
      return 'Bioremediador B';
    } else {
      return 'Bioremediador C';
    }
  };

  return (
    <Marker
      coordinate={coordinate}
      title={`Sensor (${coordinate.latitude.toFixed(2)}, ${coordinate.longitude.toFixed(2)})`}
      description={
        conductivity
          ? `Condutividade: ${conductivity}\nRecomendação: ${recommendBioremediator(conductivity)}`
          : 'Sem dados'
      }
    />
  );
};

export default SensorMarker;