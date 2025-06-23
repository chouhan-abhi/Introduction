import React, { Suspense, lazy } from 'react';
import './App.css';
import AboutMe from './Components/AboutMe';
import Header from './Components/Header';

const DiffEditor = lazy(() => import('./Components/DiffEditor'));
const ToDo = lazy(() => import('./Components/ToDo'));

function App() {
  return (
    <div className="app-layout">
      <div className="main-content">
        <Header />
      </div>
      <div className="main-content">
        <div className="sections">
          <Suspense fallback={<div className="loading">Loading Diff Editor...</div>}>
            <details className="glass-section" open>
              <summary>🧠 Diff Editor</summary>
              <DiffEditor />
            </details>
          </Suspense>

          <Suspense fallback={<div className="loading">Loading To-Do List...</div>}>
            <details className="glass-section" open>
              <summary>✅ To-Do List</summary>
              <ToDo />
            </details>
          </Suspense>
        </div>

        <AboutMe />
      </div>
    </div>
  );
}

export default App;
