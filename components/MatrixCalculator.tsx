
import React, { useState } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { createMatrix, addMatrices, subtractMatrices, multiplyMatrices, determinantMatrix, inverseMatrix, transposeMatrix, Matrix } from '../services/matrixService';
import { motion } from 'framer-motion';

interface MatrixCalculatorProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
  onAddToHistory: (expression: string, result: string) => void;
}

const MatrixCalculator: React.FC<MatrixCalculatorProps> = ({ t, designStyle, isRTL, onAddToHistory }) => {
  const [rowsA, setRowsA] = useState(3);
  const [colsA, setColsA] = useState(3);
  const [rowsB, setRowsB] = useState(3);
  const [colsB, setColsB] = useState(3);
  
  const [matrixA, setMatrixA] = useState<Matrix>(createMatrix(3, 3));
  const [matrixB, setMatrixB] = useState<Matrix>(createMatrix(3, 3));
  const [resultMatrix, setResultMatrix] = useState<Matrix | null>(null);
  const [scalarResult, setScalarResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateDims = (m: 'A' | 'B', r: number, c: number) => {
      // Clamp between 1 and 5 for UI performance
      const nr = Math.max(1, Math.min(5, r));
      const nc = Math.max(1, Math.min(5, c));
      
      const newM = createMatrix(nr, nc);
      
      if (m === 'A') {
          setRowsA(nr); setColsA(nc);
          setMatrixA(newM);
      } else {
          setRowsB(nr); setColsB(nc);
          setMatrixB(newM);
      }
      setResultMatrix(null); setScalarResult(null); setError(null);
  };

  const updateCell = (m: 'A' | 'B', r: number, c: number, val: string) => {
      const num = parseFloat(val);
      if (isNaN(num) && val !== '' && val !== '-') return;
      
      const setter = m === 'A' ? setMatrixA : setMatrixB;
      const target = m === 'A' ? matrixA : matrixB;
      
      const copy = [...target.map(row => [...row])];
      copy[r][c] = val === '' || val === '-' ? 0 : num; // Store 0 but handle input logic if needed
      setter(copy);
  };

  const handleOp = (op: string) => {
      setError(null);
      setResultMatrix(null);
      setScalarResult(null);
      
      let res: Matrix | null = null;
      let scalar: number | null = null;
      let desc = "";

      if (op === 'add') {
          res = addMatrices(matrixA, matrixB);
          desc = "A + B";
      } else if (op === 'sub') {
          res = subtractMatrices(matrixA, matrixB);
          desc = "A - B";
      } else if (op === 'mul') {
          res = multiplyMatrices(matrixA, matrixB);
          desc = "A × B";
      } else if (op === 'trans') {
          res = transposeMatrix(matrixA);
          desc = "Trans(A)";
      } else if (op === 'inv') {
          res = inverseMatrix(matrixA);
          desc = "Inv(A)";
      } else if (op === 'det') {
          scalar = determinantMatrix(matrixA);
          desc = "Det(A)";
      }

      if (scalar !== null) {
          setScalarResult(scalar);
          onAddToHistory(`Matrix: ${desc}`, scalar.toString());
      } else if (res) {
          setResultMatrix(res);
          const flat = res.map(r => `[${r.join(',')}]`).join(',');
          onAddToHistory(`Matrix: ${desc}`, `[${flat}]`);
      } else {
          setError(t.matrix.error);
      }
  };

  // UI Helpers
  const inputClass = designStyle === 'retro' 
    ? 'w-full min-w-[3rem] h-9 text-center bg-white border border-black font-mono text-xs px-1'
    : 'w-full min-w-[3rem] h-9 text-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs dark:text-white px-1 shadow-sm focus:ring-1 focus:ring-primary outline-none';
  
  const renderMatrixInput = (m: 'A' | 'B', rows: number, cols: number, data: Matrix) => (
      <div className="flex flex-col gap-2 items-center w-full">
          <div className="flex gap-4 items-center text-xs font-bold text-gray-500 justify-center w-full">
              <span>{m === 'A' ? t.matrix.matrixA : t.matrix.matrixB}</span>
              <div className="flex gap-1 items-center bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <input type="number" value={rows} onChange={e=>updateDims(m, parseInt(e.target.value), cols)} className="w-8 p-0 bg-transparent text-center outline-none" />
                  <span className="text-[10px]">×</span>
                  <input type="number" value={cols} onChange={e=>updateDims(m, rows, parseInt(e.target.value))} className="w-8 p-0 bg-transparent text-center outline-none" />
              </div>
          </div>
          <div className="grid gap-1.5 p-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner w-auto max-w-full overflow-x-auto" 
               style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {data.map((row, i) => row.map((val, j) => (
                  <input 
                    key={`${i}-${j}`}
                    type="number"
                    defaultValue={val}
                    onBlur={(e) => updateCell(m, i, j, e.target.value)}
                    className={inputClass}
                  />
              )))}
          </div>
      </div>
  );

  const btnClass = "px-2 py-3 bg-primary text-white text-xs font-bold rounded-lg shadow hover:bg-primary/90 transition flex items-center justify-center active:scale-95";

  return (
    <div className={`flex flex-col h-full overflow-y-auto custom-scrollbar p-1 gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
        
        {/* Matrices Inputs - Stacked Vertically */}
        <div className="flex flex-col gap-6 items-center w-full">
            {renderMatrixInput('A', rowsA, colsA, matrixA)}
            {renderMatrixInput('B', rowsB, colsB, matrixB)}
        </div>

        {/* Operations */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
            <button onClick={() => handleOp('add')} className={btnClass}>{t.matrix.ops.add}</button>
            <button onClick={() => handleOp('sub')} className={btnClass}>{t.matrix.ops.sub}</button>
            <button onClick={() => handleOp('mul')} className={btnClass}>{t.matrix.ops.mul}</button>
            <button onClick={() => handleOp('det')} className={btnClass}>{t.matrix.ops.det}</button>
            <button onClick={() => handleOp('inv')} className={btnClass}>{t.matrix.ops.inv}</button>
            <button onClick={() => handleOp('trans')} className={btnClass}>{t.matrix.ops.trans}</button>
        </div>

        {/* Result Area */}
        <div className="min-h-[100px] flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-4 relative mt-auto shrink-0">
             {error && <span className="text-red-500 font-bold">{error}</span>}
             
             {scalarResult !== null && (
                 <motion.div initial={{scale:0}} animate={{scale:1}} className="text-2xl font-bold text-primary">
                     {parseFloat(scalarResult.toFixed(6))}
                 </motion.div>
             )}

             {resultMatrix && (
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${resultMatrix[0].length}, minmax(0, 1fr))` }}>
                     {resultMatrix.map((row, i) => row.map((val, j) => (
                         <div key={`${i}-${j}`} className={`${inputClass} flex items-center justify-center font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300`}>
                             {parseFloat(val.toFixed(4))}
                         </div>
                     )))}
                 </motion.div>
             )}
             
             {!error && !scalarResult && !resultMatrix && <span className="text-gray-400 text-sm italic">{t.matrix.result}</span>}
        </div>

    </div>
  );
};

export default MatrixCalculator;
