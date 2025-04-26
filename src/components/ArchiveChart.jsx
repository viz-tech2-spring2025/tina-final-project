
import React, { useMemo, useState, useRef } from "react";
import Circle from "./Circle";
import { YearAxis } from "./Axes";
import Tooltip from "./Tooltip"; // Import the separate Tooltip component
import { 
  createTimeScale, 
  createWordLogScale, 
  createTopBandScale,
  createMiddleBandScale,
  createBottomBandScale,
  createRadiusScale,
  createTopBandColorScale,
  createMiddleBandColorScale,
  createBottomBandColorScale,
  createDefaultColorScale
} from "../utils/data-scales";

export default function ArchiveChart({ 
  data, 
  width, 
  height,
  highlightKeywordOne = null,
  highlightKeywordTwo = null
}) {
  // Add state for hover information
  const [hoverInfo, setHoverInfo] = useState(null);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  
  // Add a timer ref to handle the delay
  const tooltipTimeoutRef = useRef(null);
  
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  
  // Simple check for data
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  // Process the data
  const processed = useMemo(() => {
    return data
      .map(d => ({ 
        ...d, 
        dateObj: d.dateObj || new Date(d.published) 
      }))
      .filter(d => {
        const validDate = d.dateObj instanceof Date && !isNaN(d.dateObj);
        return validDate && d.dateObj.getFullYear() >= 2006 && d.word_count > 50;
      });
  }, [data]);
  
  // Exit early if no processed data
  if (processed.length === 0) {
    return <div>No valid data to display</div>;
  }
  
  // Create scales
  const timeScale = createTimeScale(processed, { marginLeft: margin.left, width });
  const wordScale = createWordLogScale(processed);
  const topBandScale = createTopBandScale(processed);
  const middleBandScale = createMiddleBandScale(processed);
  const bottomBandScale = createBottomBandScale(processed);
  const radiusScale = createRadiusScale(processed);
  
  // Create color scales
  const topBandColorScale = createTopBandColorScale(processed);
  const middleBandColorScale = createMiddleBandColorScale(processed);
  const bottomBandColorScale = createBottomBandColorScale(processed);
  const defaultColorScale = createDefaultColorScale(processed);
  
  // Check if an article contains a keyword
  const hasKeyword = (article, keyword) => {
    if (!keyword) return false;
    
    // Format: "{keyword}_matches" column should not be "No match"
    const matchColumn = `${keyword}_matches`;
    return article[matchColumn] && article[matchColumn] !== "No match";
  };
  
  // Handle mouse interactions
  const handleMouseEnter = (event, article) => {
    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
    
    // Get the mouse position relative to the viewport (not the document)
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    setHoverInfo({
      x: mouseX,
      y: mouseY,
      article,
      // Pass the keyword information for proper tooltip display
      keyword1: highlightKeywordOne,
      keyword2: highlightKeywordTwo
    });
  };
  
  const handleMouseLeave = () => {
    // Only clear hover info if the tooltip isn't being hovered
    // Adding a short delay to allow mouse to move to tooltip
    if (!isTooltipHovered) {
      tooltipTimeoutRef.current = setTimeout(() => {
        if (!isTooltipHovered) {
          setHoverInfo(null);
        }
      }, 100); // Small delay to allow mouse to move to tooltip
    }
  };
  
  const handleTooltipMouseEnter = () => {
    // Clear any pending timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
    setIsTooltipHovered(true);
  };
  
  const handleTooltipMouseLeave = () => {
    setIsTooltipHovered(false);
    // When mouse leaves tooltip, clear hover info after a short delay
    tooltipTimeoutRef.current = setTimeout(() => {
      setHoverInfo(null);
    }, 10);
  };
  
  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height} className="bg-white">
        {/* Add the axes */}
        <YearAxis timeScale={timeScale} width={width} height={height} />
      
        {/* Data points */}
        {processed.map(d => {
          // Check for keyword matches
          const hasKeywordOne = hasKeyword(d, highlightKeywordOne);
          const hasKeywordTwo = hasKeyword(d, highlightKeywordTwo);
          
          // Determine circle properties based on keyword matches
          let circleY = wordScale(d.word_count);
          let circleColor = defaultColorScale(d.word_count); 
          let circleOpacity = 0.7;
          
          // If highlighting is active, adjust position and appearance
          if (highlightKeywordOne || highlightKeywordTwo) {
            if (hasKeywordOne && hasKeywordTwo) {
              // Article contains both keywords - top band
              circleY = topBandScale(d.word_count);
              circleColor = topBandColorScale(d.word_count);
              circleOpacity = 0.8;
            } else if (hasKeywordOne) {
              // Article contains keyword one - middle band
              circleY = middleBandScale(d.word_count);
              circleColor = middleBandColorScale(d.word_count);
              circleOpacity = 0.8;
            } else if (hasKeywordTwo) {
              // Article contains keyword two - bottom band
              circleY = bottomBandScale(d.word_count);
              circleColor = bottomBandColorScale(d.word_count);
              circleOpacity = 0.8;
            } else {
              // No keywords - dim other articles but keep original position
              circleOpacity = 0.25;
            }
          }
          
          return (
            <Circle
              key={d.id}
              x={timeScale(d.dateObj)}
              y={circleY}
              r={radiusScale(d.word_count)}
              fill={circleColor}
              opacity={circleOpacity}
              onMouseEnter={(e) => handleMouseEnter(e, d)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </svg>
      
      {/* Tooltip container */}
      <Tooltip 
        interactionData={hoverInfo} 
        onTooltipMouseEnter={handleTooltipMouseEnter}
        onTooltipMouseLeave={handleTooltipMouseLeave}
      />
    </div>
  );
}
