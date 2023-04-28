import { useState, useEffect } from 'react';
import { api } from '../../api/axios';
import { ResponsiveLine } from '@nivo/line';
import Loading from './Loading';

const options = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT'];

const Chart = ({ leafletState }) => {
  const [fullData, setFullData] = useState(null);
  const [data, setData] = useState([]);
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
      const objData = {
        id: 'norway',
        color: 'hsl(150, 50%, 60%)',
        data: [],
      };
      const filtered_arr = fullData.filter((item) => item.State === state);
      const co2_value = filtered_arr.map((item) => item.co2);
      co2_value.forEach((item, index) => {
        objData.data.push({
          x: index + 1990,
          y: item,
        });
      });
      setData([objData]);
    }
  }, [state, fullData]);

  return (
    <>
      <div className="max-w-[1240px] mx-auto mt-10">
        <div className="flex">
          <p className="text-white mr-3">Select state: </p>
          <select className="" onChange={handleChangeState} value={state}>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-[1240px] mx-auto rounded bg-white mt-10 h-[350px]">
        {data.length ? (
          <ResponsiveLine
            data={data}
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
              legend: 'year',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'CO2/ capita^2',
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
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Chart;
