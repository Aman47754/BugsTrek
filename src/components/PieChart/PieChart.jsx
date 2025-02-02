import { useContext } from "react";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApiContext } from "../../Data/ApiProvider";

const PieChart = ({ platform }) => {
  const { codechef, leetcode, codeforcesProblem } = useContext(ApiContext);

  let piechartArray = [];
  let platformTotal = 0;
  let TotalEasy = 0;
  let TotalMedium = 0;
  let TotalHard = 0;

  let toughLabels;

  // Handle Leetcode Data
  if (platform === "Leetcode" && leetcode) {
    toughLabels = ["Easy", "Medium", "Hard"];
    piechartArray = [
      leetcode.easySolved,
      leetcode.mediumSolved,
      leetcode.hardSolved,
    ];
    platformTotal = leetcode.totalQuestions;
    TotalEasy = leetcode.totalEasy;
    TotalMedium = leetcode.totalMedium;
    TotalHard = leetcode.totalHard;
  }

  // Handle Codeforces Data
  if (platform === "Codeforces" && codeforcesProblem) {
    toughLabels = ["<1000", "<1200", ">1200"];
    piechartArray = [0, 0, 0]; // Easy, Medium, Hard counts
    platformTotal = 0; // Total solved problems in Codeforces

    codeforcesProblem.result.forEach((que) => {
      if (que.verdict === "OK") {
        platformTotal = ">10000";
        if (que.problem.rating <= 1000) {
          piechartArray[0]++;
        } else if (que.problem.rating > 1000 && que.problem.rating <= 1200) {
          piechartArray[1]++;
        } else {
          piechartArray[2]++;
        }
      }
    });
    
  }

  const options = {
    series: piechartArray,
    chart: {
      height: 390,
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "85%",
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: function (value, opts) {
                const index = opts.seriesIndex;
                let total = "N/A"; // Default value for hover display

                if (platform === "Leetcode") {
                  // Leetcode-specific totals
                  if (index === 0) total = TotalEasy;
                  if (index === 1) total = TotalMedium;
                  if (index === 2) total = TotalHard;
                }

                if (platform === "Codeforces") {
                  // For Codeforces, totals are dynamically calculated
                  if (index === 0) total = piechartArray[0];
                  if (index === 1) total = piechartArray[1];
                  if (index === 2) total = piechartArray[2];
                }

                return `${value} / ${total}`;
              },
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return (
                  w.globals.seriesTotals.reduce((a, b) => a + b, 0) +
                  " / " +
                  (platformTotal || "N/A")
                );
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#28a745", "#ffc107", "#dc3545"], // Colors for Easy, Medium, Hard
    labels: toughLabels,
    legend: {
      show: true,
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  // Conditional rendering for chart
  if (platform === "Codechef") {
    return <p>No data available for CodeChef</p>;
  }

  return (
    <div id="chart">
      {piechartArray.length > 0 ? (
        <ReactApexChart
          options={options}
          series={options.series}
          type="donut"
          height={220}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default PieChart;
