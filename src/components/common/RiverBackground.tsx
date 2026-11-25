import { useEffect, useRef } from 'react'
import { getTheme, subscribeTheme, type Theme } from '../../hooks/useTheme'

/**
 * Full-page "river" backdrop: a flowing, domain-warped water field with soft caustic
 * streaks, plus ripple rings that spread from the pointer, taps and occasional "raindrops".
 *
 * Raw WebGL (one full-screen triangle, one draw call) rendered at reduced resolution —
 * the field is soft by nature, so upscaling is free quality-wise and cheap on GPUs.
 * Pauses when the tab is hidden; renders a single still frame under reduced motion.
 */

const MAX_RIPPLES = 8

const vertexSrc = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const fragmentSrc = (octaves: number) => `
precision highp float;
#define OCT ${octaves}
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec3 uBase;
uniform vec3 uDeep;
uniform vec3 uHi;
uniform vec3 uAccent;
uniform float uHiStrength;
uniform vec4 uRip[${MAX_RIPPLES}];

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < OCT; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Expanding ripple rings: displace the water and add a faint highlight on each crest.
  vec2 disp = vec2(0.0);
  float ring = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec4 r = uRip[i];
    float age = uTime - r.z;
    if (r.w <= 0.0 || age < 0.0 || age > 5.0) continue;
    vec2 d = p - r.xy;
    float dist = length(d);
    float band = dist - age * 0.2;
    float env = exp(-band * band * 180.0) * exp(-age * 0.85) * r.w;
    float wave = sin(band * 85.0) * env;
    disp += (d / (dist + 0.001)) * wave * 0.014;
    ring += wave;
  }

  float t = uTime * 0.045;
  vec2 q = p + disp;
  q.y += uScroll * 0.12;

  // A river: the field is stretched across the flow and drifts steadily sideways.
  vec2 flow = vec2(q.x * 1.15 - t * 2.2, q.y * 2.8 + sin(q.x * 1.3 + t) * 0.25);
  vec2 warp = vec2(fbm(flow * 0.9 + vec2(0.0, t)), fbm(flow * 0.9 + vec2(5.2, -t)));
  float n = fbm(flow + warp * 1.7);

  // Caustic streaks from iso-bands of the warped field.
  float streak = pow(1.0 - abs(sin(n * 9.0 + t * 5.0)), 12.0);

  vec3 col = mix(uDeep, uBase, smoothstep(0.2, 0.85, n));
  col = mix(col, uHi, streak * uHiStrength);
  col = mix(col, uAccent, clamp(abs(ring), 0.0, 1.0) * 0.22);

  // Vignette keeps the edges calm so content stays the focus.
  float v = smoothstep(1.3, 0.2, length((uv - 0.5) * vec2(1.1, 1.3)));
  col = mix(uDeep, col, 0.35 + 0.65 * v);
  gl_FragColor = vec4(col, 1.0);
}
`

type Palette = { base: number[]; deep: number[]; hi: number[]; accent: number[]; hiStrength: number }
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
const palettes: Record<Theme, Palette> = {
  dark: { base: hex('#121714'), deep: hex('#070908'), hi: hex('#3d4c40'), accent: hex('#c6ff4d'), hiStrength: 0.55 },
  light: { base: hex('#f7f8f5'), deep: hex('#dde1da'), hi: hex('#ffffff'), accent: hex('#7cb518'), hiStrength: 0.85 },
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader error')
  return s
}

export function RiverBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, depth: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return // CSS background shows through

    const mobile = window.matchMedia('(max-width: 767px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scale = mobile ? 0.4 : 0.5

    let program: WebGLProgram
    try {
      program = gl.createProgram()!
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSrc))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSrc(mobile ? 3 : 4)))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link error')
    } catch (err) {
      if (import.meta.env.DEV) console.warn('[RiverBackground] disabled:', err)
      return
    }
    gl.useProgram(program)

    // One oversized triangle covers the screen.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const uRes = u('uRes'), uTime = u('uTime'), uScroll = u('uScroll')
    const uBase = u('uBase'), uDeep = u('uDeep'), uHi = u('uHi'), uAccent = u('uAccent'), uHiStrength = u('uHiStrength')
    const uRip = u('uRip')

    // Ripple ring buffer: [x, y, startTime, strength] × N
    const ripples = new Float32Array(MAX_RIPPLES * 4)
    let rippleIndex = 0
    const start = performance.now()
    const now = () => (performance.now() - start) / 1000

    const addRipple = (clientX: number, clientY: number, strength: number) => {
      const aspect = window.innerWidth / window.innerHeight
      const o = rippleIndex * 4
      ripples[o] = (clientX / window.innerWidth) * aspect
      ripples[o + 1] = 1 - clientY / window.innerHeight
      ripples[o + 2] = now()
      ripples[o + 3] = strength
      rippleIndex = (rippleIndex + 1) % MAX_RIPPLES
    }

    // Palette (eased between themes)
    const current: Palette = structuredClone(palettes[getTheme()])
    let target = palettes[getTheme()]
    const unsubscribe = subscribeTheme(() => {
      target = palettes[getTheme()]
      if (reduced) {
        Object.assign(current, structuredClone(target))
        draw()
      }
    })

    const resize = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * scale))
      canvas.height = Math.max(1, Math.round(window.innerHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (reduced) draw()
    }

    function draw() {
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.uniform1f(uTime, reduced ? 12 : now())
      gl!.uniform1f(uScroll, window.scrollY / window.innerHeight)
      gl!.uniform3fv(uBase, current.base)
      gl!.uniform3fv(uDeep, current.deep)
      gl!.uniform3fv(uHi, current.hi)
      gl!.uniform3fv(uAccent, current.accent)
      gl!.uniform1f(uHiStrength, current.hiStrength)
      gl!.uniform4fv(uRip, ripples)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }

    const lerpPalette = (k: number) => {
      for (const key of ['base', 'deep', 'hi', 'accent'] as const) {
        for (let i = 0; i < 3; i++) current[key][i] += (target[key][i] - current[key][i]) * k
      }
      current.hiStrength += (target.hiStrength - current.hiStrength) * k
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduced) {
      draw()
      return () => {
        window.removeEventListener('resize', resize)
        unsubscribe()
      }
    }

    // Interaction: trailing ripples while moving, a strong one on tap/click.
    let last = { x: -1, y: -1, t: 0 }
    const onMove = (e: PointerEvent) => {
      const t = now()
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y)
      if (t - last.t > 0.14 && dist > 60) {
        addRipple(e.clientX, e.clientY, 0.45)
        last = { x: e.clientX, y: e.clientY, t }
      }
    }
    const onDown = (e: PointerEvent) => addRipple(e.clientX, e.clientY, 1)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })

    // Ambient raindrops keep the river alive without input.
    let rainTimer = 0
    const rain = () => {
      addRipple(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 0.35 + Math.random() * 0.3)
      rainTimer = window.setTimeout(rain, 1800 + Math.random() * 2600)
    }
    rainTimer = window.setTimeout(rain, 1200)

    let raf = 0
    let prev = performance.now()
    const loop = (t: number) => {
      const dt = Math.min(0.1, (t - prev) / 1000)
      prev = t
      lerpPalette(1 - Math.exp(-dt * 6))
      draw()
      raf = requestAnimationFrame(loop)
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        prev = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
    }
    canvas.addEventListener('webglcontextlost', onLost)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(rainTimer)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('webglcontextlost', onLost)
      unsubscribe()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-ink" />
}
