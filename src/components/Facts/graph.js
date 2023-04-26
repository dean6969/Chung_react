const axios = require("axios")

axios({
    url: `https://backendtp234.onrender.com/get_fulldata`,
    method: "get",
  }).then((res) => {
    this.records = res.data;
    data = JSON.parse(JSON.stringify(this.records));

    const data_state = data.sort((a, b) => {
        if (a.Year < b.Year) {
            return -1;
        }
        })
        
        default_value = []

        for (i in data_state){
            if (data_state[i].State === "NSW"){
                default_value.push(data_state[i]["co2"])
            }
        }
        const speedCanvas = document.getElementById("speedChart");

        Chart.defaults.font.family = "Teko";
        Chart.defaults.font.size = 22;
        Chart.defaults.color = "black";

        let cols = [];
        for (let i = 1990; i <= 2017; i++) {
        cols.push(i);
        }

        let speedData = {
        labels: cols,
        datasets: [
            {
            label: "Co2 in NSW",
            data: default_value,
            backgroundColor: "rgba(227, 82, 20, 0.3)",
            hoverBackgroundColor: "rgba(227, 82, 20, 1)",
            hoverBorderColor: "red",
            fill: {
                target: "origin",
                above: "rgba(227, 82, 20, 0.3)", // Area will be red above the origin
                below: "rgba(227, 82, 20, 0.3)", // And blue below the origin
            },
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 25,
            },
        ],
        };

        let lineChart = new Chart(speedCanvas, {
        type: "line",
        data: speedData,
        Option: {
            reponsive: true,
            tooltip: {
            usePointStyle: true,
            
            },
        },
        });


        var map = L.map("mapid");

    map.setView([-25, 133], 3);

    var tiles = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);

    const box = document.getElementById("box_year");

    axios({
      url: `https://backendtp234.onrender.com/search1?message=2017`,
      method: "get",
    }).then((res) => {
      this.records = res.data;

      this.file = JSON.parse(JSON.stringify(this.records));

      var color_array = [];

      for (i in this.file.features) {
        color_array.push(this.file.features[i].properties.density);
      }

      color_array = color_array.sort(function (a, b) {
        return b - a;
      });

      function style(feature) {
        return {
          fillColor: getColor(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.7,
        };
      }

      const info = L.control();

      info.onAdd = function (map) {
        this._div = L.DomUtil.create("div", "info");
        this.update();
        return this._div;
      };

      info.update = function (props) {
        const contents = props
          ? `<b>${props.name}</b><br />${props.density} Co2 / capita<sup>2</sup>`
          : "Hover over a state";
        this._div.innerHTML = `<h4>Australia Co2</h4>${contents}`;
      };

      info.addTo(map);

      function getColor(d) {
        return d < 10
          ? "#FFEDA0"
          : d < 20
          ? "#FED976"
          : d < 30
          ? "#FEB24C"
          : d < 40
          ? "#FD8D3C"
          : d < 50
          ? "#FC4E2A"
          : d < 60
          ? "#E31A1C"
          : d < 70
          ? "#BD0026"
          : "#800026";
      }

      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }

      function highlightFeature(e) {
        var layer = e.target;

        console.log(layer.feature.properties.name);

        data_change = [];
            for (i in data_state) {
                if (data_state[i].State === layer.feature.properties.name){
                    data_change.push(data_state[i]["co2"])
            } 
        }

        lineChart.data.datasets[0].data = data_change;
        lineChart.data.datasets[0].label = `CO2 in ${layer.feature.properties.name}`;
        lineChart.update();

        layer.setStyle({
          weight: 5,
          color: "#666",
          dashArray: "",
          fillOpacity: 0.2,
        });

        layer.bringToFront();

        info.update(layer.feature.properties);
      }

      var geojson = L.geoJson(this.file, {
        style,
        onEachFeature,
      }).addTo(map);

      function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
      }

      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature,
        });
      }

      // geojson = L.geoJson(statesData, {
      //     style: style,
      //     onEachFeature: onEachFeature
      // }).addTo(map);

      // method that we will use to update the control based on feature properties passed

      info.update = function (props) {
        this._div.innerHTML =
          "<h4>CO2 in Australia per states</h4>" +
          (props
            ? "<b>" +
              props.STATE_NAME +
              "</b><br />" +
              props.density +
              " Co2 / capita"
            : "Hover over a state");
      };

      info.addTo(map);

      var legend = L.control({ position: "bottomright" });

      legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend"),
          grades = [0, 10, 20, 30, 40, 50, 60, 70],
          labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' +
            getColor(grades[i] + 1) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }

        return div;
      };

      legend.addTo(map);
    });

    box.onchange = function () {
      document.querySelectorAll(".info").forEach((el) => el.remove());

      this.message = box.value;

      axios({
        url: `https://backendtp234.onrender.com/search1?message=${this.message}`,
        method: "get",
      }).then((res) => {
        this.records = res.data;

        this.file = JSON.parse(JSON.stringify(this.records));

        var color_array = [];

        for (i in this.file.features) {
          color_array.push(this.file.features[i].properties.density);
        }

        color_array = color_array.sort(function (a, b) {
          return b - a;
        });

        function style(feature) {
          return {
            fillColor: getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
          };
        }

        const info = L.control();

        info.onAdd = function (map) {
          this._div = L.DomUtil.create("div", "info");
          this.update();
          return this._div;
        };

        info.update = function (props) {
          const contents = props
            ? `<b>${props.name}</b><br />${props.density} Co2 / capita<sup>2</sup>`
            : "Hover over a state";
          this._div.innerHTML = `<h4>Australia Co2</h4>${contents}`;
        };

        info.addTo(map);

        function getColor(d) {
          return d < 10
            ? "#FFEDA0"
            : d < 20
            ? "#FED976"
            : d < 30
            ? "#FEB24C"
            : d < 40
            ? "#FD8D3C"
            : d < 50
            ? "#FC4E2A"
            : d < 60
            ? "#E31A1C"
            : d < 70
            ? "#BD0026"
            : "#800026";
        }

        function zoomToFeature(e) {
          map.fitBounds(e.target.getBounds());
        }

        function highlightFeature(e) {
          var layer = e.target;

          console.log(layer.feature.properties.name);

          data_change = [];
            for (i in data_state) {
                if (data_state[i].State === layer.feature.properties.name){
                    data_change.push(data_state[i]["co2"])
            } 
        }

        lineChart.data.datasets[0].data = data_change;
        lineChart.data.datasets[0].label = `CO2 in ${layer.feature.properties.name}`;
        lineChart.update();

          layer.setStyle({
            weight: 5,
            color: "#666",
            dashArray: "",
            fillOpacity: 0.2,
          });

          layer.bringToFront();

          info.update(layer.feature.properties);
        }

        var geojson = L.geoJson(this.file, {
          style,
          onEachFeature,
        }).addTo(map);

        function resetHighlight(e) {
          geojson.resetStyle(e.target);
          info.update();
        }

        function onEachFeature(feature, layer) {
          layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
          });
        }

        // geojson = L.geoJson(statesData, {
        //     style: style,
        //     onEachFeature: onEachFeature
        // }).addTo(map);

        // method that we will use to update the control based on feature properties passed

        info.update = function (props) {
          this._div.innerHTML =
            "<h4>CO2 in Australia per states</h4>" +
            (props
              ? "<b>" +
                props.STATE_NAME +
                "</b><br />" +
                props.density +
                " Co2 / capita"
              : "Hover over a state");
        };

        info.addTo(map);

        var legend = L.control({ position: "bottomright" });

        legend.onAdd = function (map) {
          var div = L.DomUtil.create("div", "info legend"),
            grades = [0, 10, 20, 30, 40, 50, 60, 70],
            labels = [];

          // loop through our density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
              '<i style="background:' +
              getColor(grades[i] + 1) +
              '"></i> ' +
              grades[i] +
              (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
          }

          return div;
        };

        legend.addTo(map);
      });
    };

    box_state.onchange = function () {
      this.message = box_state.value;

      data_change = [];
            for (i in data_state) {
                console.log(data_state[i].State)
                if (data_state[i].State === this.message){
                    data_change.push(data_state[i]["co2"])
            } 
        }

        console.log(data_change)

        lineChart.data.datasets[0].data = data_change;
        lineChart.data.datasets[0].label = `CO2 in ${this.message}`;
        lineChart.update();
    };


                
            });

