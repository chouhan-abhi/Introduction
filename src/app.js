import React, { Suspense, lazy, useState } from 'react';
import './App.css';
import AboutMe from './Components/AboutMe/AboutMe';
import { Header } from './Components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppContainer from './Components/AppContainer';

const DiffEditor = lazy(() => import('./Components/DiffEditor'));
const ToDo = lazy(() => import('./Components/ToDo'));
const TimezoneConverter = lazy(() => import('./Components/TimezoneConvertor/TimezoneConverter'));
const SvgEditor = lazy(() => import('./Components/SvgEditor'));
const UrlEncoderDecoder = lazy(() => import('./Components/UrlEncoder'));
const JsonViewer = lazy(() => import('./Components/JsonViewer'));

const APP_MAP = {
  'DiffEditor': <DiffEditor />,
  'ToDo': <ToDo />,
  'TimezoneConverter': <TimezoneConverter />,
  'SvgEditor': <SvgEditor />,
  'UrlEncoderDecoder': <UrlEncoderDecoder />,
  'JsonViewer': <JsonViewer />,
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="loading">Loading</div>}>
      <Routes>
        <Route path='/' Component={AppContainer} />
        <Route path='/difference-editor' Component={DiffEditor} />
        <Route path='/todo' Component={ToDo} />
        <Route path='/timezone-convertor' Component={TimezoneConverter} />
        <Route path='/svg-editor' Component={SvgEditor} />
        <Route path='/url-encoder' Component={UrlEncoderDecoder} />
        <Route path='/json-viewer' Component={JsonViewer} />
      </Routes>
    </Suspense >
  );
}

function App() {
  const [sideApp, setSideApp] = useState(null);
  console.log(sideApp);
  return (
    <BrowserRouter>
      <div className="app-layout">
        <div className="main-content">
          <Header setSideApp={setSideApp} />
        </div>
        <div className='playground'>
          <AppRoutes />
          {sideApp ? APP_MAP[sideApp] : null}
        </div>
      </div>
      {/* <AboutMe /> */}
    </BrowserRouter>
  );
}

export default App;
