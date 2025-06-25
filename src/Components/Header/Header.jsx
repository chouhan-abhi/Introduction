import React, { useEffect, useState } from 'react';
import './Header.css';

const greetings = ['Hello', 'Hola', 'Bonjour', 'नमस्ते', 'こんにちは', 'Ciao', 'Olá'];

function Header() {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [char, setChar] = useState(0);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const current = greetings[index];
            if (char < current.length) {
                setText(current.slice(0, char + 1));
                setChar(char + 1);
            } else {
                setTimeout(() => {
                    setChar(0);
                    setIndex((index + 1) % greetings.length);
                }, 1000);
            }
        }, 150);
        return () => clearInterval(interval);
    }, [char, index]);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (<>
        <header className="header">
            <h1>{text}_</h1>
        </header>
        <>
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"/>
        </label>
        <div onClick={() => window.location.href = '/'}>Home</div>
        </>
    </>
    );
}

export default Header;
