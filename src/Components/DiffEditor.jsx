import React, { useState } from 'react';
import { diffLines, diffWords } from 'diff';
import '../App.css';

function GitHubStyleDiff({ oldText, newText, mode }) {
  const diff = mode === 'words' ? diffWords(oldText, newText) : diffLines(oldText, newText);

  return (
    <pre style={{ backgroundColor: '#f6f8fa', padding: '10px', whiteSpace: 'pre-wrap' }}>
      {diff.map((part, index) => {
        let color = 'inherit';
        if (part.added) color = '#d4f8db'; // green
        else if (part.removed) color = '#fdd'; // red

        return (
          <span key={index} style={{ backgroundColor: color }}>
            {part.value}
          </span>
        );
      })}
    </pre>
  );
}

const DiffEditor = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [mode, setMode] = useState('words');

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Difference Editor</h2>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <b>Original Text</b>
          <textarea
            rows="10"
            style={{ width: '100%' }}
            placeholder="Enter original text"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <b>Modified Text</b>
          <textarea
            rows="10"
            style={{ width: '100%' }}
            placeholder="Enter modified text"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="radio"
            value="lines"
            checked={mode === 'lines'}
            onChange={() => setMode('lines')}
          />
          Line Diff
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="words"
            checked={mode === 'words'}
            onChange={() => setMode('words')}
          />
          Word Diff
        </label>
      </div>

      <h3>Diff Output:</h3>
      <GitHubStyleDiff oldText={text1} newText={text2} mode={mode} />
    </div>
  );
}

export default DiffEditor;