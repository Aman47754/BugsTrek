import React, { useContext, useState } from "react";
import "./Heatmap.css";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css"; // Ensure heatmap styles are loaded
import { Tooltip } from "react-tooltip";
import { ApiContext } from "../../Data/ApiProvider";

const Heatmap = ({ start, end }) => {
  const { codechef, codeforcesProblem, leetcode } = useContext(ApiContext);


  //Total Inactive Days
  const[inactive,setInactive]=useState(0);

  // Generate values using the codechef and codeforces heatmap data
  const values = generateValues(start, end, codechef?.heatMap || [], codeforcesProblem?.result || [],leetcode?.submissionCalendar ||[]);

  return (
    <div className="heatmap-container w-full">
      <ReactCalendarHeatmap
        startDate={new Date(start)}
        endDate={new Date(end)}
        values={values}
        gutterSize={4}
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-empty";
          return `color-scale-${Math.min(Math.ceil(value.count / 2), 8)}`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value) return {};
          return {
            "data-tooltip-content": `${value.date} --

              CodeChef Submissions: ${value.codechefCount},
              Codeforces Submissions: ${value.codeforcesCount},
              Leetcode Submissions:${value.leetcodeCount}`
          };
        }}
      />
      <Tooltip anchorSelect=".react-calendar-heatmap .color-empty,.color-scale-1, .color-scale-2, .color-scale-3 ,.color-scale-4 ,.color-scale-5 , .color-scale-6 , .color-scale-7, .color-scale-8" />
    </div>
  );
};

// Helper function to generate submission data from codechef and codeforces heatmap
const generateValues = (startDate, endDate, codechefHeatMapData, codeforcesHeatMapData ,leetcodeHeatMapData) => {
  const values = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Create a map of dates to counts for each platform
  const heatMapMap = new Map();

  

  // Process CodeChef data
  codechefHeatMapData.forEach((entry) => {
    const date = new Date(entry.date).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const existingData = heatMapMap.get(date) || { codechefCount: 0, codeforcesCount: 0,leetcodeCount:0 };
    heatMapMap.set(date, {
      ...existingData,
      codechefCount: existingData.codechefCount + entry.value, // Increment CodeChef count
    });
  });

  // Process Codeforces data
  codeforcesHeatMapData.forEach((entry) => {
    const date = new Date(entry.creationTimeSeconds * 1000).toISOString().split("T")[0]; // Convert Unix timestamp to YYYY-MM-DD
    
    const existingData = heatMapMap.get(date) || { codechefCount: 0, codeforcesCount: 0,leetcodeCount:0};
    heatMapMap.set(date, {
      ...existingData,
      codeforcesCount: existingData.codeforcesCount + 1, // Increment Codeforces count
    });
  });

  //leetcode data
  Object.entries(leetcodeHeatMapData).forEach(([timestamp,submissions])=>{
    
    const date=new Date(timestamp*1000).toISOString().split("T")[0];
    const existingData=heatMapMap.get(date)|| {codechefCount: 0, codeforcesCount: 0,leetcodeCount:0}
    heatMapMap.set(date,{
      ...existingData,
      leetcodeCount:existingData.leetcodeCount +submissions,
      
    })
    
    
  })

 

  // Iterate through each day in the range
  while (start <= end) {
    const dateString = start.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const data = heatMapMap.get(dateString) || { codechefCount: 0, codeforcesCount: 0,leetcodeCount:0 }; // Default to 0 for both platforms

    values.push({
      date: dateString,
      codechefCount: data.codechefCount,
      codeforcesCount: data.codeforcesCount,
      leetcodeCount:data.leetcodeCount,
      count: data.codechefCount + data.codeforcesCount +data.leetcodeCount, // Total count for heatmap coloring
      
    });
    
    
    

    start.setDate(start.getDate() + 1); // Move to the next day
  }

  return values;
};

export default Heatmap;