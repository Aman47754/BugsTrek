import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import { ApiContext } from "../../Data/ApiProvider";

const ContestGraph = ({platform}) => {
  const {codechef,codeforcesContest,leetcodeContestData}=useContext(ApiContext);
  // console.log(codeforcesContest);
  let XaxisData=[];
  let YaxisData=[];
  
  

  if(platform==='Codechef' && codechef){
    console.log(codechef);
    XaxisData=codechef.ratingData.map((entry) => entry.code); // Extract contest names (e.g., "COOK146", "LTIME120")
    YaxisData=codechef.ratingData.map((entry) => entry.rating); // Extract ratings
  }
  else if(platform==='Codeforces' && codeforcesContest ){
    
    XaxisData=codeforcesContest.result.map((entry)=>entry.contestName);
    YaxisData=codeforcesContest.result.map((entry)=>entry.newRating);

  }
  else if(platform ==='Leetcode' && leetcodeContestData){
    

    XaxisData=leetcodeContestData.contestParticipation.map((entry)=>entry.contest.title);
    YaxisData=leetcodeContestData.contestParticipation.map((entry)=>entry.rating);

  }

  
  

  const options = {
    chart: {
      height: 300,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels on the graph
    },
    markers: {
    size: 4, // Size of the dots
    colors: ["#1f77b4"], // Dot color matching the line color
    strokeColors: "#ffffff", // Optional border color for dots
    strokeWidth: 1, // Border width for dots
    hover: {
      size: 7, // Dot size on hover
   
    },
  },
    stroke: {
      curve: "smooth", // Makes the line smooth
    },
    xaxis: {
      labels: {
        show: false, // Hides the labels on the X-axis
      },
      type: "category", // X-axis values represent categories (contest names)
      categories: XaxisData, // Dynamic X-axis from fetched data (contest names)
      
    },
    yaxis: {
      title: {
        text: "Rating", // Label for Y-axis
      },
    },
    tooltip: {
      x: {
        show: true,
        formatter: (value, { dataPointIndex }) => {
          // Display the contest name for the hovered point
          return XaxisData[dataPointIndex] || "N/A";
        },
      },
    },
    fill: {
      opacity: 0.5, // Adjust the transparency of the filled area
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // Set colors for gradient (optional)
        inverseColors: true,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    colors: ["#1f77b4"], // Line and area color
  };

  const series = [
    {
      name: "Rating",
      data: YaxisData, // Dynamic Y-axis from fetched data
    },
  ];

  return (
    <div id="area-graph">
      <ReactApexChart options={options} series={series} type="area" height={295} />
    </div>
  );
};

export default ContestGraph;
