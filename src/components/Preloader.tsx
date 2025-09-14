import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react'; // Icons for mute/unmute

// --- PROPS INTERFACE ---
interface PreloaderProps {
  videoSrc: string;
  mp4Fallback: string;
  poster: string;
  criticalAssets?: string[];
  minTime?: number;
  maxWait?: number;
  onFinish: () => void;
}

// --- ANALYTICS HOOKS (placeholder) ---
const analytics = {
  track: (eventName: string, properties: object = {}) => {
    console.log(`Analytics Event: ${eventName}`, properties);
  },
};

// --- PRELOADER COMPONENT ---
const Preloader: React.FC<PreloaderProps> = ({
  videoSrc,
  mp4Fallback,
  poster,
  criticalAssets = [],
  minTime = 5000,
  maxWait = 8000,
  onFinish,
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Audio is muted by default
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // Ref for the audio element

  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Logic to start the fade-out and cleanup ---
  const startFinishingProcess = () => {
    if (isFinished) return;
    
    // Fade out audio
    if (audioRef.current) {
      const audio = audioRef.current;
      const fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume -= 0.1;
        } else {
          audio.pause();
          clearInterval(fadeOutInterval);
        }
      }, 100); // Fade over 1 second
    }

    setIsFinished(true);
  };

  const handleSkip = () => {
    analytics.track('preloader_skipped');
    startFinishingProcess();
  };
  
  // --- Audio toggle function ---
  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audioRef.current.muted = newMutedState;
    // Autoplay is only reliable after a user interaction
    if (!newMutedState && audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  // --- Main preloading effect ---
  useEffect(() => {
    analytics.track('preloader_show');

    const skipTimer = setTimeout(() => setShowSkip(true), 1500);

    const runPreloader = async () => {
      const minTimePromise = new Promise(resolve => setTimeout(resolve, minTime));
      let assetLoadPromise: Promise<any> = Promise.resolve();

      if (criticalAssets.length > 0) {
        const nonMediaAssets = criticalAssets.filter(
          asset => !/\.(webm|mp4|wav|mp3)$/.test(asset)
        );
        const assetPromises = criticalAssets.map(src =>
          fetch(src, { cache: 'force-cache' })
            .then(() => {
              if (nonMediaAssets.includes(src)) {
                setLoadingProgress(prev => prev + 100 / nonMediaAssets.length);
              }
            })
            .catch(err => console.error(`Failed to preload asset: ${src}`, err))
        );
        
        const allAssetsLoaded = Promise.allSettled(assetPromises);
        const maxWaitPromise = new Promise(resolve => setTimeout(resolve, maxWait));
        assetLoadPromise = Promise.race([allAssetsLoaded, maxWaitPromise]);
      }
      
      await Promise.all([minTimePromise, assetLoadPromise]);
      startFinishingProcess();
    };

    runPreloader();
    return () => clearTimeout(skipTimer);
  }, []);

  // --- Media playback effect ---
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video autoplay failed:", e));
    }
    // Audio will wait for user interaction to play with sound
  }, []);

  const showVideo = !isReducedMotion;
  const fadeOutDuration = isReducedMotion ? 0.3 : 1.0;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinished ? 0 : 1 }}
      transition={{ duration: fadeOutDuration, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (isFinished) {
          analytics.track('preloader_hide');
          onFinish();
        }
      }}
    >
      {/* --- Media Elements --- */}
      <audio ref={audioRef} src="/truckaudio.wav" loop muted />
      
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster={poster}
            muted // Video must be muted to autoplay reliably
            playsInline
            loop
          >
            <source src={videoSrc} type="video/webm" />
            <source src={mp4Fallback} type="video/mp4" />
          </video>
        ) : (
          <img src={poster} alt="Loading background" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 flex w-full max-w-xs flex-col items-center text-center text-white">
        <h1 className="mb-2 text-3xl font-bold" style={{ fontFamily: 'Trusted, sans-serif' }}>
          Al-Fajar Al Sadiq
        </h1>
        <p className="mb-8 text-sm text-gray-300">27+ Years of Excellence in Trading</p>

        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-[#C6A664]"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
            transition={{ duration: 0.5, ease: 'linear' }}
          />
        </div>
      </div>
      
      {/* --- Mute / Unmute Button --- */}
      <motion.button
        onClick={toggleMute}
        className="absolute bottom-8 left-8 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isMuted ? <VolumeX className="animate-pulse" /> : <Volume2 />}
      </motion.button>
      
      {/* --- Skip Button --- */}
      <motion.button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-10 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showSkip ? 1 : 0, y: showSkip ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        Skip Intro
      </motion.button>
    </motion.div>
  );
};

export default Preloader;