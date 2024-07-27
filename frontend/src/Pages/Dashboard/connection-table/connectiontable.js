import "./connectiontable.css";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { Input, Table, DatePicker } from "antd";
import edit from "../../../assets/icons/edit.svg";
import React, { useContext, useEffect, useState } from "react";
import connectionList from "../../../utils/staticjson/connectionlist.json";
import { ConnectionContext } from "../../../utils/contexts/connection-context-provider/connection-context";

const { RangePicker } = DatePicker;
const API_URL = "http://localhost:8000/";

export const ConnectionTable = () => {
  const [connectionTableData, setConnectionTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [range, setRange] = useState([null, null]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 10,
    },
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const columns = [
    {
      title: "Applicant ID",
      dataIndex: "ID",
      width: "15%",
    },
    {
      title: "Applicant Name",
      dataIndex: "Applicant_Name",
      width: "25%",
    },
    {
      title: "Reviewer Name",
      dataIndex: "Reviewer_Name",
      width: "20%",
    },
    {
      title: "Application Date",
      dataIndex: "Date_of_Application",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: "15%",
      render: (status) => {
        let className = "";
        switch (status) {
          case "Approved":
            className = "status-approved";
            break;
          case "Pending":
            className = "status-pending";
            break;
          case "Rejected":
            className = "status-rejected";
            break;
          case "Connection Released":
            className = "status-connection-released";
            break;
          default:
            break;
        }
        return <span className={`status-tag ${className}`}>{status}</span>;
      },
    },
    {
      title: "Edit",
      dataIndex: "",
      render: (_, record) => {
        return (
          // <Link to={`/details/${record.id}`}>
          <img
            src={edit}
            alt="edit"
            onClick={() => handleConnectionEdit(record)}
            className="edit-icon"
          />
          // </Link>
        );
      },
    },
  ];

  useEffect(() => {
    getConnectionTableData();
  }, []);

  const getConnectionTableData = async (
    currentPage = tableParams.pagination.current,
    pageSize = tableParams.pagination.pageSize,
    searchText = searchValue
  ) => {
    setLoading(true);
    try {
      // const response = await connectionList;
      const res = await fetch(API_URL + "connections", { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let response = await res.json();
      let modifiedResponse = response.map((element) => {
        return { key: element.ID, ...element };
      });
      setConnectionTableData(modifiedResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectionEdit = (record) => {
    console.log(record);
    navigate(`/details/${record.ID}`);
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedResults = debounce((text) => searchHandler(text), 500);

  const searchHandler = (text, dateRange = [null, null]) => {
    setSearchValue(text);
    // getConnectionTableData(1, tableParams.pagination.pageSize, text);

    // let filterData = connectionTableData.filter((item) => {
    //   return Object.keys(item).some((entry) => {
    //     return item[entry].toString()?.toLowerCase()?.includes(text);
    //   });
    // });

    const lowerCaseText = text.toLowerCase();
    const isIntegerSearch =
      !isNaN(Number(lowerCaseText)) && lowerCaseText.trim() !== "";

    const [startDate, endDate] = dateRange;

    const start = startDate ? dayjs(startDate).startOf("day") : null;
    const end = endDate ? dayjs(endDate).endOf("day") : null;
    let filterData = connectionTableData.filter((item) => {
      const appDate = dayjs(item.Date_of_Application, "DD/MM/YY").startOf(
        "day"
      );
      const isDateInRange =
        start && end
          ? (appDate.isAfter(start) && appDate.isBefore(end)) ||
            appDate.isSame(start) ||
            appDate.isSame(end)
          : true;

      return (
        isDateInRange &&
        (isIntegerSearch ? item.ID === Number(lowerCaseText) : true) &&
        (item.Applicant_Name.toLowerCase().includes(lowerCaseText) ||
          item.Reviewer_Name.toLowerCase().includes(lowerCaseText) ||
          item.Status.toLowerCase().includes(lowerCaseText))
      );
    });

    setFilteredData(filterData);
  };

  const handleRangeChange = (dates) => {
    if (dates) {
      setRange(dates);
      searchHandler(searchValue, dates);
    } else {
      setRange([null, null]);
    }
  };

  return (
    <div className="connection-table-container">
      <h3>Connections</h3>
      <div className="filters-container">
        <Input
          placeholder="Search"
          // onChange={(e) => debouncedResults(e.target.value.toLowerCase())}
          onChange={(e) => searchHandler(e.target.value.toLowerCase(), range)}
          className="search-input"
        />
        <RangePicker onChange={handleRangeChange} className="range-picker" />
      </div>
      <Table
        bordered
        dataSource={
          searchValue.length || range[0] ? filteredData : connectionTableData
        }
        columns={columns}
        loading={loading}
        // pagination={{ ...tableParams.pagination }}
        className="connection-table"
        scroll={{ y: 400 }}
      />
    </div>
  );
};
