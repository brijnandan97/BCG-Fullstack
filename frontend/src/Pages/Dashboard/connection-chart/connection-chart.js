import { useEffect, useState } from "react";
import "./connection-chart.css";
import { Button, DatePicker, Empty, Radio } from "antd";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import dayjs from "dayjs";
import { Spin } from "antd";

const { RangePicker } = DatePicker;
const API_URL = "http://localhost:8000/";

export const ConnectionChart = () => {
  const [radioStatus, setRadioStatus] = useState("Approved");
  const [chartConfigurations, setChartConfigurations] = useState({});
  const [range, setRange] = useState([
    dayjs("2021-01-01"),
    dayjs("2021-12-31"),
  ]);
  const [chartApiResponse, setChartApiReponse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        API_URL +
          `connections/requests?status=${radioStatus}&startDate=${range[0]
            .format("DD/MM/YY")
            .toString()}&endDate=${range[1].format("DD/MM/YY").toString()}`,
        { method: "GET" }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let response = await res.json();
      setChartApiReponse(response?.monthly_counts);
      getChartConfigurations(response?.monthly_counts);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChartConfigurations = (chartData) => {
    let options = {
      chart: {
        type: "line",
        height: "400px",
      },
      title: {
        text: "Connection Requests",
      },
      xAxis: {
        categories: chartData.map((item) =>
          dayjs(item.month_year, "DD/MM").format("MMMM YYYY")
        ),
      },
      yAxis: {
        title: {
          text: "No. of Connections",
        },
        gridLineWidth: 1,
        lineWidth: 1,
        visible: true,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: radioStatus,
          data: chartData.map((item) => item.count),
          color: "#004d40",
        },
      ],
    };
    setChartConfigurations(options);
  };

  const handleRadioChange = (e) => {
    setRadioStatus(e.target.value);
  };

  const handleRangeChange = (dates) => {
    if (dates) {
      setRange(dates);
    }
  };

  return (
    <div className="connection-chart-container">
      <div className="filters">
        <h3>Filters</h3>

        <span>Pick Range</span>
        <RangePicker
          picker="month"
          value={range}
          allowClear={false}
          onChange={handleRangeChange}
          className="range-picker-filter"
        />

        <p>Select Connection Status</p>
        <Radio.Group onChange={handleRadioChange} value={radioStatus}>
          <Radio value={"Approved"}>Approved</Radio>
          <Radio value={"Pending"}>Pending</Radio>
          <Radio value={"Connection Released"}>Connection Released</Radio>
          <Radio value={"Rejected"}>Rejected</Radio>
        </Radio.Group>

        <Button onClick={getChartData} className="apply-button">
          Apply
        </Button>
      </div>

      <div className="chart">
        {loading ? (
          <Spin />
        ) : chartApiResponse.length ? (
          <div className="chart-content">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartConfigurations}
            />
          </div>
        ) : (
          <Empty
            description={<span>No Connection Requests Found</span>}
            imageStyle={{ height: 60 }}
            className="empty-data"
          />
        )}
      </div>
    </div>
  );
};
