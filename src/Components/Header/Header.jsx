import React, { useEffect, useState } from "react";
import "./Header.css";
import { INITIAL_TAB_STATE, MoonImage, SunImage } from "../../Utils/constants";

function generateRandomId() {
  return Date.now();
}

function Header({ tabs, setTabs, activeTabId, setActiveTabId }) {
  const [nextId, setNextId] = useState(2);

  const addTab = () => {
    const newGeneratedId = generateRandomId();
    const newTab = {
      id: newGeneratedId,
      title: `Tab ${nextId}`,
      content: null,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newGeneratedId);
    setNextId((id) => id + 1);
  };

  const closeTab = (id) => {
    setTabs((prevTabs) => {
      const updated = prevTabs.filter((tab) => tab.id !== id);
      if (id === activeTabId && updated.length > 0) {
        setActiveTabId(updated[updated.length - 1].id);
      }
      if(updated.length === 0) {
        setActiveTabId(1);
        return [INITIAL_TAB_STATE];
      }
      return updated;
    });
  };

  const TabBar = () => (
    <div className="tabs-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeTabId ? "active" : ""}`}
          onClick={() => setActiveTabId(tab.id)}
        >
          {tab.title}
          <button
            className="close-btn"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
      <button className="new-tab-button" onClick={addTab}>
        +
      </button>
    </div>
  );

  return (
    <header className="header">
      <span className="title" onClick={() => window.open('https://github.com/chouhan-abhi/Introduction', '_blank')}>DevKit</span>
      <TabBar />
      <DarkModeSwitch />
    </header>
  );
}

// --------------------- Dark Mode Switch ---------------------

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <span className="header-content" onClick={() => setDarkMode(!darkMode)}>
      <img
        className="toggle-switch"
        src={darkMode ? SunImage : MoonImage}
        alt="Toggle Theme"
      />
    </span>
  );
};

export default Header;
