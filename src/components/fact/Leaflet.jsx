import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { api } from '../../api/axios';
import Loading from './Loading';
import Geo from './Geo';
import Legend from './Legend';
import Chart from './Chart';

const position = [-28, 133];

var options = [];
for (let i = 1990; i <= 2017; i++) {
  options.push(i);
}

const Leaflet = () => {
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState(options[0]);
  const [state, setState] = useState(null);

  useEffect(() => {
    async function fetchData() {
      var response = await api.get(`search1?message=${selected}`);
      setFile(response.data);
    }
    fetchData();
  }, [selected]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleStateChange = (state) => {
    setState(state);
  };

  return (
    <div className="max-w-[1240px] mx-auto py-12">
      <div className="mb-5 flex justify-between items-center">
        <div className="flex">
          <p className="text-white mr-3">Select year: </p>
          <select onChange={handleChange}>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="w-[280px]">
          <p className="text-white text-2xl">CO2 in Australia per state</p>
          {state ? (
            <p className="text-white">
              <b>{state.STATE_NAME}</b> {state.density} Co2 / capita<sup>2</sup>
            </p>
          ) : (
            <p className="text-white">Hover over a state</p>
          )}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto rounded bg-white p-3">
        {!file ? (
          <Loading />
        ) : (
          <MapContainer
            center={position}
            zoom={3}
            scrollWheelZoom={false}
            className="relative z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Legend />
            <Geo
              file={file}
              key={selected}
              handleStateChange={handleStateChange}
            />
          </MapContainer>
        )}
      </div>
      <Chart leafletState={state ? state.name : 'NSW'} />
    </div>
  );
};

export default Leaflet;
