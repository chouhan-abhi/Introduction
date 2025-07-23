import React, { useState, useEffect, useMemo, Suspense } from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { APPS, INITIAL_TAB_STATE } from "./Utils/constants";
import { getAppList } from "./Utils/utility";

const Tab = ({ activeTab, updateTab }) => {
  const AppComponent = useMemo(() => {
    if (activeTab?.appId && APPS[activeTab.appId]?.loader) {
      return React.lazy(APPS[activeTab.appId].loader);
    }
    return null;
  }, [activeTab?.appId]);

  return (
    <main className="tab-content">
      {AppComponent ? (
        <Suspense fallback={<div className="loading">Loading app...</div>}>
          <div className="app-container">
            <AppComponent />
          </div>
        </Suspense>
      ) : (
        <AppSelector onAppSelect={(appId, name, link) => updateTab(activeTab.id, { appId, title: name })} />
      )}
    </main>
  );
};

const Tile = ({ icon, name, onSelect, link }) => (
  <div className="tile" onClick={() => link ? window.open(link, '_blank') : onSelect(name)}>
    <img src={icon} alt={name} className="tile-icon" />
    <div>{name || "title"}</div>
  </div>
);

const AppSelector = ({ onAppSelect }) => {
  return (
    <div className="tile-container">
      {getAppList().map(({ id, icon, name, link }) => (
        <Tile
          key={id}
          icon={icon}
          name={name}
          link={link}
          onSelect={() => onAppSelect(id, name)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [tabs, setTabs] = useState(() => {
    const savedTabs = localStorage.getItem("tabs");
    return savedTabs ? JSON.parse(savedTabs) : [INITIAL_TAB_STATE];
  });
  const [activeTabId, setActiveTabId] = useState(() => {
    const savedActiveTabId = localStorage.getItem("activeTabId");
    return savedActiveTabId ? JSON.parse(savedActiveTabId) : 1;
  });

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
    localStorage.setItem("activeTabId", JSON.stringify(activeTabId));
  }, [tabs, activeTabId]);

  const updateTab = (id, updates) => {
    setTabs(tabs.map((tab) => (tab.id === id ? { ...tab, ...updates } : tab)));
  };

  return (
    <div>
      <Header
        tabs={tabs}
        setTabs={setTabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
      <Tab activeTab={activeTab} updateTab={updateTab} />
      <Footer activeTabTitle={activeTab?.title} />
    </div>
  );
};

export default App;
