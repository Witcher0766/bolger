import React from 'react'


const Truncated = ({ paragraph, maxLength }) => {
    const stripTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
      };
    
      const plainText = stripTags(paragraph);
    
      if (!plainText || plainText.length <= maxLength) {
        return <>{plainText}</>;
      }
      const truncatedText = `${plainText.slice(0, maxLength)}...`;
      return <>{truncatedText}</>;
  };
  
  export default Truncated;