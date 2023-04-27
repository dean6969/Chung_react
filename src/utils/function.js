export function getColor(d) {
  return d < 10
    ? '#FFEDA0'
    : d < 20
    ? '#FED976'
    : d < 30
    ? '#FEB24C'
    : d < 40
    ? '#FD8D3C'
    : d < 50
    ? '#FC4E2A'
    : d < 60
    ? '#E31A1C'
    : d < 70
    ? '#BD0026'
    : '#800026';
}

export function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}
