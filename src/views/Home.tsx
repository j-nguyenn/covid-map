import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./Home.scss";

export const Home = () => {
  const [data, setData] = useState<any>([]);
  const [map, setMap] = useState<any>();

  const fetchData = useCallback(() => {
    const url = "https://corona.lmao.ninja/v2/countries";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.warn({ err });
      });
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (map && data) {
      formatGeoData(data);
    }
    // eslint-disable-next-line
  }, [map, data]);

  const formatGeoData = (response: any[]) => {
    const hasData = Array.isArray(response) && response.length > 0;
    if (!hasData) return;

    const geoJson: any = {
      type: "FeatureCollection",
      features: response.map((country: any) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: "Feature",
          properties: {
            ...country,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { country, updated, cases, deaths, recovered } = properties;

        casesString = `${cases}`;

        if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}k+`;
        }

        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
      <span class="icon-marker">
        <span class="icon-marker-tooltip">
          <h2>${country}</h2>
          <ul>
            <li><strong>Confirmed:</strong> ${cases}</li>
            <li><strong>Deaths:</strong> ${deaths}</li>
            <li><strong>Recovered:</strong> ${recovered}</li>
            <li><strong>Last Update:</strong> ${updatedFormatted}</li>
          </ul>
        </span>
        ${casesString}
      </span>
    `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html,
          }),
          riseOnHover: true,
        });
      },
    });
    geoJsonLayers.addTo(map);
  };

  return (
    <MapContainer
      center={[35, 40]}
      zoom={2}
      scrollWheelZoom={false}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
