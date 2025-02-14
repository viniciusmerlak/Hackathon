type Coordinate = {
    latitude: number;
    longitude: number;
  };
  
  export const calculateGrid = (polygon: Coordinate[]): { coordinate: Coordinate }[] => {
    const sensors: { coordinate: Coordinate }[] = [];
    const spacing = 0.009; // Aproximadamente 1km em latitude/longitude
  
    const minLat = Math.min(...polygon.map((p) => p.latitude));
    const maxLat = Math.max(...polygon.map((p) => p.latitude));
    const minLng = Math.min(...polygon.map((p) => p.longitude));
    const maxLng = Math.max(...polygon.map((p) => p.longitude));
  
    for (let lat = minLat; lat <= maxLat; lat += spacing) {
      for (let lng = minLng; lng <= maxLng; lng += spacing) {
        sensors.push({ coordinate: { latitude: lat, longitude: lng } });
      }
    }
  
    return sensors;
  };