import React, { useMemo } from "react";
import { createRadiusScale, createWordLogScale } from "../utils/data-scales";

/**
 * Component to display a legend for circle sizes in the visualization
 * with fixed absolute positioning
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - The same data array used in the main chart
 */
export default function CircleLegend({ data }) {
  // Use the same scales as the main chart
  const scales = useMemo(() => {
    if (!data || data.length === 0) return null;
    return {
      radius: createRadiusScale(data),
      wordLog: createWordLogScale(data)
    };
  }, [data]);
  
  if (!scales) return null;
  
  // Constants for word counts to display
  const smallWordCount = 100;
  const largeWordCount = 1000;
  
  // Calculate the radii for the legend circles
  const smallRadius = scales.radius(smallWordCount);
  const largeRadius = scales.radius(largeWordCount);
  
  // Fixed positions for the circles
  const smallY = 210; // Small circle Y position (relative to SVG)
  const largeY = 30; // Large circle Y position (relative to SVG)
  
  // Fixed height for the SVG
  const svgHeight = 800; // Just enough to fit the elements
  
  return (
    <div className="circle-legend" style={{ 
      color: "white", 
      position: "fixed", // Use fixed position instead of absolute
      top: "500px", // Fixed 900px from top
      left: "220px", // Keep current X position
      width: "200px",
      zIndex: 1, // Lower z-index so it doesn't interfere with buttons
      pointerEvents: "none" // Ensure it doesn't block interactions
    }}>
      {/* Title position */}
      <div style={{ 
        position: "absolute", 
        top: smallY - 5 , 
        left: "-120px"
      }}>
        <p style={{ 
          fontSize: "12px", 
          //margin: 0,
          fontWeight: "normal",
          //marginBottom: "5px"
        }}>
          Article Length [words]
        </p>
      </div>
      
      <svg 
        width="200" 
        height={svgHeight} 
        style={{ pointerEvents: "none" }} // This makes the SVG not capture mouse events
      >
        {/* Line connecting circles */}
        <line 
          x1="30" 
          y1={smallY - 10} 
          x2="30" 
          y2={largeY + 10} 
          stroke="white" 
          strokeWidth="0.4" 
          strokeDasharray="1,3" 
        />
        
        {/* Small circle - 100 words */}
        <g transform={`translate(30, ${smallY})`}>
          <circle 
            cx="0" 
            cy="0" 
            r={smallRadius} 
            fill="#66BB6A" 
            opacity="1" 
          />
          <text 
            x="15" 
            y="5" 
            fill="white" 
            fontSize="12px" 
            textAnchor="start"
          >
            100
          </text>
        </g>
        
        {/* Large circle - 1000 words */}
        <g transform={`translate(30, ${largeY})`}>
          <circle 
            cx="0" 
            cy="0" 
            r={largeRadius} 
            fill="#66BB6A" 
            opacity="1" 
          />
          <text 
            x="15" 
            y="5" 
            fill="white" 
            fontSize="12px" 
            textAnchor="start"
          >
            1000
          </text>
        </g>
      </svg>
    </div>
  );
}
