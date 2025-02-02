import React, { useEffect, useRef } from "react";
import CalHeatmap from "cal-heatmap";
import "cal-heatmap/cal-heatmap.css";

const YearHeatmap = () => {
  const heatmapContainer = useRef(null);

  useEffect(() => {
    const cal = new CalHeatmap();

    cal.paint({
      itemSelector: heatmapContainer.current, // Target the container
      domain: "year", // Set the domain to "year"
      subDomain: "day", // Set subdomains to "day"
      range: 1, // Show one year
      start: new Date(new Date().getFullYear(), 0, 1), // Start from January 1st
      cellSize: 15, // Size of each cell
      cellPadding: 5, // Spacing between cells
      cellRadius: 2, // Rounded corners for cells
      data: generateYearValues(), // Pass data
      legend: [2, 4, 6, 8, 10], // Define legend thresholds
      tooltip: true, // Enable tooltips
    });
  }, []);

  return (
    <div>
      <h2>Year Heatmap</h2>
      <div ref={heatmapContainer}></div>
    </div>
  );
};

// Helper function to generate random data for the year
const generateYearValues = () => {
  const values = {};
  const currentYear = new Date().getFullYear();
  const start = new Date(currentYear, 0, 1);
  const end = new Date(currentYear, 11, 31);

  let date = start;
  while (date <= end) {
    const timestamp = Math.floor(date.getTime() / 1000); // Convert to Unix timestamp
    values[timestamp] = Math.floor(Math.random() * 10); // Random value between 0 and 10
    date.setDate(date.getDate() + 1);
  }

  return values;
};

export default YearHeatmap;
