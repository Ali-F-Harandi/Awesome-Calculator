
import React, { useState } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { LESSONS, Lesson } from '../services/learningService';
import { motion, AnimatePresence } from 'framer-motion';

interface LearningCenterProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
}

const LearningCenter: React.FC<LearningCenterProps> = ({ t, designStyle, isRTL }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const categories = ['algebra', 'geometry', 'physics'];

  const cardClass = designStyle === 'retro'
    ? 'bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer'
    : designStyle === 'cyberpunk'
    ? 'bg-black border border-primary/50 p-4 shadow-[0_0_10px_rgba(var(--color-primary),0.2)] hover:bg-gray-900 cursor-pointer text-primary'
    : 'bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer';

  return (
    <div className={`flex flex-col h-full overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
        
        <AnimatePresence mode="wait">
            {!selectedLesson ? (
                <motion.div 
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1 overflow-y-auto custom-scrollbar p-1 space-y-4"
                >
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white px-2">{t.learning.title}</h2>
                    
                    {categories.map(cat => (
                        <div key={cat} className="space-y-2">
                            <h3 className="text-sm font-bold uppercase text-gray-400 px-2 tracking-wider">
                                {/* @ts-ignore */}
                                {t.learning.topics[cat]}
                            </h3>
                            <div className="grid gap-2">
                                {LESSONS.filter(l => l.category === cat).map(lesson => (
                                    <div 
                                        key={lesson.id} 
                                        onClick={() => setSelectedLesson(lesson)}
                                        className={cardClass}
                                    >
                                        <h4 className="font-bold text-lg">{lesson.title}</h4>
                                        <p className={`text-sm ${designStyle === 'cyberpunk' ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {lesson.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            ) : (
                <motion.div 
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex-1 flex flex-col h-full"
                >
                    <button 
                        onClick={() => setSelectedLesson(null)}
                        className="mb-4 flex items-center gap-2 text-sm font-bold text-primary hover:underline self-start"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t.learning.back}
                    </button>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <h2 className="text-2xl font-black mb-1 text-gray-800 dark:text-white">{selectedLesson.title}</h2>
                        <p className="text-gray-500 mb-6">{selectedLesson.description}</p>

                        <div className="space-y-6">
                            {selectedLesson.content.map((section, idx) => (
                                <div key={idx} className={`p-4 rounded-xl ${designStyle === 'retro' ? 'border-2 border-black bg-gray-50' : 'bg-gray-100 dark:bg-gray-800/50'}`}>
                                    <div className="font-mono text-lg font-bold text-center bg-white dark:bg-black/20 p-2 rounded-lg mb-3 border border-gray-200 dark:border-gray-700">
                                        {section.formula}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm leading-relaxed">
                                        {section.text}
                                    </p>
                                    <div className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-2 rounded border-l-4 border-yellow-400">
                                        <strong>Ex:</strong> {section.example}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default LearningCenter;
