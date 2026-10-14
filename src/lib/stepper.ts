// The engine of the step-through explainers (fig. 1 "What green tests miss", fig. 3 "How I ship with AI agents").
//
// Progress-driven: the whole picture is a function of ONE number, --x on the root element,
// from 0 (first step) to the index of the last step. CSS turns it into each step's state:
//   --on  (0..1) how far the step is reached,   --seg (0..1) how full the line to the next step is,
//   --cur (0..1) how "current" the step is.
// This script only moves --x. Remotion can later move the same number frame by frame (video V1).
//
// Markup it expects inside an element with [data-stepper]:
//   [data-step="<title>"]  one per step, in order (the title is read out in the status line)
//   [data-controls] (hidden)  with buttons [data-act="toggle"] (contains [data-label]), [data-act="prev"], [data-act="next"]
//   [data-status]  a polite live region
// Options as attributes: data-hold="1500" (ms a step stays lit; default: the --step-hold token),
// data-autoplay (play once when half on screen).
//
// Rules (AGENTS.md, motion): without JavaScript and with reduced motion the final state shows;
// reduced motion gets Back / Next only; a click never waits for an animation; hidden tabs pause.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const MOVE_MS = 300; // one move between steps (motion rule: 100-300 ms)

function setup(root: HTMLElement) {
  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
  const bar = root.querySelector<HTMLElement>("[data-controls]");
  const toggle = root.querySelector<HTMLButtonElement>('[data-act="toggle"]');
  const label = root.querySelector<HTMLElement>("[data-label]");
  const status = root.querySelector<HTMLElement>("[data-status]");
  if (!bar || !toggle || !label || !status || steps.length < 2) return;
  const last = steps.length - 1;
  // The token may arrive as "1500ms" or, after CSS minifying, "1.5s".
  const token = getComputedStyle(root).getPropertyValue("--step-hold").trim();
  const tokenMs = token.endsWith("ms") ? parseFloat(token) : token.endsWith("s") ? parseFloat(token) * 1000 : NaN;
  const hold = Number(root.dataset.hold) || tokenMs || 1500;
  let x = last;
  let shown = -1;
  let raf = 0;
  let timer = 0;
  let playing = false;
  let touched = false;

  const index = () => Math.round(x);

  function render(v: number) {
    x = v;
    root.style.setProperty("--x", v.toFixed(3));
    const i = index();
    if (i === shown) return;
    shown = i;
    steps.forEach((el, k) => (k === i ? el.setAttribute("aria-current", "step") : el.removeAttribute("aria-current")));
    status!.textContent = `Step ${i + 1} of ${last + 1}: ${steps[i].dataset.step}`;
  }

  function moveTo(target: number, ms = MOVE_MS): Promise<void> {
    cancelAnimationFrame(raf);
    if (reduce.matches || ms <= 0) {
      render(target);
      return Promise.resolve();
    }
    const from = x;
    const start = performance.now();
    return new Promise((done) => {
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / ms);
        render(from + (target - from) * (1 - Math.pow(1 - p, 3))); // ease-out
        if (p < 1) raf = requestAnimationFrame(tick);
        else done();
      };
      raf = requestAnimationFrame(tick);
    });
  }

  function setPlaying(on: boolean) {
    playing = on;
    toggle!.setAttribute("aria-pressed", String(on));
    label!.textContent = on ? "Pause" : index() === last ? "Replay" : "Play";
  }

  function stop() {
    window.clearTimeout(timer);
    setPlaying(false);
  }

  function scheduleNext() {
    window.clearTimeout(timer);
    timer = window.setTimeout(async () => {
      if (!playing) return;
      const next = Math.min(last, index() + 1);
      await moveTo(next);
      if (next >= last) stop();
      else scheduleNext();
    }, hold);
  }

  function play() {
    if (index() === last) render(0);
    setPlaying(true);
    scheduleNext();
  }

  const step = (d: number) => {
    touched = true;
    stop();
    void moveTo(Math.min(last, Math.max(0, index() + d)), 250).then(() => setPlaying(false));
  };
  toggle.addEventListener("click", () => {
    touched = true;
    if (playing) stop();
    else play();
  });
  root.querySelector('[data-act="prev"]')?.addEventListener("click", () => step(-1));
  root.querySelector('[data-act="next"]')?.addEventListener("click", () => step(1));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && playing) stop();
  });

  bar.hidden = false;
  bar.setAttribute("data-ready", ""); // .nb-stepbar keeps its space invisible until this (no layout shift)

  // Reduced motion: the final state, Back / Next only, nothing moves by itself.
  if (reduce.matches) {
    toggle.hidden = true;
    render(last);
    return;
  }

  // Otherwise: start at step 1 and, with data-autoplay, play once when half on screen.
  render(0);
  setPlaying(false);
  if (!("autoplay" in root.dataset) || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        if (!touched) play();
      }
    },
    { threshold: 0.5 },
  );
  io.observe(root);
}

for (const root of document.querySelectorAll<HTMLElement>("[data-stepper]")) setup(root);
