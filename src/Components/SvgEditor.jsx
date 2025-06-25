
import React, { useState, useEffect } from 'react';
import '../App.css';

const SvgEditor = () => {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [tool, setTool] = useState('rectangle'); // 'rectangle', 'circle', 'line'
  const [error, setError] = useState('');

  useEffect(() => {
    const savedShapes = localStorage.getItem('svg-shapes');
    if (savedShapes) {
      setShapes(JSON.parse(savedShapes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('svg-shapes', JSON.stringify(shapes));
  }, [shapes]);

  const handleMouseDown = (e) => {
    const svg = e.target.closest('svg');
    const rect = svg.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    if (tool === 'rectangle') {
      setCurrentShape({ type: 'rectangle', x: startX, y: startY, width: 0, height: 0 });
    } else if (tool === 'circle') {
      setCurrentShape({ type: 'circle', cx: startX, cy: startY, r: 0 });
    } else if (tool === 'line') {
      setCurrentShape({ type: 'line', x1: startX, y1: startY, x2: startX, y2: startY });
    }
  };

  const handleMouseMove = (e) => {
    if (!currentShape) return;

    const svg = e.target.closest('svg');
    const rect = svg.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    if (currentShape.type === 'rectangle') {
      setCurrentShape({
        ...currentShape,
        width: currentX - currentShape.x,
        height: currentY - currentShape.y,
      });
    } else if (currentShape.type === 'circle') {
      const dx = currentX - currentShape.cx;
      const dy = currentY - currentShape.cy;
      setCurrentShape({
        ...currentShape,
        r: Math.sqrt(dx * dx + dy * dy),
      });
    } else if (currentShape.type === 'line') {
      setCurrentShape({
        ...currentShape,
        x2: currentX,
        y2: currentY,
      });
    }
  };

  const handleMouseUp = () => {
    if (currentShape) {
      setShapes([...shapes, currentShape]);
      setCurrentShape(null);
    }
  };

  const handleShapeMouseDown = (index, e) => {
    e.stopPropagation();
    setDraggingIndex(index);
  };

  const handleShapeMouseMove = (e) => {
    if (draggingIndex === null) return;

    const svg = e.target.closest('svg');
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedShapes = shapes.map((shape, i) =>
      i === draggingIndex ? { ...shape, x, y } : shape
    );
    setShapes(updatedShapes);
  };

  const handleShapeMouseUp = () => {
    setDraggingIndex(null);
  };

  const handleExport = () => {
    const svgElement = document.getElementById('svg-canvas');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'drawing.svg';
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(event.target.result, 'image/svg+xml');
      const importedShapes = [];
      const svg = doc.querySelector('svg');
      const viewBox = svg.getAttribute('viewBox');
      const [minX, minY, width, height] = viewBox ? viewBox.split(' ').map(Number) : [0, 0, svg.clientWidth, svg.clientHeight];

      const normalize = (x, y) => ({
        x: (x - minX) * 800 / width,
        y: (y - minY) * 600 / height,
      });

      svg.querySelectorAll('rect').forEach((rect) => {
        const { x, y } = normalize(Number(rect.getAttribute('x')), Number(rect.getAttribute('y')));
        importedShapes.push({
          type: 'rectangle',
          x,
          y,
          width: Number(rect.getAttribute('width')) * 800 / width,
          height: Number(rect.getAttribute('height')) * 600 / height,
        });
      });

      svg.querySelectorAll('circle').forEach((circle) => {
        const { x: cx, y: cy } = normalize(Number(circle.getAttribute('cx')), Number(circle.getAttribute('cy')));
        importedShapes.push({
          type: 'circle',
          cx,
          cy,
          r: Number(circle.getAttribute('r')) * 800 / width,
        });
      });

      svg.querySelectorAll('line').forEach((line) => {
        const { x: x1, y: y1 } = normalize(Number(line.getAttribute('x1')), Number(line.getAttribute('y1')));
        const { x: x2, y: y2 } = normalize(Number(line.getAttribute('x2')), Number(line.getAttribute('y2')));
        importedShapes.push({
          type: 'line',
          x1,
          y1,
          x2,
          y2,
        });
      });

      setShapes(importedShapes);
      setError('');
    };

    reader.onerror = () => {
      setError('Failed to read the file. Please ensure it is a valid SVG file.');
    };

    reader.readAsText(file);
  };

  const handleUndo = () => {
    if (shapes.length > 0) {
      setShapes(shapes.slice(0, -1));
    }
  };

  const handleRedo = () => {
    // Implement redo functionality if needed
  };

  return (
    <div className='app-container'>
      <h3>SVG Editor</h3>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setTool('rectangle')}>Rectangle</button>
        <button onClick={() => setTool('circle')}>Circle</button>
        <button onClick={() => setTool('line')}>Line</button>
        <button onClick={handleExport}>Export SVG</button>
        <input type="file" accept="image/svg+xml" onChange={handleImport} />
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <svg
        id="svg-canvas"
        width="800"
        height="600"
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleShapeMouseMove(e);
        }}
        onMouseUp={() => {
          handleMouseUp();
          handleShapeMouseUp();
        }}
      >
        {shapes.map((shape, i) => {
          if (shape.type === 'rectangle') {
            return (
              <rect
                key={i}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill="rgba(0, 0, 255, 0.3)"
                stroke="blue"
                onMouseDown={(e) => handleShapeMouseDown(i, e)}
              />
            );
          } else if (shape.type === 'circle') {
            return (
              <circle
                key={i}
                cx={shape.cx}
                cy={shape.cy}
                r={shape.r}
                fill="rgba(0, 0, 255, 0.3)"
                stroke="blue"
                onMouseDown={(e) => handleShapeMouseDown(i, e)}
              />
            );
          } else if (shape.type === 'line') {
            return (
              <line
                key={i}
                x1={shape.x1}
                y1={shape.y1}
                x2={shape.x2}
                y2={shape.y2}
                stroke="blue"
                onMouseDown={(e) => handleShapeMouseDown(i, e)}
              />
            );
          }
          return null;
        })}
        {currentShape && (
          currentShape.type === 'rectangle' ? (
            <rect
              x={currentShape.x}
              y={currentShape.y}
              width={currentShape.width}
              height={currentShape.height}
              fill="rgba(0, 255, 0, 0.3)"
              stroke="green"
            />
          ) : currentShape.type === 'circle' ? (
            <circle
              cx={currentShape.cx}
              cy={currentShape.cy}
              r={currentShape.r}
              fill="rgba(0, 255, 0, 0.3)"
              stroke="green"
            />
          ) : currentShape.type === 'line' ? (
            <line
              x1={currentShape.x1}
              y1={currentShape.y1}
              x2={currentShape.x2}
              y2={currentShape.y2}
              stroke="green"
            />
          ) : null
        )}
      </svg>
    </div>
  );
};

export default SvgEditor;
