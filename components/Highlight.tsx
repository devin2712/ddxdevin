import React from "react";
import { normalizeString } from "../utils/stringNormalizer";

interface HighlightProps {
  text: string;
  highlight: string;
}

const Highlight = React.memo(({ text, highlight }: HighlightProps) => {
  if (!highlight) return <span>{text}</span>;

  const normalizedText = normalizeString(text).toLowerCase();
  const normalizedQuery = normalizeString(highlight).toLowerCase();

  const startIndex = normalizedText.indexOf(normalizedQuery);
  if (startIndex === -1) return <span>{text}</span>;

  const endIndex = startIndex + highlight.length;
  const beforeMatch = text.slice(0, startIndex);
  const match = text.slice(startIndex, endIndex);
  const afterMatch = text.slice(endIndex);

  return (
    <span>
      {beforeMatch}
      <mark>{match}</mark>
      {afterMatch}
    </span>
  );
});




export default Highlight;
