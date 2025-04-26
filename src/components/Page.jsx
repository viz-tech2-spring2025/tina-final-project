import React, { useMemo, useState } from "react";
import ArchiveChart from "./ArchiveChart";
import FilterControls from "./Filter";
import IntersectionText from "./IntersectionText";
import CircleLegend from "./CircleLegend";
import keywords_translation from "../utils/keywords";

/**
 * Component with three main sections a sticky left div, a sticky top div and the data viz chart
 */

export default function Page({ data, pageWidth = 3000, pageHeight = 1200 }) {
  const [selectedKeywordOne, setSelectedKeywordOne] = useState("select keyword #1");
  const [selectedKeywordTwo, setSelectedKeywordTwo] = useState("select keyword #2");

  // Build the dropdown options from available keyword columns in the data
  const availableKeywords = useMemo(() => {
    // Extract all the keyword columns from the data
    // They follow the pattern: {keyword}_matches
    if (!data || data.length === 0) return [];
    
    const sampleItem = data[0];
    const keywordColumns = Object.keys(sampleItem)
      .filter(key => key.endsWith('_matches'))
      .map(key => key.replace('_matches', ''));
    
    return keywordColumns;
  }, [data]);

  // Create the keyword lists with translations
  const keywordOne = useMemo(() => {
    const options = ["select keyword #1"];
    availableKeywords.forEach(keyword => {
      const translation = keywords_translation[keyword] || keyword;
      options.push(`${keyword} (${translation})`);
    });
    return options.sort();
  }, [availableKeywords]);

  const keywordTwo = useMemo(() => {
    const options = ["select keyword #2"];
    availableKeywords.forEach(keyword => {
      const translation = keywords_translation[keyword] || keyword;
      options.push(`${keyword} (${translation})`);
    });
    return options.sort();
  }, [availableKeywords]);

  const handleReset = () => {
    setSelectedKeywordOne("select keyword #1");
    setSelectedKeywordTwo("select keyword #2");
  };

  const handleKeywordOneChange = (keywordOption) => {
    // Extract just the keyword without translation
    const keyword = keywordOption.includes('(') 
      ? keywordOption.split(' (')[0] 
      : keywordOption;
      
    setSelectedKeywordOne(keywordOption);
    if (keyword !== "select keyword #1" && 
        selectedKeywordTwo.includes(keyword)) {
      setSelectedKeywordTwo("select keyword #2");
    }
  };

  const handleKeywordTwoChange = (keywordOption) => {
    // Extract just the keyword without translation
    const keyword = keywordOption.includes('(') 
      ? keywordOption.split(' (')[0] 
      : keywordOption;
      
    setSelectedKeywordTwo(keywordOption);
    if (keyword !== "select keyword #2" && 
        selectedKeywordOne.includes(keyword)) {
      setSelectedKeywordOne("select keyword #1");
    }
  };

  // Check if both keywords are selected
  const bothKeywordsSelected = 
    selectedKeywordOne !== "select keyword #1" && 
    selectedKeywordTwo !== "select keyword #2";

  return (
    <div style={{ display: "flex" }}>
      {/* Left sticky panel - 300px wide */}
      <div
        style={{
          width: "300px",
          height: "100vh",
          //position: "sticky",
          top: 0,
          left: 0,
          backgroundColor: "rgb(11, 0, 40)",
          color: "white",
          padding: "25px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          position: "relative" // Enable absolute positioning for legend
        }}
      >
        {/* Navigation */}
        <div class="nav-bar">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
        </div>
        <p style={{
          position: "absolute",
          top: "70px",
          left: "20px",
          color: 'rgb(77, 255, 54)',
          fontSize: "22px"
        }}>
          Svalbardposten Newspaper
        </p>
        <p style={{
          position: "absolute",
          top: "100px",
          left: "20px",
          color: 'rgb(77, 255, 54)',
          fontSize: "22px"
        }}>
          Digital Archive (2006 - 2024)
        </p>

        <FilterControls
          keywordOne={keywordOne}
          keywordTwo={keywordTwo}
          selectedKeywordOne={selectedKeywordOne}
          selectedKeywordTwo={selectedKeywordTwo}
          onKeywordOneChange={handleKeywordOneChange}
          onKeywordTwoChange={handleKeywordTwoChange}
          onReset={handleReset}
        />
        
        {/* Circle Legend positioned to align with main chart */}
        <CircleLegend data={data} />
      </div>
      
      {/* Main content area */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {/* Fixed-height container for intersection text to prevent layout shifts */}
        <div
          style={{
            position: "sticky",
            top: 70,           // Intersection text height
            zIndex: 10,
            backgroundColor: "rgb(11, 0, 40,0)",
            height: "60px", // Fixed height to prevent layout shifts
            display: "flex",
            alignItems: "left",
            justifyContent: "center"
          }}
        >
          {/* Use the IntersectionText component */}
          <IntersectionText 
            keywordOne={selectedKeywordOne}
            keywordTwo={selectedKeywordTwo}
            show={bothKeywordsSelected}
          />
        </div>
    
        {/* Chart container with hidden scrollbar */}
        <div style={{ 
          overflowX: "auto",
          marginBottom: "-20px", // Hide scrollbar, compensate with negative margin
          paddingBottom: "20px" 
        }}> 
          <ArchiveChart
            data={data}
            width={pageWidth}
            height={900}
            highlightKeywordOne={
              selectedKeywordOne !== "select keyword #1"
                ? selectedKeywordOne.split(" (")[0]
                : null
            }
            highlightKeywordTwo={
              selectedKeywordTwo !== "select keyword #2"
                ? selectedKeywordTwo.split(" (")[0]
                : null
            }
          />
        </div>
      </div>
    </div>
  );
}
