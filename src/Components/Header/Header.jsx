import React, { useEffect, useState } from 'react';
import './Header.css';
import AppContainer from '../AppContainer';

const greetings = ['Hello', 'Hola', 'Bonjour', 'नमस्ते', 'こんにちは', 'Ciao', 'Olá'];

const Title = () => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        let timeout;

        const currentGreeting = greetings[index];

        if (charIndex < currentGreeting.length) {
            timeout = setTimeout(() => {
                setText(currentGreeting.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 150);
        } else {
            timeout = setTimeout(() => {
                setCharIndex(0);
                setIndex((index + 1) % greetings.length);
            }, 1000);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, index]);

    return (
        <header className="header">
            {text}_
        </header>
    );
};

const Header = ({ setSideApp }) => {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [showAppSelector, setShowAppSelector] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(prev => !prev);

    return (
        <>
            <Title />
            <label className="toggle-switch" aria-label="Toggle Dark Mode">
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleTheme}
                />
                <span className="slider" />
            </label>
            <nav className="nav-links">
                <div onClick={() => window.location.href = '/'}>Home</div>
                <div className='app-drawer' onClick={() => setShowAppSelector(prev => !prev)}>Apps {showAppSelector ? '-' : null}</div>
            </nav>
            {showAppSelector ? (<div className='app-selector'><AppContainer type="drawer" setSideApp={setSideApp} /></div>) : null}
        </>
    );
};

export { Header, Title };
