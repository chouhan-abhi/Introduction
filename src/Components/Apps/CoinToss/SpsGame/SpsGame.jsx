import React, { useState, useEffect } from 'react';
import '../Games.css'; // Import your common styles

const SpsGame = ({ setGame }) => {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [gameResult, setGameResult] = useState('');
    const [countdown, setCountdown] = useState(3);
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultClass, setResultClass] = useState(''); // For dynamic class based on result (win, lose, tie)

    useEffect(() => {
        if (countdown === 0 && isProcessing) {
            generateComputerChoice();
        }
    }, [countdown, isProcessing]);

    // Function to start the Stone Paper Scissors game
    const startSpsGame = (choice) => {
        setUserChoice(choice);
        setIsProcessing(true);
        setGameResult(''); // Clear previous result
        setResultClass(''); // Reset result class for visual feedback

        // Countdown before the computer choice appears
        let countdownTimer = 3;
        const countdownInterval = setInterval(() => {
            if (countdownTimer >= 0) {
                setCountdown(countdownTimer);
                countdownTimer--;
            } else {
                clearInterval(countdownInterval);
            }
        }, 1000);
    };

    // Function to generate the computer's choice and determine the result
    const generateComputerChoice = () => {
        const choices = ['Rock', 'Paper', 'Scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        setComputerChoice(computerChoice);

        // Determine the result of the game
        let result = '';
        if (userChoice === computerChoice) {
            result = 'It\'s a tie!';
            setResultClass('tie');
        } else if (
            (userChoice === 'Rock' && computerChoice === 'Scissors') ||
            (userChoice === 'Paper' && computerChoice === 'Rock') ||
            (userChoice === 'Scissors' && computerChoice === 'Paper')
        ) {
            result = 'You win!';
            setResultClass('win');
        } else {
            result = 'You lose!';
            setResultClass('lose');
        }
        setGameResult(result);
        setIsProcessing(false);
    };

    return (
        <div className="sps-container">
            <h2>Stone Paper Scissors</h2>

            <div className={`countdown ${resultClass}`}>
                <div className="selections">
                    {countdown !== 0 ? (
                        <span className="countdown-number">{countdown}</span>
                    ) : (
                        <span className="choice">{computerChoice}</span>
                    )}
                </div>
                <div className="vs">VS</div>
                <div className="selections">
                    {userChoice || 'Please select'}
                </div>
            </div>

            <div className="game-result">
                <div className="vs">{isProcessing ? 'loading' : gameResult}</div>
            </div>

            <div className="choices">
                {['Rock', 'Paper', 'Scissors'].map((choice) => (
                    <button
                        key={choice}
                        onClick={() => startSpsGame(choice)}
                        disabled={isProcessing} // Disable buttons during processing
                        className={`choice-button ${isProcessing ? 'disabled' : ''}`}
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpsGame;
