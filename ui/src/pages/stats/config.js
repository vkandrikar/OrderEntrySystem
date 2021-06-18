
let data = {
  labels: ['Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6'],
  datasets: [
    {
      label: '# of Sales',
      data: [12, 19, 3, 5, 2, 3],
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

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const generateChartData = (dataArr) => {
  if (!dataArr) return [];
  
  let chartLables = [];
  let chartData = [];
  dataArr.map( (item) => {
    chartLables.push(item.code);
    chartData.push(item.sale_count);
  })

  data.labels = chartLables;
  data.datasets.data = chartData;

  return data;
}