import React, { useEffect, useState } from "react";
import "./Footer.css";
import { ICONS } from "../../Utils/constants";

const Footer = ({ activeTabTitle }) => {
  const [memoryUsage, setMemoryUsage] = useState("Calculating...");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptimeStart] = useState(Date.now());
  const [uptime, setUptime] = useState("0s");

  useEffect(() => {
    const updateStats = () => {
      // Memory
      if (performance.memory) {
        const usedMB = (
          performance.memory.usedJSHeapSize /
          1024 /
          1024
        ).toFixed(2);
        setMemoryUsage(`${usedMB} MB`);
      } else {
        setMemoryUsage("Not supported");
      }

      // Time
      setCurrentTime(new Date());

      // Uptime
      const seconds = Math.floor((Date.now() - uptimeStart) / 1000);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      setUptime(`${mins}m ${secs}s`);
    };

    updateStats();
    const interval = setInterval(updateStats, 1000);
    return () => clearInterval(interval);
  }, [uptimeStart]);

  return (
    <footer className="footer">
      <a
        href="https://github.com/chouhan-abhi"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <img src={ICONS.GITHUB} alt="git" />
        Dracket
      </a>
      <span>💾 {memoryUsage}</span>
      <span>✏️ {activeTabTitle}</span>
      <span>🕐 {currentTime.toLocaleTimeString()}</span>
      <span>⏰ {uptime}</span>
    </footer>
  );
};

export default Footer;
