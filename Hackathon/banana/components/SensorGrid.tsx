type Coordinate = {
    latitude: number;
    longitude: number;
  };
  
  // Função para calcular a área do polígono
  const calculatePolygonArea = (coordinates: Coordinate[]): number => {
    let area = 0;
    const numPoints = coordinates.length;
  
    for (let i = 0; i < numPoints; i++) {
      const j = (i + 1) % numPoints;
      area += coordinates[i].latitude * coordinates[j].longitude;
      area -= coordinates[j].latitude * coordinates[i].longitude;
    }
  
    return Math.abs(area / 2) * 111.32 * 111.32; // Convertendo para km²
  };
  
  // Função para calcular o centro do polígono
  const calculatePolygonCenter = (polygon: Coordinate[]): Coordinate => {
    const latSum = polygon.reduce((sum, p) => sum + p.latitude, 0);
    const lngSum = polygon.reduce((sum, p) => sum + p.longitude, 0);
    return {
      latitude: latSum / polygon.length,
      longitude: lngSum / polygon.length,
    };
  };
  
  // Função para calcular a grade de sensores
  export const calculateGrid = (polygon: Coordinate[]): { coordinate: Coordinate }[] => {
    const sensors: { coordinate: Coordinate }[] = [];
    const spacing = 0.009; // Aproximadamente 1km em latitude/longitude
  
    const area = calculatePolygonArea(polygon);
    const center = calculatePolygonCenter(polygon);
  
    if (area <= 1.5) {
      // Se a área for pequena, apenas um sensor no centro
      sensors.push({ coordinate: center });
    } else {
      // Se for maior, criar uma grade centralizada no meio do polígono
      const halfGridSize = Math.sqrt(area) / 2; // Tamanho da metade da grid em graus
  
      const minLat = center.latitude - halfGridSize;
      const maxLat = center.latitude + halfGridSize;
      const minLng = center.longitude - halfGridSize;
      const maxLng = center.longitude + halfGridSize;
  
      for (let lat = minLat; lat <= maxLat; lat += spacing) {
        for (let lng = minLng; lng <= maxLng; lng += spacing) {
          sensors.push({ coordinate: { latitude: lat, longitude: lng } });
        }
      }
    }
  
    return sensors;
  };
  