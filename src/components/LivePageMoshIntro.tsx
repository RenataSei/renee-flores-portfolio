import React, { useEffect, useRef, useState, useCallback } from 'react';
import './LivePageMoshIntro.css';

interface LivePageMoshIntroProps {
  onFinish?: () => void;
  forcePlay?: boolean;
}

interface CoalesceColumn {
  x: number;
  w: number;
  originY: number; // The coordinate where the content element solidifies
  maxStretch: number; // The downward entropy stretch length
  delay: number; // Micro-stagger for organic jaggedness
  speed: number;
  isHeroZone: boolean;
  segments: {
    color: string;
    ratio: number;
  }[];
}

export const LivePageMoshIntro: React.FC<LivePageMoshIntroProps> = ({ onFinish, forcePlay = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hasPlayedSession =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('fl_livemosh_played') === 'true';

  // Check initial slow test flag from storage once
  const initialSlow =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('fl_livemosh_test') === 'slow';

  const shouldSkipInitial = !forcePlay && !initialSlow && (prefersReducedMotion || hasPlayedSession);

  const [isActive, setIsActive] = useState(!shouldSkipInitial);
  const [isSlowMode, setIsSlowMode] = useState(initialSlow);
  const [isFading, setIsFading] = useState(false);

  const handleFinish = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    const rootElem = document.querySelector('.portfolio-root');
    if (rootElem) {
      rootElem.classList.remove('is-deconstructed');
    }
    sessionStorage.setItem('fl_livemosh_played', 'true');
    sessionStorage.removeItem('fl_livemosh_test');
    setIsActive(false);
    setIsFading(false);
    if (onFinish) onFinish();
  }, [onFinish]);

  // Main animation runner
  const runAnimation = useCallback((slow: boolean) => {
    setIsActive(true);
    setIsSlowMode(slow);
    setIsFading(false);

    const rootElem = document.querySelector('.portfolio-root');
    if (rootElem) {
      rootElem.classList.add('is-deconstructed');
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Needle-thin columns: 1px wide for maximum density matching reference pixel sorting
    const colWidth = 1;
    const numCols = Math.ceil(width / colWidth);
    const columns: CoalesceColumn[] = [];

    // Calculate Hero focal coordinates for content anchoring
    const centerX = width * 0.5;
    const heroWidth = Math.min(width * 0.82, 940);
    const heroLeft = centerX - heroWidth * 0.5;
    const heroRight = centerX + heroWidth * 0.5;

    for (let i = 0; i < numCols; i++) {
      const colX = i * colWidth;
      const isHeroZone = colX >= heroLeft && colX <= heroRight;

      // Spatial Origin Y: Anchored where actual content lives
      let originY: number;
      if (isHeroZone) {
        const tier = Math.random();
        if (tier < 0.22) {
          originY = 25 + Math.random() * 55; // Navbar tier
        } else if (tier < 0.72) {
          originY = 140 + Math.random() * 190; // Hero heading & bio tier
        } else {
          originY = 350 + Math.random() * 110; // Action buttons & pill tier
        }
      } else {
        originY = 30 + Math.random() * 220;
      }

      // Maximum downward entropy stretch: creates the dense, jagged spiky stalactites
      const jaggedNoise = Math.sin(i * 0.065) * 0.45 + Math.cos(i * 0.018) * 0.55;
      const stretchVariance = 0.70 + Math.random() * 0.45 + jaggedNoise * 0.18;
      const maxStretch = Math.max(90, (height - originY) * stretchVariance);

      const delay = Math.random() * 0.14; // subtle organic stagger
      const speed = 0.85 + Math.random() * 0.42;

      // Color Segments strictly matching the main page palette:
      // Obsidian (#080b11), Slate Navy (#0e1726, #1e293b), Cyan (#00f2fe, #38bdf8), Starlight White (#ffffff)
      const segments: CoalesceColumn['segments'] = [];

      if (isHeroZone) {
        const variant = Math.random();
        if (variant < 0.48) {
          // Hero typography sorted starlight
          segments.push(
            { color: 'rgba(8, 11, 17, 0.95)', ratio: 0.12 },
            { color: 'rgba(14, 23, 42, 0.98)', ratio: 0.18 },
            { color: 'rgba(2, 132, 199, 0.98)', ratio: 0.25 },
            { color: 'rgba(56, 189, 248, 1)', ratio: 0.22 },
            { color: 'rgba(0, 242, 254, 1)', ratio: 0.15 },
            { color: 'rgba(255, 255, 255, 1)', ratio: 0.08 } // Glowing needle head
          );
        } else if (variant < 0.82) {
          // Deep cyber cyan gradient
          segments.push(
            { color: 'rgba(8, 11, 17, 0.98)', ratio: 0.18 },
            { color: 'rgba(8, 47, 73, 0.95)', ratio: 0.28 },
            { color: 'rgba(6, 182, 212, 0.98)', ratio: 0.26 },
            { color: 'rgba(56, 189, 248, 1)', ratio: 0.2 },
            { color: 'rgba(255, 255, 255, 1)', ratio: 0.08 }
          );
        } else {
          // Specular white-hot accent needle
          segments.push(
            { color: 'rgba(15, 23, 42, 0.95)', ratio: 0.15 },
            { color: 'rgba(56, 189, 248, 0.95)', ratio: 0.2 },
            { color: 'rgba(248, 250, 252, 1)', ratio: 0.52 },
            { color: 'rgba(0, 242, 254, 1)', ratio: 0.13 }
          );
        }
      } else {
        const variant = Math.random();
        if (variant < 0.55) {
          segments.push(
            { color: 'rgba(8, 11, 17, 0.98)', ratio: 0.35 },
            { color: 'rgba(15, 23, 42, 0.95)', ratio: 0.35 },
            { color: 'rgba(30, 41, 59, 0.92)', ratio: 0.2 },
            { color: 'rgba(56, 189, 248, 0.85)', ratio: 0.1 }
          );
        } else {
          // Vivid peripheral cyan streak
          segments.push(
            { color: 'rgba(8, 11, 17, 0.98)', ratio: 0.25 },
            { color: 'rgba(14, 23, 42, 0.95)', ratio: 0.3 },
            { color: 'rgba(2, 132, 199, 0.92)', ratio: 0.28 },
            { color: 'rgba(0, 242, 254, 0.95)', ratio: 0.17 }
          );
        }
      }

      columns.push({
        x: colX,
        w: 1.25, // Slight sub-pixel overlap eliminates visual gaps for ultra-dense curtain
        originY,
        maxStretch,
        delay,
        speed,
        isHeroZone,
        segments,
      });
    }

    // Durations:
    // Normal entrance: 950ms snappy
    // Slow test mode: 3500ms (3.5s) for crystal-clear slow-motion inspection!
    const DURATION = slow ? 3500 : 950;
    const COALESCE_START = DURATION * 0.65;
    const FADE_START = DURATION * 0.78;

    const startTime = performance.now();
    let triggeredUnblur = false;
    let triggeredFade = false;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const render = (now: number) => {
      const elapsed = now - startTime;
      const globalProgress = Math.min(1, elapsed / DURATION);

      // Stage 1: Trigger crisp DOM unblur at coalescence inflection point
      if (elapsed >= COALESCE_START && !triggeredUnblur) {
        triggeredUnblur = true;
        if (rootElem) {
          rootElem.classList.remove('is-deconstructed');
        }
      }

      // Stage 2: Trigger final overlay opacity fade
      if (elapsed >= FADE_START && !triggeredFade) {
        triggeredFade = true;
        setIsFading(true);
      }

      if (elapsed >= DURATION) {
        handleFinish();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render the Retracting Magnetic Coalescence
      // At t=0: strands are at 100% downward entropy stretch
      // As t -> 1: stretch collapses upward to 0 into their origin coordinates
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];

        // Column individual progression
        const colProgress = Math.min(1, Math.max(0, globalProgress - col.delay) * (1 / (1 - col.delay || 0.01)) * col.speed);

        // Magnetic Coalescence curve:
        // Starts stretched, then accelerates upward with high magnetic pull into origin
        const remainingStretchFactor = Math.pow(Math.max(0, 1 - colProgress), 2.5);
        const currentStretchHeight = col.maxStretch * remainingStretchFactor;

        if (currentStretchHeight < 1.5) continue;

        // Micro-jitter in Y: active ASDF pixel-sorting shimmer that dampens down to 0
        const jitter = Math.sin(now * 0.035 + i) * 2.5 * remainingStretchFactor;
        const startY = col.originY + jitter;

        // Draw the vertical sorted segments along this column
        let segY = startY;
        for (let s = 0; s < col.segments.length; s++) {
          const seg = col.segments[s];
          const segHeight = currentStretchHeight * seg.ratio;

          if (segHeight <= 0) continue;

          ctx.fillStyle = seg.color;
          ctx.fillRect(col.x, segY, col.w, segHeight);

          segY += segHeight;
        }

        // Razor-sharp needle head at the stalactite tip (Kim Asendorf icicle point)
        if (currentStretchHeight > 8) {
          ctx.fillStyle = col.isHeroZone ? '#ffffff' : '#38bdf8';
          ctx.fillRect(col.x, segY - 2, col.w, 3);
        }
      }

      // Magnetic Coalescence Frontier Glint
      const frontierProgress = Math.min(1, globalProgress / 0.75);
      const frontierY = height * (1 - frontierProgress * 0.65);
      const glintAlpha = (1 - frontierProgress) * 0.22;
      if (glintAlpha > 0.01) {
        const grad = ctx.createLinearGradient(0, frontierY - 8, 0, frontierY + 8);
        grad.addColorStop(0, 'rgba(0, 242, 254, 0)');
        grad.addColorStop(0.5, `rgba(0, 242, 254, ${glintAlpha.toFixed(3)})`);
        grad.addColorStop(1, 'rgba(0, 242, 254, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, frontierY - 8, width, 16);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
  }, [handleFinish]);

  // Initial load effect
  useEffect(() => {
    if (shouldSkipInitial) {
      if (onFinish) onFinish();
      return;
    }

    // Small timeout to allow canvas mount
    const timer = setTimeout(() => {
      runAnimation(initialSlow);
    }, 40);

    return () => {
      clearTimeout(timer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [shouldSkipInitial, initialSlow, runAnimation, onFinish]);

  // Global custom event listener for immediate CLI triggering without page reloads
  useEffect(() => {
    const handleTriggerEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: 'slow' | 'normal' }>;
      const isSlow = customEvent.detail?.mode === 'slow';
      setIsActive(true);
      setTimeout(() => {
        runAnimation(isSlow);
      }, 30);
    };

    window.addEventListener('fl:trigger-sort', handleTriggerEvent);
    return () => window.removeEventListener('fl:trigger-sort', handleTriggerEvent);
  }, [runAnimation]);

  if (!isActive) return null;

  return (
    <>
      {/* Authentic Pixel-Sorted Deconstructed -> Constructed Coalescence Overlay */}
      <div
        className={`pixel-rain-overlay ${isFading ? 'is-fading' : ''} ${isSlowMode ? 'is-slow-fade' : ''}`}
        onClick={handleFinish}
        title="Click to snap to crisp page immediately"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="pixel-rain-canvas" />
      </div>

      {/* Cyber Telemetry Status Badge */}
      <div
        className={`pixel-rain-badge ${isSlowMode ? 'badge-slow' : ''}`}
        onClick={handleFinish}
        title="Click anywhere to snap immediately"
      >
        <span className="pulse-point"></span>
        <span>
          {isSlowMode
            ? 'PIXEL-SORT COALESCENCE [SLOW TEST: 3.5s • CLICK TO SNAP]'
            : 'PIXEL-SORT COALESCENCE [STABILIZING • CLICK TO SNAP]'}
        </span>
      </div>
    </>
  );
};
