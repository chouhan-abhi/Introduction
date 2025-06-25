import React, { useState } from 'react';

const UrlEncoderDecoder = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const handleEncode = () => {
    try {
      setEncoded(encodeURIComponent(input));
    } catch (e) {
      setEncoded('Error encoding input');
    }
  };

  const handleDecode = () => {
    try {
      setDecoded(decodeURIComponent(input));
    } catch (e) {
      setDecoded('Error decoding input');
    }
  };

  return (
    <div className='app-container' style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>URL Encoder / Decoder</h2>
      <textarea
        rows="4"
        style={{ width: '100%', marginBottom: 10 }}
        placeholder="Enter text to encode or decode"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={handleEncode}>Encode</button>
        <button onClick={handleDecode}>Decode</button>
      </div>
      {encoded && (
        <div>
          <strong>Encoded:</strong>
          <pre>{encoded}</pre>
        </div>
      )}
      {decoded && (
        <div>
          <strong>Decoded:</strong>
          <pre>{decoded}</pre>
        </div>
      )}
    </div>
  );
};

export default UrlEncoderDecoder;
