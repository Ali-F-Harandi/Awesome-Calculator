
import React, { useRef, useState, useEffect } from 'react';
import { ITranslations, DesignStyle } from '../types';
import { motion } from 'framer-motion';

interface CameraMathProps {
  t: ITranslations;
  designStyle: DesignStyle;
  isRTL: boolean;
}

const CameraMath: React.FC<CameraMathProps> = ({ t, designStyle, isRTL }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    setError(null);
    setImage(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Prefer rear camera
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error(err);
      setError(t.camera.permissionDenied);
    }
  };

  const stopCamera = () => {
      if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
      }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImage(dataUrl);
        stopCamera(); // Freeze/Stop stream after capture
      }
    }
  };

  const retake = () => {
      setImage(null);
      startCamera();
  };

  const processImage = () => {
      setIsProcessing(true);
      // Phase 14 Part 2: Connect to AI Service here.
      setTimeout(() => {
          setIsProcessing(false);
          alert(t.camera.process); // Placeholder
      }, 1000);
  };

  // UI Styles
  const containerClass = designStyle === 'retro'
    ? 'bg-[#d4d4d2] border-4 border-black p-4 flex flex-col h-full font-mono'
    : designStyle === 'cyberpunk'
    ? 'bg-black border border-primary p-4 flex flex-col h-full'
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col h-full overflow-hidden';

  const btnClass = "px-6 py-3 rounded-xl font-bold transition shadow-md active:scale-95 flex items-center justify-center gap-2";
  const primaryBtn = designStyle === 'retro' 
      ? 'bg-black text-white border-2 border-transparent' 
      : 'bg-primary text-white hover:bg-primary/90';
  
  const secondaryBtn = designStyle === 'retro'
      ? 'bg-white text-black border-2 border-black'
      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600';

  return (
    <div className="h-full p-2">
        <div className={containerClass}>
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4 shrink-0">
                <h3 className="font-bold text-gray-800 dark:text-white text-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t.camera.title}
                </h3>
            </div>

            {/* Viewport */}
            <div className="flex-1 bg-black rounded-2xl overflow-hidden relative border border-gray-800 mb-4 flex items-center justify-center">
                
                {/* Error State */}
                {error && (
                    <div className="text-center p-4">
                        <p className="text-red-500 font-bold mb-4">{error}</p>
                        <button onClick={startCamera} className={`${btnClass} ${primaryBtn}`}>
                            {t.camera.retake}
                        </button>
                    </div>
                )}

                {/* Idle State */}
                {!stream && !image && !error && (
                    <div className="text-center p-4">
                        <p className="text-gray-400 mb-4">{t.camera.instruction}</p>
                        <button onClick={startCamera} className={`${btnClass} ${primaryBtn}`}>
                            {t.camera.start}
                        </button>
                    </div>
                )}

                {/* Video Stream */}
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`w-full h-full object-cover ${image ? 'hidden' : 'block'}`}
                />

                {/* Captured Image Preview */}
                {image && (
                    <img src={image} alt="Captured" className="w-full h-full object-contain" />
                )}

                {/* Processing Overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <span className="text-white font-bold animate-pulse">{t.ai.thinking}</span>
                    </div>
                )}

                <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Controls */}
            <div className="flex gap-4 justify-center shrink-0 h-16">
                {stream && !image && (
                    <button onClick={captureImage} className={`${btnClass} ${primaryBtn} w-full`}>
                        <div className="w-4 h-4 rounded-full bg-white animate-pulse"></div>
                        {t.camera.capture}
                    </button>
                )}

                {image && !isProcessing && (
                    <>
                        <button onClick={retake} className={`${btnClass} ${secondaryBtn} flex-1`}>
                            {t.camera.retake}
                        </button>
                        <button onClick={processImage} className={`${btnClass} ${primaryBtn} flex-1`}>
                            {t.camera.process}
                        </button>
                    </>
                )}
            </div>

        </div>
    </div>
  );
};

export default CameraMath;
