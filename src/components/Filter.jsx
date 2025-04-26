import React from "react";

/**
 * Component to display dropdown menus for keyword selection
 */

export default function FilterControls({
  keywordOne,
  keywordTwo,
  selectedKeywordOne,
  selectedKeywordTwo,
  onKeywordOneChange,
  onKeywordTwoChange,
  onReset,
  layout = "vertical"
}) {
  // Check if keywords are selected (not default)
  const isKeywordOneSelected = selectedKeywordOne !== "select keyword #1";
  const isKeywordTwoSelected = selectedKeywordTwo !== "select keyword #2";
  
  // Common styles
  const baseSelectStyle = {
    width: "100%",
    padding: "8px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0)",
    borderRadius: "4px",
    appearance: "none",
    backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"6\"><path d=\"M0 0 L6 6 L12 0\" fill=\"%23ffffff\" /></svg>')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    cursor: "pointer",
    transition: "border-color 0.2s, background-color 0.2s, color 0.2s",
    fontSize: "16px"
  };
  
  // Label style - always white
  const labelStyle = {
    color: "white",
    marginBottom: "8px", 
    display: "block", 
    fontSize: "16px"
  };
  
  // Hover/focus CSS
  const selectHoverClass = `
    .custom-select:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }
    .custom-select:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(11, 0, 40, 0.5);
    }
    .custom-select option {
      background-color: rgb(11, 0, 40) !important;
      color: white !important;
      padding: 8px 12px !important;
      font-size: 16px !important;
      border: none !important;
    }
  `;
  
  // Render vertical layout
  if (layout === "vertical") {
    return (
      <div className="filter-controls-vertical" style={{ zIndex: 5 }}>
        <style>{selectHoverClass}</style>
        
        {/* Keyword 1 */}
        <div style={{ position: "absolute", top: "230px", left: "20px", width: "220px", zIndex: 5 }}>
          <label htmlFor="keyword-one-filter" style={labelStyle}>
            What has been said about...  ?
          </label>
          <select
            id="keyword-one-filter"
            value={selectedKeywordOne}
            onChange={(e) => onKeywordOneChange(e.target.value)}
            style={{
              ...baseSelectStyle,
              color: isKeywordOneSelected ? "rgb(77, 255, 54)" : "white",
              fontWeight: isKeywordOneSelected ? "normal" : "normal"
            }}
            className="custom-select"
          >
            {keywordOne.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
        
        {/* Keyword 2 */}
        <div style={{ position: "absolute", top: "330px", left: "20px", width: "220px", zIndex: 5 }}>
          <label htmlFor="keyword-two-filter" style={labelStyle}>
            and about...  ?
          </label>
          <select
            id="keyword-two-filter"
            value={selectedKeywordTwo}
            onChange={(e) => onKeywordTwoChange(e.target.value)}
            style={{
              ...baseSelectStyle,
              color: isKeywordTwoSelected ? "rgb(77, 255, 54)" : "white",
              fontWeight: isKeywordTwoSelected ? "normal" : "normal"      
            }}
            className="custom-select"
          >
            {keywordTwo.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
        
        {/* Reset button */}
        <div style={{ position: "absolute", top: "400px", left: "20px", width: "50px", zIndex: 10 }}>
          <button
            onClick={onReset}
            style={{
              padding: "8px 12px",
              border: "1px solid rgba(255, 255, 255, 0)",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              width: "100%"
            }}
          >
            reset
          </button>
        </div>
      </div>
    );
  }
  
  // Horizontal layout (default)
  return (
    <div className="filter-controls" style={{ margin: "15px 0", display: "flex", gap: "20px", alignItems: "left" }}>
      <style>{selectHoverClass}</style>
      
      {/* Keyword 1 */}
      <div>
        <label htmlFor="keyword-one-filter" style={{ ...labelStyle, marginRight: 5 }}>
          Choose Keyword 1:
        </label>
        <select
          id="keyword-one-filter"
          value={selectedKeywordOne}
          onChange={(e) => onKeywordOneChange(e.target.value)}
          style={{
            ...baseSelectStyle,
            color: isKeywordOneSelected ? "rgb(77, 255, 54)" : "white",
            fontWeight: isKeywordOneSelected ? "bold" : "normal"
          }}
          className="custom-select"
        >
          {keywordOne.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>
      
      {/* Keyword 2 */}
      <div>
        <label htmlFor="keyword-two-filter" style={{ ...labelStyle, marginRight: 5 }}>
          Choose Keyword 2:
        </label>
        <select
          id="keyword-two-filter"
          value={selectedKeywordTwo}
          onChange={(e) => onKeywordTwoChange(e.target.value)}
          style={{
            ...baseSelectStyle,
            color: isKeywordTwoSelected ? "rgb(77, 255, 54)" : "white",
            fontWeight: isKeywordTwoSelected ? "bold" : "normal"
          }}
          className="custom-select"
        >
          {keywordTwo.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>
      
      {/* Reset button */}
      <button
        onClick={onReset}
        style={{
          padding: "8px 12px",
          border: "1px solid rgba(255, 255, 255, 0)",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          color: "white",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        Reset
      </button>
    </div>
  );
}
