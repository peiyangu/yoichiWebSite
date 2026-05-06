"use client";

import { useEffect, useRef } from "react";
import styles from "./FireworksCanvas.module.css";

// ─── 型定義 ────────────────────────────────────────────────
type BurstShape = "chrysanthemum" | "willow" | "ring" | "sparkle";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; color: string; radius: number;
  shape: BurstShape | "trail";
}
interface Burst { particles: Particle[]; done: boolean; }
interface Rocket {
  x: number; y: number; vy: number; vx: number;
  color: string; trail: Particle[]; done: boolean;
}
interface StarDot {
  x: number; y: number; radius: number;
  alpha: number; alphaDir: number; speed: number;
}
interface ShootingStar {
  x: number; y: number; vx: number; vy: number;
  alpha: number; length: number; done: boolean;
}

const COLORS = [
  "#F5A623", "#FFD06B", "#FF2D9E", "#FF6B2B",
  "#ffffff", "#87CEEB", "#FFD700", "#FF9F43",
  "#FF4757", "#A29BFE", "#00CEC9", "#FD79A8",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createStars(w: number, h: number): StarDot[] {
  return Array.from({ length: 160 }, () => ({
    x: rand(0, w), y: rand(0, h * 0.85),
    radius: rand(0.3, 1.6),
    alpha: rand(0.2, 0.9),
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    speed: rand(0.003, 0.012),
  }));
}

function createShootingStar(w: number, h: number): ShootingStar {
  const angle = rand(0.2, 0.5);
  const speed = rand(14, 22);
  return {
    x: rand(0, w * 0.7), y: rand(0, h * 0.4),
    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    alpha: rand(0.6, 1.0), length: rand(60, 120), done: false,
  };
}

function createBurst(x: number, y: number, color: string): Burst {
  const particles: Particle[] = [];
  const shape: BurstShape = pick(["chrysanthemum", "chrysanthemum", "willow", "ring", "sparkle"]);

  if (shape === "chrysanthemum") {
    const count = Math.floor(rand(90, 140));
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand(-0.08, 0.08);
      const speed = rand(1.8, 4.5);
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        alpha: 1, color, radius: rand(1.2, 2.8), shape });
    }
    const gc = Math.random() > 0.5 ? "#ffffff" : color;
    for (let i = 0; i < Math.floor(rand(40, 70)); i++) {
      const angle = rand(0, Math.PI * 2);
      particles.push({ x, y, vx: Math.cos(angle) * rand(2.5, 6.5), vy: Math.sin(angle) * rand(2.5, 6.5),
        alpha: 1, color: gc, radius: rand(0.4, 1.1), shape: "sparkle" });
    }
  } else if (shape === "willow") {
    const count = Math.floor(rand(70, 110));
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + rand(-0.15, 0.15);
      const speed = rand(2.0, 5.0);
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - rand(0.5, 1.5),
        alpha: 1, color, radius: rand(1.0, 2.2), shape: "willow" });
    }
  } else if (shape === "ring") {
    const count = Math.floor(rand(48, 72));
    const speed = rand(3.0, 5.0);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        alpha: 1, color, radius: rand(1.5, 3.0), shape: "ring" });
    }
    const speed2 = rand(1.5, 2.5);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      particles.push({ x, y, vx: Math.cos(angle) * speed2, vy: Math.sin(angle) * speed2,
        alpha: 1, color: "#ffffff", radius: rand(0.5, 1.2), shape: "ring" });
    }
  } else {
    for (let i = 0; i < Math.floor(rand(100, 160)); i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(1.0, 5.5);
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        alpha: 1, color: Math.random() > 0.3 ? color : "#ffffff", radius: rand(0.5, 2.0), shape: "sparkle" });
    }
  }
  return { particles, done: false };
}

function createRocket(canvasW: number, canvasH: number): Rocket {
  return {
    x: rand(canvasW * 0.08, canvasW * 0.92), y: canvasH,
    vx: rand(-0.8, 0.8), vy: -rand(10, 16),
    color: pick(COLORS), trail: [], done: false,
  };
}

export default function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const rockets: Rocket[] = [];
    const bursts: Burst[] = [];
    const shootingStars: ShootingStar[] = [];
    let stars: StarDot[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars = createStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let nextLaunchAt = 0;
    let nextInterval = rand(600, 1200);
    let nextShootAt = rand(2000, 5000);

    const tick = (time: number) => {
      if (time >= nextShootAt) {
        shootingStars.push(createShootingStar(canvas.width, canvas.height));
        nextShootAt = time + rand(3000, 8000);
      }

      if (time >= nextLaunchAt && rockets.length < 5) {
        const batch = Math.random() < 0.3 ? Math.floor(rand(2, 4)) : 1;
        for (let b = 0; b < batch && rockets.length < 5; b++) {
          rockets.push(createRocket(canvas.width, canvas.height));
        }
        nextLaunchAt = time + nextInterval;
        nextInterval = rand(600, 1400);
      }

      ctx.fillStyle = "rgba(3, 11, 24, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.alpha += s.alphaDir * s.speed;
        if (s.alpha >= 1) { s.alpha = 1; s.alphaDir = -1; }
        else if (s.alpha <= 0.05) { s.alpha = 0.05; s.alphaDir = 1; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha.toFixed(2)})`;
        ctx.fill();
      }

      for (let si = shootingStars.length - 1; si >= 0; si--) {
        const ss = shootingStars[si];
        const hyp = Math.hypot(ss.vx, ss.vy);
        const tailX = ss.x - (ss.vx / hyp) * ss.length;
        const tailY = ss.y - (ss.vy / hyp) * ss.length;
        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,220,${ss.alpha})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ss.x += ss.vx; ss.y += ss.vy;
        ss.alpha -= 0.018;
        if (ss.alpha <= 0 || ss.x > canvas.width || ss.y > canvas.height) {
          shootingStars.splice(si, 1);
        }
      }

      for (let ri = rockets.length - 1; ri >= 0; ri--) {
        const r = rockets[ri];
        r.trail.push({
          x: r.x + rand(-1.5, 1.5), y: r.y + rand(2, 8),
          vx: rand(-0.4, 0.4), vy: rand(0.3, 1.0),
          alpha: rand(0.7, 1.0), color: r.color, radius: rand(1.0, 2.5), shape: "trail",
        });
        for (let ti = r.trail.length - 1; ti >= 0; ti--) {
          const t = r.trail[ti];
          t.x += t.vx; t.y += t.vy; t.alpha -= 0.055;
          if (t.alpha <= 0) { r.trail.splice(ti, 1); continue; }
          ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          ctx.fillStyle = t.color + Math.floor(t.alpha * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }
        ctx.beginPath(); ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = r.color; ctx.fill();
        r.x += r.vx; r.y += r.vy; r.vy += 0.20;
        if (r.y <= canvas.height * 0.15 || r.vy >= 0) {
          bursts.push(createBurst(r.x, r.y, r.color));
          rockets.splice(ri, 1);
        }
      }

      for (let bi = bursts.length - 1; bi >= 0; bi--) {
        const burst = bursts[bi];
        for (const p of burst.particles) {
          p.x += p.vx; p.y += p.vy;
          switch (p.shape) {
            case "chrysanthemum":
              p.vy += 0.04; p.vx *= 0.985; p.alpha -= 0.012; break;
            case "willow":
              p.vy += 0.12; p.vx *= 0.97; p.alpha -= 0.010; break;
            case "ring":
              p.vy += 0.03; p.vx *= 0.992; p.alpha -= 0.014; break;
            case "sparkle":
              p.vy += 0.07; p.vx *= 0.965; p.alpha -= 0.020; break;
            default:
              p.alpha -= 0.04; break;
          }
          if (p.alpha <= 0) continue;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }
        burst.done = burst.particles.every((p) => p.alpha <= 0);
        if (burst.done) bursts.splice(bi, 1);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
