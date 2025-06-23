import React, { useEffect, useState } from 'react';
import './Header.css';

const greetings = ['Hello', 'Hola', 'Bonjour', 'नमस्ते', 'こんにちは', 'Ciao', 'Olá'];

function Header() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);

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

  return (
    <header className="header">
      <h1>{text}...</h1>
    </header>
  );
}

export default Header;
