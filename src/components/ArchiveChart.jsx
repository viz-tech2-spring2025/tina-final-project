import React, { useMemo, useState } from "react";
import Circle from "./Circle";
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

// Add a Tooltip component if you're using it
const Tooltip = ({ interactionData }) => {
  if (!interactionData) return null;
  
  return (
    <div 
      style={{
        position: 'absolute',
        left: interactionData.x + 10,
        top: interactionData.y + 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        pointerEvents: 'none'
      }}
    >
      {interactionData.content}
    </div>
  );
};

export default function ArchiveChart({ 
  data, 
  width, 
  height,
  highlightKeywordOne = null,
  highlightKeywordTwo = null
}) {
  // Add state for hover information
  const [hoverInfo, setHoverInfo] = useState(null);
  
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
        return validDate && d.dateObj.getFullYear() >= 2006 && d.word_count > 20;
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
    setHoverInfo({
      x: event.clientX,
      y: event.clientY,
      content: `${article.title} (${new Date(article.dateObj).toLocaleDateString()}) - ${article.word_count} words`
    });
  };
  
  const handleMouseLeave = () => {
    setHoverInfo(null);
  };
  
  return (
    <>
      <svg width={width} height={height} className="bg-white">
        {/* Data points */}
        {processed.map(d => {
          // Check for keyword matches
          const hasKeywordOne = hasKeyword(d, highlightKeywordOne);
          const hasKeywordTwo = hasKeyword(d, highlightKeywordTwo);
          
          // Determine circle properties based on keyword matches
          let circleY = wordScale(d.word_count);
          let circleColor = defaultColorScale(d.word_count); 
          let circleOpacity = 0.6;
          
          // If highlighting is active, adjust position and appearance
          if (highlightKeywordOne || highlightKeywordTwo) {
            if (hasKeywordOne && hasKeywordTwo) {
              // Article contains both keywords - top band
              circleY = topBandScale(d.word_count);
              circleColor = topBandColorScale(d.word_count); // Use top band color scale
              circleOpacity = 0.75;
            } else if (hasKeywordOne) {
              // Article contains keyword one - middle band
              circleY = middleBandScale(d.word_count);
              circleColor = middleBandColorScale(d.word_count); // Use middle band color scale
              circleOpacity = 0.75;
            } else if (hasKeywordTwo) {
              // Article contains keyword two - bottom band
              circleY = bottomBandScale(d.word_count);
              circleColor = bottomBandColorScale(d.word_count); // Use bottom band color scale
              circleOpacity = 0.75;
            } else {
              // No keywords - dim other articles but keep original position
              circleOpacity = 0.08;
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
      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
          pointerEvents: "none",
        }}
      >
        <Tooltip interactionData={hoverInfo} />
      </div>
    </>
  );
}


