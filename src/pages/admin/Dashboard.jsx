import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import faker from "faker";
import { apiMonthlyRevenue } from "apis";
import { formatMoney, formatPrice } from "utils/helper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      position: "left",
      title: {
        display: true,
        text: "Doanh thu hàng ngày",
      },
    },
    y1: {
      position: "right",
      title: {
        display: true,
        text: "Số sản phẩm đã bán",
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu đồ mua hàng tháng này",
    },
  },
};

export default function Dashboard() {
  const [listKey, setListKey] = useState([]);
  const fetchListMonth = async () => {
    const res = await apiMonthlyRevenue();
    let keys = [];
    for (const key in res.groupedData) {
      if (res.groupedData.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    function parseDateString(dateString) {
      const [month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1); // Months are 0-based in JavaScript
    }
    
    // Sort the date strings as Date objects
    keys = keys.sort((a, b) => parseDateString(a) - parseDateString(b));
    setListKey(keys);
  }
  useEffect(() => {
    fetchListMonth()
  }, [])
  return (
    <Data listKey={listKey}/>
  )
}

 function Data({listKey}) {
  const [recordsNumber, setRecordsNumber] = useState();
  const [userList, setUserList] = useState();
  const [personalRank, setPersonalRank] = useState([]);
  const [age, setAge] = useState();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  useEffect(() => {
    fetchAllUser(age);
  }, [age]);
  const fetchAllUser = async (age) => {
    const res = await apiMonthlyRevenue();
    setUserList(res.groupedData[age]);
    const customerTotals = {};
    res?.groupedData[age]?.forEach((transaction) => {
      const { customer, price } = transaction;
      if (!customerTotals[customer]) {
        customerTotals[customer] = 0;
      }
      customerTotals[customer] += price;
    });

    // Chuyển tổng giá tiền từng khách hàng thành một mảng các đối tượng
    const customerRankings = Object.keys(customerTotals).map((customer) => ({
      customer,
      totalAmount: customerTotals[customer],
    }));
    // Sắp xếp danh sách khách hàng theo tổng giá tiền từ cao đến thấp
    const sortedRankings = customerRankings.sort(
      (a, b) => b.totalAmount - a.totalAmount
    );
    setPersonalRank(sortedRankings);
    let total = sortedRankings.reduce(((acc, initial) => acc + initial.totalAmount), 0)
    setRecordsNumber(total);
  };
  
  const labels = userList?.map((item) => item?.date);
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu tại thời điểm này",
        data: userList?.map((item) => item.price),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: "circle",
        pointRadius: 15,
        pointHoverRadius: 20,
      },
      {
        label: "Số sản phẩm đã bán",
        data: userList?.map((item) => item.quantity),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointRadius: 15,
        pointHoverRadius: 20,
      },
    ],
  };
  const dataPie = {
    labels: personalRank.map((i) => i.customer),
    datasets: [
      {
        label: "# of Votes",
        data: personalRank.map((i) => i.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log(userList)
  return (
    <div>
      <div>Tổng doanh thu tháng này: {formatPrice(recordsNumber, "VND")}</div>
      <div className="w-[100vw] h-[60vh] flex">
        <Line options={options} data={data} />
        <div className="">
          <Pie data={dataPie} />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bộ lọc</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              {listKey.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="border p-2 mt-4 bg-gray-300">Xếp hạng</div>
          {personalRank.map((item) => (
            <div className="flex border w-[300px] p-2 gap-2">
              <div>{item.customer}: </div>
              <p className="">{formatMoney(item.totalAmount)} VND</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
