import React, { useMemo } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const APPS_MAP = [
    { icon: '🧠', title: 'Diff Editor', path: '/difference-editor', appName: 'DiffEditor' },
    { icon: '✅', title: 'To-Do List', path: '/todo', appName: 'ToDo' },
    { icon: '🕐', title: 'Timezone Convertor', path: '/timezone-convertor', appName: 'TimezoneConverter' },
    { icon: '📝', title: 'SVG Editor', path: '/svg-editor', appName: 'SvgEditor' },
    { icon: 'ȶ', title: 'URL Encoder', path: '/url-encoder', appName: 'UrlEncoderDecoder' },
    { icon: '<>', title: 'JSON Viewer', path: '/json-viewer', appName: 'JsonViewer' },
];

const Tile = React.memo(({ icon, title, path, type, setSideApp, appName }) => type === 'link' ? (
    <Link to={path} className="tile" aria-label={`Navigate to ${title}`}>
        <span role="img" aria-hidden="true">{icon || '？'}</span>
        <div>{title || 'Untitled App'}</div>
    </Link>) : (
    <div className="tile" aria-label={`Navigate to ${title}`} onClick={() => setSideApp(appName)}>
        <span role="img" aria-hidden="true">{icon || '？'}</span>
        <div>{title || 'Untitled App'}</div>
    </div>
)
);

const AppContainer = React.memo(({ setSideApp, type = 'link' }) => {
    const tiles = useMemo(() => (
        APPS_MAP.map(({ icon, title, path, appName }) => (
            <Tile key={path} icon={icon} title={title} path={path} appName={appName} setSideApp={setSideApp} type={type} />
        ))
    ), []);

    return (
        <div className="main-content tile-container">
            {tiles}
        </div>
    );
});

export default AppContainer;
