import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const ZONE_COLORS: Record<string, string> = {
  hero: "#a78bfa",
  work: "#fbbf24",
  services: "#06b6d4",
  about: "#e879f9",
  contact: "#fb923c",
  playtime: "#e54d2e",
  devnews: "#3b82f6",
  unihub: "#10b981",
};

const DEFAULT_COLOR = "#a78bfa";

// ═══════════════ CURSOR CONFIG ═══════════════
// Structured config — adjust to tune all cursor behavior

const CURSOR = {
  planet: {
    size: 12, // px — diameter
    followSpeed: 0.06, // seconds — quickTo duration
  },

  ring: {
    size: 36, // px — diameter
    tilt: 65, // degrees — 3D tilt (0=flat, 90=edge-on)
    borderWidth: 4, // px — visual thickness
    highlightSpeed: 0.8, // degrees/frame — rotation speed of light sweep
    perspective: 160, // px — CSS perspective depth
    destroy: {
      speed: 18, // speed threshold to shatter ring
      reformAt: 0.6, // multiplier (reform when speed < destroy * this)
    },
  },

  hover: {
    interactive: {
      // links, buttons
      ringSize: 42, // px
      planetScale: 1.3,
    },
    project: {
      // project image cards
      ringSize: 38, // px
      planetSize: 15, // px
    },
  },

  trail: {
    // Time-based buildup: trail needs sustained movement to fully appear
    buildUpTime: 30, // frames of continuous movement to reach full intensity
    fadeOutTime: 20, // frames to fade after stopping

    // Path trail: dots along cursor path that form fire + smoke
    maxPoints: 50, // max path points stored
    pointInterval: 1, // record a point every N frames (1 = every frame for continuous line)
    firePointLife: 0.35, // seconds — fire dots fade time
    smokePointLife: 1.5, // seconds — smoke lingers on path
    fireSize: { min: 7, max: 14 }, // px — big enough to overlap into solid trail
    smokeSize: { min: 8, max: 16 }, // px — smoke dot diameter

    // Speed thresholds (after time buildup is met)
    speeds: {
      spark: 1.5, // sparks appear
      fire: 3, // fire path appears
      smoke: 4, // smoke lingers on path
    },

    sparks: {
      scatter: { start: 18, grow: 22 }, // start further from planet
      drift: { start: 30, grow: 30 }, // fly further so visible past planet
      size: { min: 3, max: 4.5 }, // bigger at minimum
      count: { min: 1, max: 3 },
      life: { min: 0.6, grow: 0.5 }, // live longer — visible on slow move
      spread: { min: 2, grow: 5 },
      spawnRate: 2, // every 2 frames = more density
    },
  },

  click: {
    particles: 8,
    size: { min: 3, max: 6 }, // px
    scatter: { min: 40, range: 60 }, // px
  },

  colorTransition: {
    shrinkScale: 0.5,
    expandScale: 1.5,
    glowSize: "30px", // boxShadow spread at peak
  },
};
// ═════════════════════════════════════════════

function lighten(hex: string, amt: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.min(255, Math.round(r + (255 - r) * amt))},${Math.min(255, Math.round(g + (255 - g) * amt))},${Math.min(255, Math.round(b + (255 - b) * amt))})`;
}

function darken(hex: string, amt: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${Math.round(r * (1 - amt))},${Math.round(g * (1 - amt))},${Math.round(b * (1 - amt))})`;
}

// Create rgba string from hex + alpha (0-1)
function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Convert rgb() string to rgba
function rgbToRgba(rgb: string, alpha: number): string {
  return rgb.replace("rgb(", "rgba(").replace(")", `,${alpha})`);
}

export function CustomCursor() {
  const planetRef = useRef<HTMLDivElement>(null);
  const ringWrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const planet = planetRef.current;
    const ringWrap = ringWrapRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!planet || !ringWrap || !ring || !canvas) return;

    // Setup canvas for trail rendering
    const ctx = canvas.getContext("2d")!;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let currentColor = DEFAULT_COLOR;
    let isProjectHover = false;
    let projectTl: gsap.core.Timeline | null = null;
    let pulseTl: gsap.core.Timeline | null = null;
    let highlightAngle = 0;
    let prevX = -100;
    let prevY = -100;
    let trailFrame = 0;
    let ringDestroyed = false;
    let smoothSpeed = 0;
    let lastScrollY = window.scrollY;
    const trailPoints: {
      x: number;
      y: number;
      speed: number;
      time: number;
      halfW: number;
    }[] = [];

    const C = CURSOR; // shorthand
    const planetMoveX = gsap.quickTo(planet, "x", {
      duration: C.planet.followSpeed,
      ease: "power2.out",
    });
    const planetMoveY = gsap.quickTo(planet, "y", {
      duration: C.planet.followSpeed,
      ease: "power2.out",
    });
    const ringMoveX = gsap.quickTo(ringWrap, "x", {
      duration: C.planet.followSpeed,
      ease: "power2.out",
    });
    const ringMoveY = gsap.quickTo(ringWrap, "y", {
      duration: C.planet.followSpeed,
      ease: "power2.out",
    });
    // Trail positioned directly in RAF (no quickTo — transform is used for rotation)

    // --- Color transition with glow burst (no separate ripple element) ---
    const transitionColor = (newColor: string) => {
      if (newColor === currentColor) return;
      currentColor = newColor;
      const light = lighten(newColor, 0.5);
      const dark = darken(newColor, 0.5);

      // Planet: shrink → color swap with intense glow burst → elastic bounce back
      gsap.to(planet, {
        scale: C.colorTransition.shrinkScale,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          planet.style.background = `radial-gradient(circle at 35% 30%, ${light}, ${newColor} 55%, ${dark})`;
          planet.style.boxShadow = `0 0 ${C.colorTransition.glowSize} ${newColor}, 0 0 60px ${newColor}80, 0 0 4px ${newColor}`;
          gsap.to(planet, {
            scale: C.colorTransition.expandScale,
            duration: 0.15,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(planet, {
                scale: 1,
                duration: 0.4,
                ease: "elastic.out(1, 0.35)",
              });
              // Glow settles to normal
              gsap.to(planet, {
                boxShadow: `0 0 8px ${newColor}60, 0 0 3px ${newColor}90`,
                duration: 0.5,
                ease: "power2.out",
              });
            },
          });
        },
      });

      // Ring: quick contract + restore
      gsap.to(ringWrap, {
        scale: 0.75,
        opacity: 0.15,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(ringWrap, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
          });
        },
      });
    };

    const setColorImmediate = (color: string) => {
      currentColor = color;
      const light = lighten(color, 0.5);
      const dark = darken(color, 0.5);
      planet.style.background = `radial-gradient(circle at 35% 30%, ${light}, ${color} 55%, ${dark})`;
      planet.style.boxShadow = `0 0 8px ${color}60, 0 0 3px ${color}90`;
    };
    setColorImmediate(DEFAULT_COLOR);

    const setRingHighlight = (angle: number, color: string) => {
      const bright = lighten(color, 0.3);
      ring.style.background = `conic-gradient(from ${angle}deg, ${color}20 0%, ${bright} 15%, ${color}90 30%, ${color}30 50%, ${color}20 100%)`;
    };

    const resetProjectState = () => {
      if (!isProjectHover) return;
      isProjectHover = false;
      if (projectTl) {
        projectTl.kill();
        projectTl = null;
      }
      if (pulseTl) {
        pulseTl.kill();
        pulseTl = null;
      }
      gsap.to(ringWrap, {
        scale: 1,
        opacity: 1,
        width: C.ring.size,
        height: C.ring.size,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(planet, {
        width: C.planet.size,
        height: C.planet.size,
        marginLeft: -C.planet.size / 2,
        marginTop: -C.planet.size / 2,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(ring, {
        rotateX: C.ring.tilt,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(ringWrap, { opacity: 1, duration: 0.3 });
      ring.style.border = "none";
      ring.style.boxShadow = "none";
      ringDestroyed = false;
    };

    // --- Click: meteorite impact — particles scatter outward ---
    const handleClick = () => {
      const x = mouseX;
      const y = mouseY;
      const color = currentColor;

      // Planet impact shake
      gsap.to(planet, {
        scale: 0.4,
        duration: 0.08,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(planet, {
            scale: 1.6,
            duration: 0.12,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(planet, {
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
              });
            },
          });
        },
      });

      // Ring shockwave
      gsap.to(ringWrap, {
        scale: 1.8,
        opacity: 0.2,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(ringWrap, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        },
      });

      // Spawn particles
      for (let i = 0; i < C.click.particles; i++) {
        const particle = document.createElement("div");
        const pSize =
          C.click.size.min +
          Math.random() * (C.click.size.max - C.click.size.min);
        particle.style.cssText = `
          position: fixed; top: 0; left: 0; z-index: 10004;
          width: ${pSize}px;
          height: ${pSize}px;
          border-radius: 50%;
          background: ${lighten(color, Math.random() * 0.4)};
          box-shadow: 0 0 4px ${color}80;
          pointer-events: none;
          will-change: transform;
        `;
        document.body.appendChild(particle);

        const angle =
          (Math.PI * 2 * i) / C.click.particles + (Math.random() - 0.5) * 0.5;
        const dist =
          C.click.scatter.min + Math.random() * C.click.scatter.range;
        const tx = x + Math.cos(angle) * dist;
        const ty = y + Math.sin(angle) * dist;

        gsap.fromTo(
          particle,
          { x, y, scale: 1, opacity: 1 },
          {
            x: tx,
            y: ty,
            scale: 0,
            opacity: 0,
            duration: 0.4 + Math.random() * 0.3,
            ease: "power2.out",
            onComplete: () => particle.remove(),
          },
        );
      }
    };

    // --- Color zone detection ---
    const detectColor = (clientX: number, clientY: number): string | null => {
      const el = document.elementFromPoint(clientX, clientY);
      if (!el) return null;

      const group = el.closest(".group");
      if (group) {
        const colorEl = group.querySelector("[data-cursor-color]");
        if (colorEl) return colorEl.getAttribute("data-cursor-color");
      }

      const section = el.closest("section[id]");
      if (section?.id === "work") {
        const groupEls = section.querySelectorAll(".group");
        if (groupEls.length > 0) {
          const cursorY = clientY;
          const rects = Array.from(groupEls).map((g) => ({
            r: g.getBoundingClientRect(),
            color: g
              .querySelector("[data-cursor-color]")
              ?.getAttribute("data-cursor-color"),
          }));
          if (cursorY < rects[0].r.top) return ZONE_COLORS.work;
          if (cursorY > rects[rects.length - 1].r.bottom)
            return ZONE_COLORS.work;
          for (let i = 0; i < rects.length; i++) {
            if (cursorY <= rects[i].r.bottom)
              return rects[i].color || ZONE_COLORS.work;
            if (i < rects.length - 1 && cursorY < rects[i + 1].r.top) {
              return rects[i + 1].color || ZONE_COLORS.work;
            }
          }
          return rects[rects.length - 1].color || ZONE_COLORS.work;
        }
        return ZONE_COLORS.work;
      }

      if (section && ZONE_COLORS[section.id]) return ZONE_COLORS[section.id];
      const contentWrap = el.closest(".relative.z-10");
      if (contentWrap) return ZONE_COLORS.work;
      return null;
    };

    const SPARK_SPEED = C.trail.speeds.spark;
    const FIRE_SPEED = C.trail.speeds.fire;
    const SMOKE_SPEED = C.trail.speeds.smoke;
    const RING_DESTROY_SPEED = C.ring.destroy.speed;
    let moveTime = 0; // frames of continuous movement (for time-based buildup)

    // Ring destruction/reformation
    const destroyRing = () => {
      if (ringDestroyed || isProjectHover) return;
      ringDestroyed = true;
      gsap.to(ring, {
        opacity: 0,
        scale: 0.3,
        duration: 0.25,
        ease: "power3.in",
      });
      gsap.to(ringWrap, { opacity: 0.2, duration: 0.2 });
    };
    const reformRing = () => {
      if (!ringDestroyed || isProjectHover) return;
      ringDestroyed = false;
      gsap.to(ring, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(ringWrap, { opacity: 1, duration: 0.4 });
    };

    // No more DOM trail dots — using canvas instead

    // RAF loop
    let rafId: number;
    const updateLoop = () => {
      // Detect scroll in RAF (works with Lenis — no event listener)
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Scroll trail: shift ALL existing trail points so they "stay in document space"
      // while new points are at the cursor's viewport position → creates separation
      if (Math.abs(scrollDelta) > 1 && mouseX > 0) {
        for (const p of trailPoints) {
          p.y -= scrollDelta;
        }
        // Skip buildup — scroll trail appears immediately at full intensity
        moveTime = C.trail.buildUpTime;
        smoothSpeed = Math.max(smoothSpeed, Math.abs(scrollDelta) * 0.6);
      }

      const vx = mouseX - prevX;
      const vy = mouseY - prevY;
      // Include scroll delta in speed calculation
      const scrollSpeed = Math.abs(scrollDelta) * 0.6;
      const totalSpeed = Math.sqrt(vx * vx + vy * vy) + scrollSpeed;
      const speed = totalSpeed;

      smoothSpeed += (speed - smoothSpeed) * (speed > smoothSpeed ? 0.3 : 0.2);

      // Time-based buildup: moving continuously increases moveTime
      if (speed > 1) {
        moveTime = Math.min(moveTime + 1, C.trail.buildUpTime);
      } else {
        moveTime = Math.max(moveTime - 1, 0);
      }
      const timeFactor = moveTime / C.trail.buildUpTime;

      if (!isProjectHover) {
        const extraSpeed = speed > 1 ? Math.min(speed * 0.3, 4) : 0;
        highlightAngle =
          (highlightAngle + C.ring.highlightSpeed + extraSpeed) % 360;
        setRingHighlight(highlightAngle, currentColor);

        if (mouseX > 0) {
          const newColor = detectColor(mouseX, mouseY);
          if (newColor) transitionColor(newColor);
        }

        if (smoothSpeed > RING_DESTROY_SPEED) destroyRing();
        else if (smoothSpeed < RING_DESTROY_SPEED * C.ring.destroy.reformAt)
          reformRing();
      }

      trailFrame++;
      const effectiveSpeed = smoothSpeed * timeFactor;

      // Store positions with frozen halfW based on current trail state
      if (speed > 0.5 && mouseX > 0) {
        const scrollOffset = Math.abs(scrollDelta) > 1 ? scrollDelta * 0.15 : 0;
        // Width is planetSize/2 at full intensity, frozen at creation
        const intensity = Math.min(effectiveSpeed / 15, 1);
        const frozenHalfW = (C.planet.size / 2) * (0.3 + intensity * 0.7);
        trailPoints.push({
          x: mouseX,
          y: mouseY + scrollOffset,
          speed: effectiveSpeed,
          time: trailFrame,
          halfW: frozenHalfW,
        });
      }
      const maxAge = 35;
      while (
        trailPoints.length > 0 &&
        trailFrame - trailPoints[0].time > maxAge
      ) {
        trailPoints.shift();
      }

      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      // --- SPARKS: DOM particles that fly away (realistic meteor embers) ---
      // Low speed (1.5-3): sparks near planet, no trail yet
      // Fire speed (3+): sparks break off the TAIL END of the fire trail
      const spawnSpark = (
        x: number,
        y: number,
        dirX: number,
        dirY: number,
        intensity: number,
      ) => {
        const sp = document.createElement("div");
        const sz =
          C.trail.sparks.size.min +
          Math.random() *
            intensity *
            (C.trail.sparks.size.max - C.trail.sparks.size.min);
        sp.style.cssText = `
          position:fixed; z-index:10000; border-radius:50%;
          width:${sz}px; height:${sz}px;
          background: ${lighten(currentColor, 0.2 + Math.random() * 0.4)};
          box-shadow: 0 0 ${sz + 1}px ${lighten(currentColor, 0.3)};
          pointer-events:none;
        `;
        document.body.appendChild(sp);
        // Fly outward + backward from trail
        const flyDist =
          C.trail.sparks.drift.start + intensity * C.trail.sparks.drift.grow;
        const spread = (Math.random() - 0.5) * 2;
        gsap.fromTo(
          sp,
          {
            left: x - sz / 2,
            top: y - sz / 2,
            scale: 1,
            opacity: 0.7 + intensity * 0.2,
          },
          {
            left:
              x + dirX * flyDist * (0.3 + Math.random() * 0.7) + spread * 15,
            top: y + dirY * flyDist * (0.3 + Math.random() * 0.7) + spread * 15,
            scale: 0,
            opacity: 0,
            duration:
              C.trail.sparks.life.min +
              intensity * C.trail.sparks.life.grow +
              Math.random() * 0.1,
            ease: "power2.out",
            onComplete: () => sp.remove(),
          },
        );
      };

      // Low-speed sparks (before fire trail) — spawn at planet EDGE, not center
      if (
        effectiveSpeed > SPARK_SPEED &&
        effectiveSpeed < FIRE_SPEED + 1 &&
        trailFrame % C.trail.sparks.spawnRate === 0 &&
        mouseX > 0
      ) {
        const sparkIntensity = Math.min((effectiveSpeed - SPARK_SPEED) / 4, 1);
        const sparkFade =
          effectiveSpeed > FIRE_SPEED
            ? Math.max(0, 1 - (effectiveSpeed - FIRE_SPEED))
            : 1;
        if (sparkFade > 0.1) {
          const count =
            C.trail.sparks.count.min +
            Math.floor(
              sparkIntensity *
                (C.trail.sparks.count.max - C.trail.sparks.count.min),
            );
          const dirX = speed > 1 ? -(vx / speed) : (Math.random() - 0.5) * 2;
          const dirY = speed > 1 ? -(vy / speed) : (Math.random() - 0.5) * 2;
          const edgeOffset = C.planet.size / 2 + 6; // start well past planet edge
          for (let j = 0; j < count; j++) {
            const sparkAngle =
              Math.atan2(dirY, dirX) + (Math.random() - 0.5) * 1.5;
            const sx = mouseX + Math.cos(sparkAngle) * edgeOffset;
            const sy = mouseY + Math.sin(sparkAngle) * edgeOffset;
            spawnSpark(
              sx,
              sy,
              dirX + (Math.random() - 0.5) * 0.8,
              dirY + (Math.random() - 0.5) * 0.8,
              sparkIntensity * sparkFade,
            );
          }
        }
      }

      // --- FIRE TRAIL: single stroke + lineCap round (continuous + round ends) ---
      const firePoints = trailPoints.filter((p) => p.speed > FIRE_SPEED);

      // Anchor to planet center
      if (firePoints.length > 0) {
        const lastPt = firePoints[firePoints.length - 1];
        if ((mouseX - lastPt.x) ** 2 + (mouseY - lastPt.y) ** 2 > 1) {
          firePoints.push({
            ...lastPt,
            x: mouseX,
            y: mouseY,
            time: trailFrame,
          });
        }
      }

      if (firePoints.length >= 2) {
        const n = firePoints.length;
        const headAge = (trailFrame - firePoints[n - 1].time) / maxAge;
        const headFresh = Math.max(0, 1 - headAge);

        const darkC = darken(currentColor, 0.5);
        const lightC = lighten(currentColor, 0.3);
        const brightC = lighten(currentColor, 0.6);

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Opacity flicker: real meteor trails shimmer in brightness
        const flicker =
          0.9 +
          Math.sin(trailFrame * 0.5) * 0.06 +
          Math.sin(trailFrame * 1.3) * 0.04;
        ctx.globalAlpha = headFresh * flicker;

        // Occasional brightness flare (real meteors fragment, causing bursts)
        const isFlare = Math.random() < 0.008; // ~0.8% chance per frame
        if (isFlare) ctx.globalAlpha = Math.min(1, headFresh * 1.4);

        // Build ONE smooth path through all fire points
        const buildPath = (startIdx: number) => {
          ctx.beginPath();
          ctx.moveTo(firePoints[startIdx].x, firePoints[startIdx].y);
          for (let i = startIdx + 1; i < n - 1; i++) {
            const mx = (firePoints[i].x + firePoints[i + 1].x) / 2;
            const my = (firePoints[i].y + firePoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(firePoints[i].x, firePoints[i].y, mx, my);
          }
          ctx.lineTo(firePoints[n - 1].x, firePoints[n - 1].y);
        };

        const tail = firePoints[0];
        const head = firePoints[n - 1];
        const planetW = C.planet.size;

        // Layer 1: Outer glow — full path, widest
        buildPath(0);
        const glowGrad = ctx.createLinearGradient(
          tail.x,
          tail.y,
          head.x,
          head.y,
        );
        glowGrad.addColorStop(0, "rgba(0,0,0,0)");
        glowGrad.addColorStop(0.2, rgbToRgba(darkC, 0.15));
        glowGrad.addColorStop(0.6, rgba(currentColor, 0.3));
        glowGrad.addColorStop(1, rgbToRgba(lightC, 0.4));
        ctx.strokeStyle = glowGrad;
        ctx.lineWidth = planetW * 1.2;
        ctx.stroke();

        // Layer 1b: Middle-widening glow (real meteors are widest in center)
        // Draw only middle 30-70% of trail, wider, dimmer
        const midStart = Math.floor(n * 0.3);
        const midEnd = Math.floor(n * 0.7);
        if (midEnd - midStart >= 2) {
          ctx.beginPath();
          ctx.moveTo(firePoints[midStart].x, firePoints[midStart].y);
          for (let i = midStart + 1; i < midEnd - 1; i++) {
            const mx = (firePoints[i].x + firePoints[i + 1].x) / 2;
            const my = (firePoints[i].y + firePoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(firePoints[i].x, firePoints[i].y, mx, my);
          }
          ctx.lineTo(firePoints[midEnd - 1].x, firePoints[midEnd - 1].y);
          ctx.strokeStyle = rgba(currentColor, 0.12);
          // Flicker: slight random width variation per frame
          ctx.lineWidth = planetW * (1.5 + Math.sin(trailFrame * 0.3) * 0.2);
          ctx.stroke();
        }

        // Layer 2: Fire core — full path, planet width
        buildPath(0);
        const fireGrad = ctx.createLinearGradient(
          tail.x,
          tail.y,
          head.x,
          head.y,
        );
        fireGrad.addColorStop(0, "rgba(0,0,0,0)");
        fireGrad.addColorStop(0.15, rgbToRgba(darkC, 0.3));
        fireGrad.addColorStop(0.4, rgba(currentColor, 0.6));
        fireGrad.addColorStop(0.7, rgbToRgba(lightC, 0.8));
        fireGrad.addColorStop(0.9, rgbToRgba(brightC, 0.9));
        fireGrad.addColorStop(1, `rgba(255,255,255,0.95)`);
        ctx.strokeStyle = fireGrad;
        ctx.lineWidth = planetW * 0.7;
        ctx.stroke();

        // Layer 3: Hot center — only newest 60% of path, thin
        const centerStart = Math.floor(n * 0.4);
        if (n - centerStart >= 2) {
          buildPath(centerStart);
          const centerGrad = ctx.createLinearGradient(
            firePoints[centerStart].x,
            firePoints[centerStart].y,
            head.x,
            head.y,
          );
          centerGrad.addColorStop(0, "rgba(0,0,0,0)");
          centerGrad.addColorStop(0.4, rgbToRgba(brightC, 0.5));
          centerGrad.addColorStop(0.8, `rgba(255,255,255,0.7)`);
          centerGrad.addColorStop(1, `rgba(255,255,255,0.9)`);
          ctx.strokeStyle = centerGrad;
          ctx.lineWidth = planetW * 0.25;
          ctx.stroke();
        }

        // Trail edge sparks — DOM particles that fly off the cooling tail
        if (trailFrame % 4 === 0 && n > 3) {
          // Spawn from the TAIL zone (oldest 40% of trail — where fire is cooling)
          const tailZoneEnd = Math.floor(n * 0.4);
          for (let i = 0; i < tailZoneEnd; i++) {
            if (Math.random() < 0.15) {
              const pt = firePoints[i];
              const age = (trailFrame - pt.time) / maxAge;
              const fresh = Math.max(0, 1 - age);
              if (fresh < 0.1) continue;
              // Direction: outward from trail + backward
              let dx = 0,
                dy = 0;
              if (i < n - 1) {
                dx = firePoints[i + 1].x - pt.x;
                dy = firePoints[i + 1].y - pt.y;
              }
              const len = Math.sqrt(dx * dx + dy * dy) || 1;
              // Perpendicular (sideways) + backward direction
              const side = Math.random() > 0.5 ? 1 : -1;
              const flyX = (-dy / len) * side * 0.7 + (-dx / len) * 0.3;
              const flyY = (dx / len) * side * 0.7 + (-dy / len) * 0.3;
              spawnSpark(pt.x, pt.y, flyX, flyY, fresh * 0.7);
            }
          }
        }

        // Smoke cloud — sparse puffs at the very TAIL TIP only (not along whole trail)
        if (effectiveSpeed > SMOKE_SPEED && trailFrame % 8 === 0 && n > 5 && Math.random() < 0.4) {
          const pt = firePoints[0] // oldest point = tail tip
          const startSize = C.planet.size * 0.7
          const puff = document.createElement('div')
          puff.style.cssText = `
            position:fixed; z-index:9998; border-radius:50%; pointer-events:none;
            left:${pt.x - startSize/2}px; top:${pt.y - startSize/2}px;
            width:${startSize}px; height:${startSize}px;
            background: radial-gradient(circle, ${rgbToRgba(darken(currentColor, 0.3), 0.06)} 25%, transparent 65%);
          `
          document.body.appendChild(puff)
          const endSize = startSize * (2.5 + Math.random() * 1.5)
          gsap.to(puff, {
            width: endSize,
            height: endSize,
            marginLeft: -(endSize - startSize) / 2,
            marginTop: -(endSize - startSize) / 2,
            opacity: 0,
            duration: 1.8 + Math.random() * 1,
            ease: 'power1.out',
            onComplete: () => puff.remove(),
          })
        }

        ctx.globalAlpha = 1;
      }

      prevX = mouseX;
      prevY = mouseY;
      rafId = requestAnimationFrame(updateLoop);
    };
    rafId = requestAnimationFrame(updateLoop);

    let magnetTarget: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      let { clientX, clientY } = e;

      if (magnetTarget && !isProjectHover) {
        const rect = magnetTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((clientX - cx) ** 2 + (clientY - cy) ** 2);
        const maxDist = Math.max(rect.width, rect.height) * 1.5;
        if (dist < maxDist) {
          const pull = (1 - dist / maxDist) * 0.3;
          clientX += (cx - clientX) * pull;
          clientY += (cy - clientY) * pull;
        }
      }

      mouseX = clientX;
      mouseY = clientY;
      // Planet + ring move together (trail positioned in RAF)
      planetMoveX(clientX);
      planetMoveY(clientY);
      ringMoveX(clientX);
      ringMoveY(clientY);

      if (isProjectHover) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el?.closest('[data-cursor="project"]')) resetProjectState();
      }
      // Color detection happens in RAF — works for both mouse move AND scroll
    };

    // --- Interactive hover ---
    const handleInteractiveEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      // Opt-out for large targets where the pull is disruptive (e.g. portrait).
      if (target.dataset.cursorMagnet !== "false") {
        magnetTarget = target;
      }
      gsap.to(planet, {
        scale: C.hover.interactive.planetScale,
        duration: 0.25,
        ease: "power3.out",
      });
      gsap.to(ringWrap, {
        width: C.hover.interactive.ringSize,
        height: C.hover.interactive.ringSize,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleInteractiveLeave = () => {
      magnetTarget = null;
      gsap.to(planet, { scale: 1, duration: 0.25, ease: "power3.out" });
      gsap.to(ringWrap, {
        width: C.ring.size,
        height: C.ring.size,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    // --- Project image hover: energize + pulse ---
    const handleProjectEnter = (e: Event) => {
      isProjectHover = true;
      magnetTarget = null;
      if (projectTl) {
        projectTl.kill();
        projectTl = null;
      }
      if (pulseTl) {
        pulseTl.kill();
        pulseTl = null;
      }

      const target = e.currentTarget as HTMLElement;
      const projColor =
        target.getAttribute("data-cursor-color") || currentColor;
      setColorImmediate(projColor);

      const tl = gsap.timeline();
      projectTl = tl;

      const light = lighten(projColor, 0.4);
      const ps = C.hover.project.planetSize;
      tl.to(
        planet,
        {
          width: ps,
          height: ps,
          marginLeft: -ps / 2,
          marginTop: -ps / 2,
          background: `radial-gradient(circle at 35% 30%, ${light}, ${projColor} 55%, ${darken(projColor, 0.3)})`,
          boxShadow: `0 0 16px ${projColor}80, 0 0 30px ${projColor}40, 0 0 4px ${projColor}`,
          duration: 0.35,
          ease: "power3.out",
        },
        0,
      );

      tl.to(ring, { rotateX: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.set(
        ring,
        {
          background: "none",
          border: `2px solid ${projColor}50`,
          boxShadow: `0 0 8px ${projColor}25`,
        },
        0.1,
      );
      tl.to(
        ringWrap,
        {
          width: C.hover.project.ringSize,
          height: C.hover.project.ringSize,
          duration: 0.3,
          ease: "power3.out",
        },
        0,
      );

      const pulse = gsap.timeline({ repeat: -1, delay: 0.3 });
      pulse.to(ringWrap, {
        scale: 1.3,
        opacity: 0.3,
        duration: 0.8,
        ease: "power2.out",
      });
      pulse.to(ringWrap, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
      pulseTl = pulse;
    };

    const handleProjectLeave = () => resetProjectState();

    const handleDocLeave = () =>
      gsap.to([planet, ringWrap], { opacity: 0, duration: 0.3 });
    const handleDocEnter = () => {
      gsap.to(planet, { opacity: 1, duration: 0.3 });
      gsap.to(ringWrap, { opacity: 1, duration: 0.3 });
    };

    // Scroll trail: detected in RAF loop by comparing window.scrollY each frame

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleDocLeave);
    document.addEventListener("mouseenter", handleDocEnter);

    const decoratedInteractive = new Set<Element>();
    const decoratedProject = new Set<Element>();
    let attachRaf: number | null = null;

    const attachListeners = () => {
      if (attachRaf) return;
      attachRaf = requestAnimationFrame(() => {
        attachRaf = null;
        document
          .querySelectorAll('a, button, [data-cursor="pointer"]')
          .forEach((el) => {
            if (decoratedInteractive.has(el) || decoratedProject.has(el))
              return;
            decoratedInteractive.add(el);
            el.addEventListener("mouseenter", handleInteractiveEnter);
            el.addEventListener("mouseleave", handleInteractiveLeave);
          });
        document.querySelectorAll('[data-cursor="project"]').forEach((el) => {
          if (decoratedProject.has(el)) return;
          decoratedProject.add(el);
          el.addEventListener("mouseenter", handleProjectEnter);
          el.addEventListener("mouseleave", handleProjectLeave);
        });
      });
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      if (attachRaf) cancelAnimationFrame(attachRaf);
      if (projectTl) projectTl.kill();
      if (pulseTl) pulseTl.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);

      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mouseleave", handleDocLeave);
      document.removeEventListener("mouseenter", handleDocEnter);
      document.documentElement.classList.remove("has-custom-cursor");
      observer.disconnect();
      decoratedInteractive.forEach((el) => {
        el.removeEventListener("mouseenter", handleInteractiveEnter);
        el.removeEventListener("mouseleave", handleInteractiveLeave);
      });
      decoratedProject.forEach((el) => {
        el.removeEventListener("mouseenter", handleProjectEnter);
        el.removeEventListener("mouseleave", handleProjectLeave);
      });
    };
  }, []);

  const maskRing = "radial-gradient(circle, transparent 48%, black 55%)";
  const initLight = lighten(DEFAULT_COLOR, 0.5);
  const initDark = darken(DEFAULT_COLOR, 0.5);

  return (
    <>
      {/* Canvas for continuous fire/smoke trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999] touch-hidden"
        aria-hidden="true"
      />

      <div
        ref={ringWrapRef}
        className="pointer-events-none fixed top-0 left-0 z-[10001] touch-hidden"
        style={{
          width: CURSOR.ring.size,
          height: CURSOR.ring.size,
          marginLeft: -CURSOR.ring.size / 2,
          marginTop: -CURSOR.ring.size / 2,
          willChange: "transform",
          perspective: `${CURSOR.ring.perspective}px`,
        }}
        aria-hidden="true"
      >
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full"
          style={{
            transform: `rotateX(${CURSOR.ring.tilt}deg)`,
            transformStyle: "preserve-3d",
            mask: maskRing,
            WebkitMask: maskRing,
            willChange: "transform",
          }}
        />
      </div>

      {/* Planet body */}
      <div
        ref={planetRef}
        className="pointer-events-none fixed top-0 left-0 z-[10003] rounded-full touch-hidden"
        style={{
          width: CURSOR.planet.size,
          height: CURSOR.planet.size,
          marginLeft: -CURSOR.planet.size / 2,
          marginTop: -CURSOR.planet.size / 2,
          background: `radial-gradient(circle at 35% 30%, ${initLight}, ${DEFAULT_COLOR} 55%, ${initDark})`,
          boxShadow: `0 0 8px ${DEFAULT_COLOR}60, 0 0 3px ${DEFAULT_COLOR}90`,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
