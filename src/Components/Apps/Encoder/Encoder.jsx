import React, { useState, useEffect } from 'react';
import './Encoder.css'; // Assuming styles are added here
import { ICONS } from '../../../Utils/constants';

const Encoder = () => {
    const [encodedValue, setEncodedValue] = useState('');
    const [decodedValue, setDecodedValue] = useState('');
    const [history, setHistory] = useState([]);

    // Load history from localStorage when the component mounts
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('history')) || [];
        setHistory(savedHistory); // Load history into state
    }, []);

    // Function to handle encoding input
    const handleEncodeInput = (e) => {
        const inputText = e.target.value;
        setEncodedValue(encodeURIComponent(inputText)); // URL encode the input
        setDecodedValue(decodeURIComponent(inputText)); // Update decoded value in real-time
    };

    // Function to handle decoding input
    const handleDecodeInput = (e) => {
        const inputText = e.target.value;
        setDecodedValue(decodeURIComponent(inputText)); // URL decode the input
        setEncodedValue(encodeURIComponent(inputText)); // Update encoded value in real-time
    };

    // Function to save history only when focus is lost (blur)
    const saveHistoryOnBlur = (e) => {
        const value = e.target.value;
        if (value.trim()) {
            updateHistory(value);
        }
    };

    // Function to update history list, avoiding duplicates
    const updateHistory = (value) => {
        setHistory((prevHistory) => {
            const newHistory = [value, ...prevHistory];
            const uniqueHistory = [...new Set(newHistory)]; // Remove duplicates
            localStorage.setItem('history', JSON.stringify(uniqueHistory)); // Store in localStorage
            return uniqueHistory;
        });
    };

    // Function to handle clicking on a history item
    const handleHistoryClick = (value) => {
        setDecodedValue(value);
        setEncodedValue(encodeURIComponent(value)); // Ensure encoded value is updated
    };

    // Function to delete an item from history
    const handleDeleteHistory = (itemToDelete) => {
        const updatedHistory = history.filter(item => item !== itemToDelete);
        setHistory(updatedHistory);
        localStorage.setItem('history', JSON.stringify(updatedHistory)); // Update localStorage
    };

    return (
        <div className="encoder-container">
            <div className="encoder-section">
            <h2>URL Encoder/Decoder</h2>

            <div className="input-section">
                <div className="string-length">Length: {decodedValue.length}</div>
                <textarea
                    value={decodedValue}
                    onChange={handleEncodeInput}
                    onBlur={saveHistoryOnBlur} // Save to history when focus is lost
                    placeholder="Enter text to encode"
                    rows="4"
                    cols="50"
                />
            </div>

            <div className="input-section">
                <textarea
                    value={encodedValue}
                    onChange={handleDecodeInput}
                    onBlur={saveHistoryOnBlur} // Save to history when focus is lost
                    placeholder="Encoded text"
                    rows="4"
                    cols="50"
                />
                <div className="string-length upside-down">Length: {encodedValue.length}</div>
            </div>
            </div>

            {/* History Section */}
            <div className="history-section">
                <h3>Past History</h3>
                <ul>
                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <li key={index}>
                                <span onClick={() => handleHistoryClick(item)}>{item}</span>
                                <button onClick={() => handleDeleteHistory(item)} className="delete-button">
                                    <img src={ICONS.DELETE} alt="Delete" />
                                </button>
                            </li>
                        ))
                    ) : (
                        <li>No history available</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Encoder;
