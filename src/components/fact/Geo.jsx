import React, { useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { style } from '../../utils/function';

const Geo = ({ file, key, handleStateChange }) => {
  const map = useMap();
  const geoJsonRef = useRef();

  function resetHighlight(e) {
    geoJsonRef.current.resetStyle(e.sourceTarget);
    handleStateChange(null);
  }

  function highlightFeature(e) {
    var layer = e.sourceTarget;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.2,
    });

    layer.bringToFront();
    handleStateChange(layer.feature.properties);
  }

  function zoomToFeature(e) {
    map.fitBounds(e.sourceTarget.getBounds());
  }

  return (
    <GeoJSON
      key={key}
      ref={geoJsonRef}
      data={file}
      style={style}
      eventHandlers={{
        click: zoomToFeature,
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      }}
    />
  );
};

export default Geo;
