import React from "react";

// Year Axis component
export const YearAxis = ({ timeScale, width, height }) => {
  // Get the time domain for years to display
  const [minDate, maxDate] = timeScale.domain();
  const years = [];
  
  // Generate array of years to display
  const startYear = minDate.getFullYear();
  const endYear = maxDate.getFullYear();
  
  for (let year = startYear; year <= endYear; year++) {
    // Only add year if it's divisible by 2 (to avoid crowding)
    if (year % 1 === 0) {
      years.push(year);
    }
  }
  
  return (
    <g className="year-axis">    
      {/* Year labels */}
      {years.map(year => {
        const xPos = timeScale(new Date(year, 0, 1));
        return (
          <g key={year}>
            <line 
              x1={xPos} 
              y1={710} 
              x2={xPos} 
              y2={720} 
              stroke="#fff" 
              strokeWidth=".6"
            />
            <text 
              x={xPos} 
              y={740} 
              fontSize="12"
              textAnchor="middle" 
              fill="white"
            >
              {year}
            </text>
          </g>
        );
      })}
    </g>
  );
};

