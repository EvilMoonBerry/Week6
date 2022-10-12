import "./styles.css";
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm";
// course material used: Week 6 source codes
const dataQuery = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};

const getData = async () => {
  const url =
    " https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const responce = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dataQuery)
  });
  if (!responce.ok) {
    return;
  }
  const data = await responce.json();
  return data;
};

const makeChart = async () => {
  const data = await getData();
  console.log(data);

  const area = data.dimension.Alue.category.label;
  const value = data.value;
  const year = dataQuery.query[0].selection.values;
  //console.log(year);

  const chartData = {
    labels: year,
    datasets: [{ name: area[0], values: value }]
  };

  const chart = new Chart("#chart", {
    data: chartData,
    type: "line",
    height: 450,
    colors: ["#eb5146"],

    lineOptions: {
      hideDots: 0,
      regionFill: 0
    }
  });
};
makeChart();
