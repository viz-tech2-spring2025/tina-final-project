import React, { useMemo, useState } from "react";
import ArchiveChart from "./ArchiveChart";
import FilterControls from "./Filter";
import keywords_translation from "../utils/keywords";

export default function Page({ data, pageWidth = 3000, pageHeight = 900 }) {
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

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          paddingBottom: 10,
        }}
      >
        <h1>Svalbardposten's Digital Archive</h1>
        <FilterControls
          keywordOne={keywordOne}
          keywordTwo={keywordTwo}
          selectedKeywordOne={selectedKeywordOne}
          selectedKeywordTwo={selectedKeywordTwo}
          onKeywordOneChange={handleKeywordOneChange}
          onKeywordTwoChange={handleKeywordTwoChange}
          onReset={handleReset}
        />
      </div>
  
      <div style={{ overflowX: "scroll" }}>
        <ArchiveChart
          data={data}
          width={pageWidth}
          height={700}
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
    </>
  );
}