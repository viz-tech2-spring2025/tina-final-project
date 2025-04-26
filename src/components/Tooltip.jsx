import React from "react";

/**
 * Enhanced Tooltip Component for ArchiveChart
 * Displays detailed information about an article on hover
 */
export default function Tooltip({ 
  interactionData, 
  onTooltipMouseEnter, 
  onTooltipMouseLeave 
}) {
  if (!interactionData) return null;
  
  const { x, y, article } = interactionData;
  
  if (!article) return null;



  // Format date
  const date = new Date(article.dateObj).toLocaleDateString();
  
  // Extract the keywords properly
  const getKeywordsForCategory = (keyword) => {
    if (!keyword || keyword === "select keyword #1" || keyword === "select keyword #2") return [];
    
    // Extract just the keyword without translation (if any)
    const cleanKeyword = keyword.includes('(') 
      ? keyword.split(' (')[0] 
      : keyword;
    
    const columnName = `${cleanKeyword}_matches`;
    
    if (article[columnName] && article[columnName] !== "No match") {
      return article[columnName].split(',').map(k => k.trim()).filter(k => k);
    }
    
    return [];
  };
  
  // Get keywords for selected filters
  const keywords1 = interactionData.keyword1 ? getKeywordsForCategory(interactionData.keyword1) : [];
  const keywords2 = interactionData.keyword2 ? getKeywordsForCategory(interactionData.keyword2) : [];

  // Body text excerpt
  const bodyExcerpt = article.bodytext_excerpt || 'No excerpt available';
  
  return (
    <div 
      style={{
        position: 'fixed',
        left: x + 15,
        top: y + 15,
        backgroundColor: 'rgba(11, 0, 40, 0.85)',
        color: 'white',
        padding: '12px',
        borderRadius: '4px',
        fontSize: '16px',
        lineHeight: '1.4',
        maxWidth: '400px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        pointerEvents: 'auto'
      }}
      onMouseEnter={onTooltipMouseEnter} 
      onMouseLeave={onTooltipMouseLeave}
    >
      {/* First line: Date */}
      <div style={{ marginBottom: '4px' }}>{date}</div>
      
      {/* Second line: Title - words (word count) */}
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        <a 
          href={`https://svalbardposten.no/${article.published_url}`}
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold' }}
        >
          {article.title}
        </a> ({article.word_count} words)
      </div>
      
      {/* Third line: Keywords 1 */}
      {keywords1.length > 0 && (
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#bdffb4' }}>#1 Keywords: </span>
          <span>{keywords1.join(', ')}</span>
        </div>
      )}
      
      {/* Fourth line: Keywords 2 */}
      {keywords2.length > 0 && (
        <div style={{ marginBottom: '4px' }}>
          <span style={{ color: '#bdffb4' }}>#2 Keywords: </span>
          <span>{keywords2.join(', ')}</span>
        </div>
      )}
      
      {/* Fifth line: Body text excerpt */}
      <div style={{ marginBottom: '4px', fontStyle: 'italic', color: '#ddd' }}>
        {bodyExcerpt}
      </div>
    </div>
  );
}
