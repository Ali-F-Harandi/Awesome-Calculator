
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { compileExpression, evaluateRPN } from '../services/mathService';
import { motion, AnimatePresence } from 'framer-motion';

interface GraphingCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isDark: boolean;
}

type GraphType = 'cartesian' | 'polar';

interface GraphFunction {
    id: string;
    expression: string;
    color: string;
    visible: boolean;
    type: GraphType;
    error?: boolean;
}

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

const GraphingCalculator: React.FC<GraphingCalculatorProps> = ({ t, designStyle, isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [functions, setFunctions] = useState<GraphFunction[]>([
      { id: '1', expression: 'x^2', color: COLORS[0], visible: true, type: 'cartesian' }
  ]);
  const [scale, setScale] = useState(40); // Pixels per unit
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Center offset in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<GraphType>('cartesian');

  // Theme Colors
  const getThemeColors = useCallback(() => {
      if (designStyle === 'retro') return { bg: '#d4d4d2', axis: '#000', grid: '#999' };
      if (designStyle === 'cyberpunk') return { bg: '#000', axis: '#0ff', grid: '#333' };
      if (designStyle === 'minimal') return { bg: 'transparent', axis: isDark ? '#fff' : '#000', grid: isDark ? '#444' : '#ddd' };
      return { 
          bg: isDark ? '#1f2937' : '#ffffff', 
          axis: isDark ? '#e5e7eb' : '#374151', 
          grid: isDark ? '#374151' : '#e5e7eb'
      };
  }, [designStyle, isDark]);

  const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const colors = getThemeColors();
      
      const centerX = width / 2 + offset.x;
      const centerY = height / 2 + offset.y;

      // Clear
      ctx.clearRect(0, 0, width, height);
      if (designStyle === 'retro') {
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, width, height);
      }

      // Draw Grid
      ctx.beginPath();
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;

      // Vertical Grid Lines
      const startGridX = (centerX % scale);
      for (let x = startGridX; x < width; x += scale) {
          ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      // Horizontal Grid Lines
      const startGridY = (centerY % scale);
      for (let y = startGridY; y < height; y += scale) {
          ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw Axes
      ctx.beginPath();
      ctx.strokeStyle = colors.axis;
      ctx.lineWidth = 2;
      // X Axis
      ctx.moveTo(0, centerY); ctx.lineTo(width, centerY);
      // Y Axis
      ctx.moveTo(centerX, 0); ctx.lineTo(centerX, height);
      ctx.stroke();

      // Draw Functions
      functions.forEach(fn => {
          if (!fn.visible || !fn.expression) return;
          
          const rpn = compileExpression(fn.expression);
          if (!rpn) return;

          ctx.beginPath();
          ctx.strokeStyle = fn.color;
          ctx.lineWidth = 2;

          let firstPoint = true;

          if (fn.type === 'cartesian') {
              // Y = f(x)
              for (let px = 0; px < width; px+=2) { // Step 2 for speed
                  const graphX = (px - centerX) / scale;
                  try {
                      const graphY = evaluateRPN(rpn, 'RAD', { x: graphX });
                      if (!isFinite(graphY)) { firstPoint = true; continue; }
                      const py = centerY - (graphY * scale);
                      
                      // Optimization: Don't draw if WAY out of bounds
                      if (py < -height || py > height * 2) {
                           firstPoint = true; continue;
                      }

                      if (firstPoint) { ctx.moveTo(px, py); firstPoint = false; }
                      else {
                           // Asymptote check
                           // @ts-ignore
                           if (Math.abs(py - lastPy) > height / 2) { ctx.moveTo(px, py); } 
                           else { ctx.lineTo(px, py); }
                      }
                      // @ts-ignore
                      var lastPy = py;
                  } catch { firstPoint = true; }
              }
          } 
          else if (fn.type === 'polar') {
              // R = f(theta)
              const maxTheta = 12 * Math.PI; // 6 full circles
              const step = 0.05;
              
              for (let th = 0; th < maxTheta; th += step) {
                  try {
                      // Variable can be 'theta' or 'x' or 't'
                      const r = evaluateRPN(rpn, 'RAD', { theta: th, x: th, t: th });
                      if (!isFinite(r)) { firstPoint = true; continue; }
                      
                      const graphX = r * Math.cos(th);
                      const graphY = r * Math.sin(th);
                      
                      const px = centerX + (graphX * scale);
                      const py = centerY - (graphY * scale);

                      if (firstPoint) { ctx.moveTo(px, py); firstPoint = false; }
                      else { ctx.lineTo(px, py); }
                  } catch { firstPoint = true; }
              }
          }
          ctx.stroke();
      });

  }, [functions, scale, offset, getThemeColors, designStyle]);

  // Resizer
  useEffect(() => {
     const handleResize = () => {
         if (containerRef.current && canvasRef.current) {
             canvasRef.current.width = containerRef.current.clientWidth;
             canvasRef.current.height = containerRef.current.clientHeight;
             draw();
         }
     };
     window.addEventListener('resize', handleResize);
     handleResize();
     return () => window.removeEventListener('resize', handleResize);
  }, [draw]);

  useEffect(() => { draw(); }, [draw]);

  // Interaction Handlers
  const handleWheel = (e: React.WheelEvent) => {
      e.preventDefault();
      const zoomSensitivity = 0.001;
      const newScale = scale * (1 - e.deltaY * zoomSensitivity);
      setScale(Math.max(5, Math.min(500, newScale)));
  };

  const handleMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setLastPos({ x: e.clientX, y: e.clientY }); };
  const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging) {
          const dx = e.clientX - lastPos.x;
          const dy = e.clientY - lastPos.y;
          setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
          setLastPos({ x: e.clientX, y: e.clientY });
      }
  };
  const handleMouseUp = () => setIsDragging(false);

  // Function List Handlers
  const addFunction = () => {
      if (functions.length >= 5) return;
      const nextId = (functions.length + 1).toString();
      const nextColor = COLORS[functions.length % COLORS.length];
      setFunctions([...functions, { id: nextId, expression: '', color: nextColor, visible: true, type: mode }]);
  };

  const updateFunction = (id: string, val: string) => {
      setFunctions(functions.map(f => f.id === id ? { ...f, expression: val } : f));
  };

  const removeFunction = (id: string) => {
      setFunctions(functions.filter(f => f.id !== id));
  };
  
  const handleExport = () => {
      const canvas = canvasRef.current;
      if (canvas) {
          const link = document.createElement('a');
          link.download = `graph-${Date.now()}.png`;
          link.href = canvas.toDataURL();
          link.click();
      }
  };

  // UI Styles
  const containerClass = designStyle === 'retro'
    ? 'bg-[#d4d4d2] border-4 border-black p-4 h-full flex flex-col'
    : designStyle === 'cyberpunk'
    ? 'bg-black border border-primary/50 p-4 h-full flex flex-col'
    : 'bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 h-full flex flex-col';

  const inputClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-1 font-mono text-sm w-full outline-none'
    : designStyle === 'cyberpunk'
    ? 'bg-gray-900 border border-gray-700 text-primary p-1 w-full outline-none'
    : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded p-1.5 w-full outline-none dark:text-white text-sm';

  return (
    <div className={containerClass}>
       {/* Toolbar */}
       <div className="flex justify-between items-center mb-2 shrink-0">
           <div className="flex gap-1">
               <button onClick={()=>setMode('cartesian')} className={`px-2 py-1 text-[10px] rounded border ${mode==='cartesian' ? 'bg-primary text-white border-primary' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-600'}`}>
                   {t.graphing.modes.cartesian}
               </button>
               <button onClick={()=>setMode('polar')} className={`px-2 py-1 text-[10px] rounded border ${mode==='polar' ? 'bg-primary text-white border-primary' : 'bg-transparent text-gray-500 border-gray-300 dark:border-gray-600'}`}>
                   {t.graphing.modes.polar}
               </button>
           </div>
           <div className="flex gap-1">
                <button onClick={()=>{setScale(40); setOffset({x:0,y:0})}} className="p-1.5 text-gray-500 bg-gray-200 dark:bg-gray-700 rounded hover:text-black dark:hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
                <button onClick={handleExport} className="p-1.5 text-gray-500 bg-gray-200 dark:bg-gray-700 rounded hover:text-black dark:hover:text-white" title={t.graphing.export}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
           </div>
       </div>
       
       {/* Canvas */}
       <div 
         ref={containerRef}
         className="flex-1 w-full overflow-hidden rounded-lg bg-white dark:bg-gray-900/50 relative border border-gray-200 dark:border-gray-700 touch-none mb-2"
         style={{ minHeight: '200px', cursor: isDragging ? 'grabbing' : 'grab' }}
       >
           <canvas 
              ref={canvasRef}
              className="w-full h-full block"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
           />
       </div>

       {/* Functions List */}
       <div className="h-32 overflow-y-auto custom-scrollbar space-y-2 shrink-0 pr-1">
           {functions.map((fn, idx) => (
               <div key={fn.id} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: fn.color }}></div>
                   <span className="text-xs font-mono font-bold text-gray-400 w-6">
                       {fn.type === 'cartesian' ? 'y=' : 'r='}
                   </span>
                   <input 
                        value={fn.expression} 
                        onChange={(e) => updateFunction(fn.id, e.target.value)}
                        className={inputClass}
                        placeholder={fn.type === 'cartesian' ? 'x^2' : 'sin(5*theta)'}
                   />
                   {functions.length > 1 && (
                       <button onClick={() => removeFunction(fn.id)} className="text-gray-400 hover:text-red-500">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                       </button>
                   )}
               </div>
           ))}
           <button onClick={addFunction} className="w-full py-1 text-xs font-bold text-primary border border-dashed border-primary/30 rounded hover:bg-primary/5 transition">
               {t.graphing.addFunction}
           </button>
       </div>
       
       <p className="text-[10px] text-gray-400 mt-1 text-center">
           {t.graphing.help}
       </p>
    </div>
  );
};

export default GraphingCalculator;
