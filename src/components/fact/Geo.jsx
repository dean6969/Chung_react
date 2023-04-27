import React, { useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { style } from '../../utils/function';

const Geo = ({ file }) => {
  const map = useMap();
  const geoJsonRef = useRef();

  function resetHighlight(e) {
    geoJsonRef.current.resetStyle(e.sourceTarget);
    // info.update();
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
    // info.update(layer.feature.properties);
  }

  function zoomToFeature(e) {
    map.fitBounds(e.sourceTarget.getBounds());
  }

  return (
    <GeoJSON
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
