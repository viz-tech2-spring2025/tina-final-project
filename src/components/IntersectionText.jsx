import React from "react";

/**
 * Component to display text about keyword intersection with animation
 * 
 * @param {Object} props - Component props
 * @param {string} props.keywordOne - First selected keyword (with possible translation)
 * @param {string} props.keywordTwo - Second selected keyword (with possible translation)
 * @param {boolean} props.show - Whether to show the text
 * @param {string} props.animationDuration - Duration of the fade-in animation (e.g., "0.5s", "1s")
 */
export default function IntersectionText({ 
  keywordOne, 
  keywordTwo, 
  show,
  animationDuration = "2s" // Animation duration
}) {
  if (!show) return null;
  
  // Extract just the keyword names without translations
  const getKeywordName = (selection) => {
    if (selection.includes("(")) {
      return selection.split(" (")[0];
    }
    return selection;
  };
  
  const keywordOneName = getKeywordName(keywordOne);
  const keywordTwoName = getKeywordName(keywordTwo);
  
  // Animation styles
  const animationStyle = {
    color: "#ff47c5", // Pink color
    fontSize: '22px',
    animation: `fadeIn ${animationDuration} ease-in-out`,
    opacity: 1
  };
  
  // CSS animation keyframes
  const animationKeyframes = `
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(100px); }
      100% { opacity: 1; transform: translateY(0px); }
    }
  `;
  
  return (
    <>
      {/* Add keyframes style */}
      <style>{animationKeyframes}</style>
      
      {/* Animated heading */}
      <p style={animationStyle}>
        These are the articles where '{keywordOneName}' and '{keywordTwoName}' intersect...
      </p>
    </>
  );
}

