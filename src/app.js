import React, { Suspense, lazy } from 'react';
import './App.css';
import AboutMe from './Components/AboutMe/AboutMe';
import Header from './Components/Header/Header';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import UrlEncoderDecoder from './Components/UrlEncoder';

const DiffEditor = lazy(() => import('./Components/DiffEditor'));
const ToDo = lazy(() => import('./Components/ToDo'));
const TimezoneConverter = lazy(() => import('./Components/TimezoneConvertor/TimezoneConverter'));
const SvgEditor = lazy(() => import('./Components/SvgEditor'));


const Tile = ({ icon, title, path }) => (
  <Link to={path} className='tile'>
    {icon || '？'}
    <div>{title || 'title'}</div>
  </Link>
)

const APPS_MAP = [
  {
    icon: '🧠',
    title: 'Diff Editor',
    path: '/difference-editor'
  },
  {
    icon: '✅',
    title: 'To-Do List',
    path: '/todo'
  },
  {
    icon: '🕐',
    title: 'Timezone convertor',
    path: '/timezone-convertor'
  },
  {
    icon: '📝',
    title: 'SVG Editor',
    path: '/svg-editor'
  },
  {
    icon: 'ȶ',
    title: 'URL Encoder',
    path: '/url-encoder'
  },
  {
    icon: '📝',
    title: 'Dummy Tile',
    path: '/'
  },
]

const AppHome = () => (
  <div className='main-content tile-container'>
    {APPS_MAP.map(({ icon, title, path }) => <Tile icon={icon} title={title} path={path} />)}
  </div>
)

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="loading">Loading</div>}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={AppHome} />
          <Route path='/difference-editor' Component={DiffEditor} />
          <Route path='/todo' Component={ToDo} />
          <Route path='/timezone-convertor' Component={TimezoneConverter} />
          <Route path='/svg-editor' Component={SvgEditor} />
          <Route path='/url-encoder' Component={UrlEncoderDecoder} />
        </Routes>
      </BrowserRouter>
    </Suspense >
  );
}

function App() {
  return (
    <div className="app-layout">
      <div className="main-content">
        <Header />
      </div>
      <AppRoutes />
    </div>
  );
}

export default App;

// {/* <AboutMe /> */ }