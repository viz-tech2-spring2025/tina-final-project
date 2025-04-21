import React from "react";

export default function FilterControls({
  keywordOne,
  keywordTwo,
  selectedKeywordOne,
  selectedKeywordTwo,
  onKeywordOneChange,
  onKeywordTwoChange,
  onReset,
}) {
  return (
    <div
      className="filter-controls"
      style={{
        margin: "15px 0",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <div>
        <label htmlFor="keyword-one-filter" style={{ marginRight: 5 }}>
          Highlight Keyword 1:
        </label>
        <select
          id="keyword-one-filter"
          value={selectedKeywordOne}
          onChange={(e) => onKeywordOneChange(e.target.value)}
        >
          {keywordOne.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="keyword-two-filter" style={{ marginRight: 5 }}>
          Highlight Keyword 2:
        </label>
        <select
          id="keyword-two-filter"
          value={selectedKeywordTwo}
          onChange={(e) => onKeywordTwoChange(e.target.value)}
        >
          {keywordTwo.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onReset}
        style={{
          padding: "4px 8px",
          border: "1px solid #ccc",
          borderRadius: 4,
          backgroundColor: "#f8f8f8",
          cursor: "pointer",
        }}
      >
        Reset Highlighting
      </button>
    </div>
  );
}