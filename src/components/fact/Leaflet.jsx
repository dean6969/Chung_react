import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { api } from '../../api/axios';
import Loading from './Loading';
import Geo from './Geo';
import Info from './Info';
import { Legend } from 'chart.js';

const position = [-28, 133];

var years = [];
for (let i = 1990; i <= 2017; i++) {
  years.push(i);
}

const Leaflet = () => {
  // const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // var response = await api.get('get_fulldata');
      // const nsw_arr = response.data.filter((item) => item.State === 'NSW');
      // const value = nsw_arr.map((item) => item.co2);
      // setData(value);
      var response = await api.get('search1?message=2017');
      setFile(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-[1240px] mx-auto py-12">
      <div className="mb-5 flex">
        <h3 className="text-white mr-3">Select year: </h3>
        <select>
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="max-w-[1240px] mx-auto rounded bg-white p-3">
        {!file ? (
          <Loading />
        ) : (
          <MapContainer center={position} zoom={3} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Legend />
            <Geo file={file} />
            <Info />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Leaflet;
