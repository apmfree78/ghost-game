/* eslint-disable react/prop-types */
import React from 'react';

const MatchingWords = ({ matches }) => {
  return (
    <>
      <p>Matching Words (up to top 20) </p>
      <ul style={{ listStyleType: 'none' }}>
        {matches &&
          matches.map((word, index) => {
            if (index < 20) return <li key={word}>{word}</li>;
            else return null;
          })}
      </ul>
    </>
  );
};

export default MatchingWords;
