import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import faker from 'faker'
import { apiMonthlyRevenue } from 'apis';
import { formatMoney, formatPrice } from 'utils/helper';

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
      position: 'left',
      title: {
        display: true,
        text: 'Doanh thu hàng ngày',
      },
    },
    y1: {
      position: 'right',
      title: {
        display: true,
        text: 'Số sản phẩm đã bán',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu đồ mua hàng tháng này',
    },
  },
};


export default function Dashboard() {
  const [recordsNumber, setRecordsNumber] = useState()
  const [personal, setPersonal] = useState([])
  const [userList, setUserList] = useState()
  const fetchAllUser = async () => {
    const res = await apiMonthlyRevenue();
    setUserList(res.groupedData['10-2023']);
    setRecordsNumber(res.totalMoney)
    setPersonal(res.dataUser)
  };
  const labels = userList?.map(item => item?.date)
  const data = {
    labels,
    datasets: [
      {
        label: 'Doanh thu tại thời điểm này',
        data: userList?.map((item) => item.price),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointStyle: 'circle',
        pointRadius: 15,
        pointHoverRadius: 20
      },
      {
        label: 'Số sản phẩm đã bán',
        data: userList?.map((item) => item.quantity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 15,
        pointHoverRadius: 20,
      },
    ],
  };

  const dataPie  = {
    labels: personal.map(i => i.name),
    datasets: [
      {
        label: '# of Votes',
        data: personal.map(i => i.monthlyRevenueTotalPerson),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    fetchAllUser()
  }, [])
  
  return <div>
            <div>Tổng doanh thu tháng này: {formatPrice(recordsNumber, 'VND')}</div>
            <div className='w-[80vw] h-[60vh] flex'>
              <Line options={options} data={data} />
              <div className='w-[20vw] h-[20vh]'>
                <Pie data={dataPie} />
              </div>
           </div>
        </div>

}
