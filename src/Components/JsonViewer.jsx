// App.jsx
import React, { useState } from 'react';
import { JSONTree } from 'react-json-tree';

const JsonViewer = () => {
    const [input, setInput] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);

        try {
            const parsed = JSON.parse(value);
            setJsonData(parsed);
            setError('');
        } catch (err) {
            setJsonData(null);
            setError(err.message);
        }
    };

    return (
        <div className='app-container'>
            <h2>JSON Viewer</h2>
            <textarea
                rows={10}
                value={input}
                onChange={handleChange}
                style={{ width: '72vw' }}
                placeholder='Paste your JSON string here...'
            />
            {error && (
                <div style={{ color: 'red', marginTop: '1rem' }}>
                    <strong>JSON Error:</strong> {error}
                </div>
            )}
            {jsonData && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Parsed JSON Tree:</h3>
                    <div style={{ borderRadius: '8px' }}><JSONTree data={jsonData} /></div>
                </div>
            )}
        </div>
    );
};

export default JsonViewer;
