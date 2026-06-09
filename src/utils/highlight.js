import React from 'react';

/**
 * Splits text by keyword and wraps each match in <mark>.
 * Uses a non-global regex for the test to avoid stateful lastIndex issues,
 * and a separate global regex only for the split.
 */
function highlightText(text, keyword) {
  if (!keyword || keyword.trim() === '') return text;

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const splitRegex = new RegExp(`(${escaped})`, 'gi');

  return text.split(splitRegex).map((part, index) => {
    // Use a fresh non-global regex for each test — no lastIndex drift
    const matchRegex = new RegExp(`^${escaped}$`, 'i');
    return matchRegex.test(part)
      ? React.createElement('mark', { key: index }, part)
      : part;
  });
}

export { highlightText };
