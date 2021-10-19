import React, { useCallback, useEffect, useState } from "react";
import "./OverviewTab.scss";

export const OverviewTab = () => {
  const [data, setData] = useState<any>({});
  const fetchData = useCallback(() => {
    const url = "https://disease.sh/v3/covid-19/all";
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

  return Object.keys(data).length > 0 ? (
    <div>
      <div className="tabs-wrapper">
        <div className="block">
          <div className="block-main">
            <label className="label-big">Total cases</label>
            <div className="number-big">{data.cases.toLocaleString()}</div>
          </div>
          <div className="block-extra">
            <label className="label-big">Today cases</label>
            <div className="number-big">{data.todayCases.toLocaleString()}</div>
          </div>
        </div>
        <div className="block">
          <div className="block-main">
            <label className="label-big">Total deaths</label>
            <div className="number-big">{data.deaths.toLocaleString()}</div>
          </div>
          <div className="block-extra">
            <label className="label-big">Today deaths</label>
            <div className="number-big">
              {data.todayDeaths.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="block">
          <div className="block-main">
            <label className="label-big">Total recovered</label>
            <div className="number-big">{data.recovered.toLocaleString()}</div>
          </div>
          <div className="block-extra">
            <label className="label-big">Today recovered</label>
            <div className="number-big">
              {data.todayRecovered.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="block">
          <div className="block-main">
            <label className="label-big">Total tests</label>
            <div className="number-big">{data.tests.toLocaleString()}</div>
          </div>
          <div className="block-extra">
            <label className="label-big">Tests per one million</label>
            <div className="number-big">
              {data.testsPerOneMillion.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <div className="last-updated">
        Last update {new Date(data.updated).toISOString()}
      </div>
    </div>
  ) : null;
};
