
import React, { useState, useEffect, useRef } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MathGameProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
}

const MathGame: React.FC<MathGameProps> = ({ t, designStyle, isRTL }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [question, setQuestion] = useState({ text: '', answer: 0 });
  const [input, setInput] = useState('');
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('math_game_highscore') || '0'));
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      let timer: any;
      if (isPlaying && timeLeft > 0) {
          timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      } else if (timeLeft === 0) {
          endGame();
      }
      return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const generateQuestion = () => {
      const ops = ['+', '-', '*'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      let a = Math.floor(Math.random() * 20) + 1;
      let b = Math.floor(Math.random() * 20) + 1;
      
      // Simple logic to keep numbers manageable
      if (op === '*') {
          a = Math.floor(Math.random() * 12) + 1;
          b = Math.floor(Math.random() * 10) + 1;
      }

      let ans = 0;
      if (op === '+') ans = a + b;
      if (op === '-') ans = a - b;
      if (op === '*') ans = a * b;

      setQuestion({ text: `${a} ${op} ${b} = ?`, answer: ans });
      setInput('');
  };

  const startGame = () => {
      setIsPlaying(true);
      setScore(0);
      setTimeLeft(60);
      generateQuestion();
      setTimeout(() => inputRef.current?.focus(), 100);
  };

  const endGame = () => {
      setIsPlaying(false);
      if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('math_game_highscore', score.toString());
      }
  };

  const checkAnswer = (e: React.FormEvent) => {
      e.preventDefault();
      const val = parseInt(input);
      if (isNaN(val)) return;

      if (val === question.answer) {
          setScore(s => s + 10);
          setFeedback('correct');
      } else {
          setScore(s => Math.max(0, s - 5));
          setFeedback('wrong');
          // Shake effect trigger
      }
      
      setTimeout(() => setFeedback(null), 500);
      generateQuestion();
  };

  // Styles
  const containerClass = designStyle === 'retro'
    ? 'bg-[#d4d4d2] border-4 border-black p-4 flex flex-col h-full justify-center items-center'
    : designStyle === 'cyberpunk'
    ? 'bg-black border border-primary p-4 flex flex-col h-full justify-center items-center'
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col h-full justify-center items-center relative overflow-hidden';

  const btnClass = "bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg hover:scale-105 transition active:scale-95";

  return (
    <div className="h-full p-2">
        <div className={containerClass}>
            {!isPlaying ? (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="text-center space-y-6"
                >
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-wider">{t.game.title}</h2>
                    <div className="text-sm font-bold text-gray-500">{t.game.highScore}: {highScore}</div>
                    
                    {timeLeft === 0 && (
                        <div className="p-4 bg-red-100 text-red-600 rounded-xl font-bold mb-4">
                            {t.game.gameOver}! {t.game.score}: {score}
                        </div>
                    )}

                    <button onClick={startGame} className={btnClass}>
                        {timeLeft === 0 ? t.game.playAgain : t.game.start}
                    </button>
                </motion.div>
            ) : (
                <div className="w-full max-w-sm flex flex-col items-center gap-6">
                    {/* Header */}
                    <div className="flex justify-between w-full font-bold text-lg text-gray-600 dark:text-gray-300">
                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase">{t.game.time}</span>
                            <span className={`text-2xl ${timeLeft < 10 ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase">{t.game.score}</span>
                            <span className="text-2xl text-primary">{score}</span>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div className="relative w-full">
                        <motion.div 
                            key={question.text}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`
                                py-10 rounded-2xl text-center w-full shadow-lg border-2
                                ${feedback === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 
                                  feedback === 'wrong' ? 'border-red-500 bg-red-50 dark:bg-red-900/30' : 
                                  'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'}
                            `}
                        >
                            <span className="text-4xl font-mono font-bold text-gray-800 dark:text-white">{question.text}</span>
                        </motion.div>
                        
                        {/* Feedback Overlay */}
                        <AnimatePresence>
                            {feedback && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    className={`absolute inset-0 flex items-center justify-center font-black text-2xl uppercase tracking-widest ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}
                                >
                                    {feedback === 'correct' ? t.game.correct : t.game.wrong}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Input */}
                    <form onSubmit={checkAnswer} className="w-full">
                        <input 
                            ref={inputRef}
                            type="number" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`w-full p-4 text-center text-2xl font-bold outline-none rounded-xl border-2 transition-all 
                                ${designStyle === 'retro' ? 'border-black font-mono' : 'border-gray-300 dark:border-gray-600 focus:border-primary dark:bg-gray-900 dark:text-white'}
                            `}
                            placeholder="?"
                            autoFocus
                        />
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};

export default MathGame;
