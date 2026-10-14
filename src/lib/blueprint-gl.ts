// The Blueprint theme's hero background: a slow, dim blue glow drawn with plain WebGL (no library).
// Loaded only on demand by BlueprintGlow.astro (desktop, Blueprint theme, motion allowed), so phones,
// Paper and reduced motion never download it. It descends from the old site's hero shader, made calm:
// - it draws only light (transparent canvas), so the blueprint grid of the page stays visible through it;
// - it renders at half resolution and at most 30 frames a second (a soft glow needs no more);
// - it drifts while the visitor is active and settles to a still frame after a few quiet seconds
//   (motion rule 9); moving the mouse wakes it up again;
// - it stops when off-screen, in a hidden tab, when paused with the button, or when the theme changes.

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

// Simplex noise (Ashima / Stefan Gustavson, MIT), two layers, turned into a soft alpha glow.
const FRAG = `precision mediump float;
uniform float t;uniform vec2 m;uniform vec2 r;uniform vec3 c;
vec3 q(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 q(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 w(vec3 x){return q(((x*34.)+1.)*x);}
float n(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
vec2 i=floor(v+dot(v,C.yy));vec2 a=v-i+dot(i,C.xx);vec2 o=(a.x>a.y)?vec2(1.,0.):vec2(0.,1.);
vec4 b=a.xyxy+C.xxzz;b.xy-=o;i=q(i);vec3 p=w(w(i.y+vec3(0.,o.y,1.))+i.x+vec3(0.,o.x,1.));
vec3 k=max(.5-vec3(dot(a,a),dot(b.xy,b.xy),dot(b.zw,b.zw)),0.);k=k*k;k=k*k;
vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 f=floor(x+.5);vec3 g0=x-f;
k*=1.79284291400159-.85373472095314*(g0*g0+h*h);vec3 g;g.x=g0.x*a.x+h.x*a.y;g.yz=g0.yz*b.xz+h.yz*b.yw;
return 130.*dot(k,g);}
void main(){vec2 u=gl_FragCoord.xy/r;vec2 s=u*vec2(r.x/r.y,1.);vec2 mo=(m-.5)*.12;
float v=n(s*1.1+vec2(t*.035,-t*.02)+mo)*.65+n(s*2.3-vec2(t*.018,t*.012)+mo*.5)*.35;
float a=smoothstep(-.35,.95,v)*(1.-smoothstep(.15,.95,distance(u,vec2(.32,.55))));
a*=.42;gl_FragColor=vec4(c*a,a);}`;

export type Glow = { start(): void; stop(): void };

export function mount(canvas: HTMLCanvasElement, button: HTMLButtonElement | null): Glow | null {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (k: string) => gl.getUniformLocation(prog, k);
  const uT = u("t");
  const uM = u("m");
  const uR = u("r");
  gl.uniform3f(u("c"), 0.2, 0.36, 0.95); // blueprint blue (the glow's colour; the page behind stays near-black)

  const SCALE = 0.5; // half resolution
  const resize = () => {
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * SCALE));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * SCALE));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uR, canvas.width, canvas.height);
  };
  resize();
  new ResizeObserver(() => {
    resize();
    draw();
  }).observe(canvas);

  const QUIET_MS = 6000; // settle after this long without input
  let time = 0;
  let speed = 1; // eases between 1 (drifting) and 0 (still)
  let lastInput = performance.now();
  let lastFrame = 0;
  let raf = 0;
  let on = false; // theme + device allow it
  let visible = true;
  let paused = false;
  let mx = 0.5;
  let my = 0.5;

  function draw() {
    gl!.uniform1f(uT, time);
    gl!.uniform2f(uM, mx, my);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
  }

  function frame(now: number) {
    raf = 0;
    const dt = lastFrame ? Math.min(now - lastFrame, 100) : 0;
    if (dt === 0 || dt >= 32) {
      // at most ~30 frames a second
      lastFrame = now;
      const target = now - lastInput < QUIET_MS ? 1 : 0;
      speed += (target - speed) * Math.min(1, dt / 900);
      time += (dt / 1000) * speed;
      draw();
      if (target === 0 && speed < 0.01) return; // settled: a still frame, no more work
    }
    raf = requestAnimationFrame(frame);
  }

  function update() {
    const run = on && visible && !paused && !document.hidden;
    if (run && !raf) {
      lastFrame = 0;
      raf = requestAnimationFrame(frame);
    } else if (!run && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  window.addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX / window.innerWidth;
      my = 1 - e.clientY / window.innerHeight;
      lastInput = performance.now();
      update();
    },
    { passive: true },
  );
  new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    update();
  }).observe(canvas);
  document.addEventListener("visibilitychange", update);

  if (button) {
    button.addEventListener("click", () => {
      paused = !paused;
      button.textContent = paused ? "Play background" : "Pause background";
      if (!paused) lastInput = performance.now();
      update();
    });
  }

  return {
    start() {
      on = true;
      lastInput = performance.now();
      canvas.classList.add("is-on");
      if (button) button.hidden = false;
      draw();
      update();
    },
    stop() {
      on = false;
      canvas.classList.remove("is-on");
      if (button) button.hidden = true;
      update();
    },
  };
}
