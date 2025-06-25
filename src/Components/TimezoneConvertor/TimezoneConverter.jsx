import React, { useState } from 'react';
import { DateTime } from 'luxon';
import timezones from './timezones.json'; // A list of IANA timezones
import '../../App.css';

function TimezoneConverter() {
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('Asia/Kolkata');
  const [inputTime, setInputTime] = useState(null);
  const [convertedTime, setConvertedTime] = useState('');

  const handleConvert = () => {
    if (!inputTime) return;

    const dt = DateTime.fromISO(inputTime, { zone: sourceZone });
    const converted = dt.setZone(targetZone).toFormat('yyyy-LL-dd HH:mm:ss ZZZZ');
    setConvertedTime(converted);
  };
  
  return (
      <div className='app-container' style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px' }}>
        <h3>Timezone Convertor</h3>
        <input
          type="datetime-local"
          value={inputTime || new Date().toUTCString()}
          onChange={(e) => setInputTime(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <select value={sourceZone} onChange={(e) => setSourceZone(e.target.value)}>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>

          <span>→</span>

          <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)}>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>

        {convertedTime && (
          <div>
            <strong>Converted Time:</strong> {convertedTime}
          </div>
        )}
      </div>
  );
}

export default TimezoneConverter;
