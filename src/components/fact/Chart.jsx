import { useState, useEffect } from 'react';
import { api } from '../../api/axios';
import { ResponsiveLine } from '@nivo/line';

const options = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT'];

const sampleData = [
  {
    id: 'japan',
    color: 'hsl(286, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 289,
      },
      {
        x: 'helicopter',
        y: 81,
      },
      {
        x: 'boat',
        y: 253,
      },
      {
        x: 'train',
        y: 243,
      },
      {
        x: 'subway',
        y: 154,
      },
      {
        x: 'bus',
        y: 41,
      },
      {
        x: 'car',
        y: 185,
      },
      {
        x: 'moto',
        y: 254,
      },
      {
        x: 'bicycle',
        y: 273,
      },
      {
        x: 'horse',
        y: 51,
      },
      {
        x: 'skateboard',
        y: 171,
      },
      {
        x: 'others',
        y: 145,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(74, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 190,
      },
      {
        x: 'helicopter',
        y: 15,
      },
      {
        x: 'boat',
        y: 141,
      },
      {
        x: 'train',
        y: 276,
      },
      {
        x: 'subway',
        y: 62,
      },
      {
        x: 'bus',
        y: 278,
      },
      {
        x: 'car',
        y: 176,
      },
      {
        x: 'moto',
        y: 222,
      },
      {
        x: 'bicycle',
        y: 234,
      },
      {
        x: 'horse',
        y: 105,
      },
      {
        x: 'skateboard',
        y: 37,
      },
      {
        x: 'others',
        y: 110,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(93, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 196,
      },
      {
        x: 'helicopter',
        y: 21,
      },
      {
        x: 'boat',
        y: 41,
      },
      {
        x: 'train',
        y: 58,
      },
      {
        x: 'subway',
        y: 299,
      },
      {
        x: 'bus',
        y: 211,
      },
      {
        x: 'car',
        y: 104,
      },
      {
        x: 'moto',
        y: 146,
      },
      {
        x: 'bicycle',
        y: 274,
      },
      {
        x: 'horse',
        y: 146,
      },
      {
        x: 'skateboard',
        y: 65,
      },
      {
        x: 'others',
        y: 145,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(7, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 29,
      },
      {
        x: 'helicopter',
        y: 31,
      },
      {
        x: 'boat',
        y: 240,
      },
      {
        x: 'train',
        y: 67,
      },
      {
        x: 'subway',
        y: 10,
      },
      {
        x: 'bus',
        y: 81,
      },
      {
        x: 'car',
        y: 56,
      },
      {
        x: 'moto',
        y: 249,
      },
      {
        x: 'bicycle',
        y: 154,
      },
      {
        x: 'horse',
        y: 93,
      },
      {
        x: 'skateboard',
        y: 297,
      },
      {
        x: 'others',
        y: 21,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(34, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 28,
      },
      {
        x: 'helicopter',
        y: 32,
      },
      {
        x: 'boat',
        y: 28,
      },
      {
        x: 'train',
        y: 182,
      },
      {
        x: 'subway',
        y: 26,
      },
      {
        x: 'bus',
        y: 239,
      },
      {
        x: 'car',
        y: 270,
      },
      {
        x: 'moto',
        y: 93,
      },
      {
        x: 'bicycle',
        y: 200,
      },
      {
        x: 'horse',
        y: 217,
      },
      {
        x: 'skateboard',
        y: 280,
      },
      {
        x: 'others',
        y: 3,
      },
    ],
  },
];

const Chart = ({ leafletState }) => {
  const [fullData, setFullData] = useState(null);
  const [data, setData] = useState(null);
  const [state, setState] = useState(leafletState);

  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      var response = await api.get('get_fulldata');
      setFullData(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setState(leafletState);
  }, [leafletState]);

  useEffect(() => {
    if (fullData) {
      const filtered_arr = fullData.filter((item) => item.State === state);
      const value = filtered_arr.map((item) => item.co2);
      console.log(value);
      setData(value);
    }
  }, [state, fullData]);

  return (
    <>
      <div className="max-w-[1240px] mx-auto mt-10">
        <div className="flex">
          <p className="text-white mr-3">Select state: </p>
          <select onChange={handleChangeState} value={state}>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto rounded bg-white mt-3 h-[350px]">
        <ResponsiveLine
          data={sampleData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

export default Chart;
