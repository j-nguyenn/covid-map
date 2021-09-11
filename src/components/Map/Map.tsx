import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./Map.scss";
import { getMarkerHTML } from "../../utils/map";
import { GlobalContext } from "../../context/GlobalContext";

export const Map = () => {
  const [data, setData] = useState<any>([]);
  const [map, setMap] = useState<any>();
  const didMount = useRef<boolean>(false);
  const { darkTheme } = useContext(GlobalContext);
  console.log(darkTheme);
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
    if (map && data && !didMount.current) {
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

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html: getMarkerHTML(properties),
          }),
          riseOnHover: true,
        });
      },
    });
    geoJsonLayers.addTo(map);
    didMount.current = true;
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2.3}
      scrollWheelZoom={false}
      whenCreated={setMap}
    >
      <TileLayer
        attribution={
          darkTheme
            ? `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>`
            : `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`
        }
        url={
          darkTheme
            ? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        }
      />
    </MapContainer>
  );
};
