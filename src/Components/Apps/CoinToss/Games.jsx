// CoinToss.js
import React, { useState } from 'react';
import './Games.css'; // Your styles
import SpsGame from './SpsGame/SpsGame'; // Import the SpsGame component

const Games = () => {
  const [game, setGame] = useState('select'); // Track which game the user is playing
  const [result, setResult] = useState('Heads');
  const [isTossing, setIsTossing] = useState(false);

  // Function to simulate a coin toss
  const tossCoin = () => {
    setIsTossing(true);
    setTimeout(() => {
      const tossResult = Math.random() > 0.5 ? 'Heads' : 'Tails';
      setResult(tossResult);
      setIsTossing(false);
    }, 1500); // Wait for 1.5 seconds before revealing the result
  };

  const renderGameSelection = () => (
    <div className="game-selection">
      <button onClick={() => setGame('coin-toss')}>Coin Toss</button>
      <button onClick={() => setGame('sps')}>Stone Paper Scissors</button>
    </div>
  );

  const renderCoinToss = () => (
    <div className="coin-toss-container">
      <b>Coin Toss</b>
      <div onClick={tossCoin} className={`coin ${isTossing ? 'flipping' : ''}`}>
        <div className={`coin-face ${result?.toLowerCase()}`}>{result}</div>
      </div>
      <button onClick={tossCoin} className="toss-button" disabled={isTossing}>
        {isTossing ? 'Tossing...' : `It's ${result}!`}
      </button>
    </div>
  );

  return (
    <div className="game-container">
      {game === 'select' && renderGameSelection()}
      {game !== 'select' ? <button onClick={() => setGame('select')} className="back-button">Menu</button>
        : null}
      {game === 'coin-toss' && renderCoinToss()}
      {game === 'sps' && <SpsGame setGame={setGame} />}
    </div>
  );
};

export default Games;
