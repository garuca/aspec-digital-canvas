import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Sparkles, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GalaxyBackground from "./GalaxyBackground";

// Reusable Shader Background Hook
const useShaderBackground = (heroType: 'old' | 'new') => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  // WebGL Renderer class
  class WebGLRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private vs: WebGLShader | null = null;
    private fs: WebGLShader | null = null;
    private buffer: WebGLBuffer | null = null;
    private scale: number;
    private shaderSource: string;
    private mouseMove = [0, 0];
    private mouseCoords = [0, 0];
    private pointerCoords = [0, 0];
    private nbrOfPointers = 0;

    private vertexSrc = `#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}`;

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext('webgl2')!;
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      this.shaderSource = defaultShaderSource;
    }

    updateShader(source: string) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas: number[]) {
      this.mouseMove = deltas;
    }

    updateMouse(coords: number[]) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords: number[]) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr: number) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale: number) {
      this.scale = scale;
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source: string) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER)!;
      this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram()!;
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program!;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      (program as any).resolution = gl.getUniformLocation(program, 'resolution');
      (program as any).time = gl.getUniformLocation(program, 'time');
      (program as any).move = gl.getUniformLocation(program, 'move');
      (program as any).touch = gl.getUniformLocation(program, 'touch');
      (program as any).pointerCount = gl.getUniformLocation(program, 'pointerCount');
      (program as any).pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f((program as any).time, now * 1e-3);
      gl.uniform2f((program as any).move, this.mouseMove[0], this.mouseMove[1]);
      gl.uniform2f((program as any).touch, this.mouseCoords[0], this.mouseCoords[1]);
      gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
      gl.uniform2fv((program as any).pointers, this.pointerCoords);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class
  class PointerHandler {
    private scale: number;
    private active = false;
    private pointers = new Map<number, number[]>();
    private lastCoords = [0, 0];
    private moves = [0, 0];

    constructor(element: HTMLCanvasElement, scale: number) {
      this.scale = scale;
      
      const map = (element: HTMLCanvasElement, scale: number, x: number, y: number) => 
        [x * scale, element.height - y * scale];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale: number) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords() {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first() {
      return this.pointers.values().next().value || this.lastCoords;
    }
  }

  const resize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = (canvas.clientWidth || window.innerWidth) * dpr;
    canvas.height = (canvas.clientHeight || window.innerHeight) * dpr;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (heroType !== 'old' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Safety check for WebGL2 support to prevent runtime context crashes
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.warn('WebGL2 is not supported. Skipping background shader animation.');
      canvas.style.background = 'radial-gradient(circle at center, #1e0b36 0%, #000 100%)';
      return;
    }

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();
    
    resize();
    
    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }
    
    loop(0);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, [heroType]);

  return canvasRef;
};

const HeroSection = () => {
  const { t } = useLanguage();
  
  // Alternate between old (nebula + globe) and new (colliding galaxies) backgrounds on successive page visits
  const [heroType, setHeroType] = useState<'old' | 'new'>(() => {
    if (typeof window !== 'undefined') {
      const current = localStorage.getItem('aspec_hero_type');
      return current === 'new' ? 'new' : 'old';
    }
    return 'old';
  });

  useEffect(() => {
    // Save the other type for the next visit
    localStorage.setItem('aspec_hero_type', heroType === 'old' ? 'new' : 'old');
  }, [heroType]);

  const canvasRef = useShaderBackground(heroType);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dark-section"
    >
      <div className="dark-grid-pattern opacity-20 pointer-events-none" />

      {/* Background layer - z-0 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {heroType === 'new' ? (
          <GalaxyBackground />
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block touch-none"
            style={{ background: 'black' }}
          />
        )}
        {/* Vignette & gradient to make the typography pop and harmonize with the dark aesthetic */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.75)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>



      {/* Content layer - z-10 */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col min-h-screen">
        
        {/* Spacer for header */}
        <div className="h-24" />
        
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {/* Badge centered */}
          <div className="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
            <span className="text-sm font-medium text-white/90 flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400" />
              {t("hero.badge")}
            </span>
          </div>

          <div className="relative">
            <div className="absolute -inset-20 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-purple-900/30 blur-3xl rounded-full animate-pulse" />
            <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-purple-600/20 blur-2xl rounded-full" />
            
            <h1 className="font-exo font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight text-center relative hero-title-glow tracking-tight">
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                {t("hero.line1")}
              </span>
              <br />
              <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {t("hero.line2")}
              </span>
            </h1>
            
            {/* Small floating particles around title */}
            <div className="absolute -top-4 -left-8 w-2 h-2 bg-purple-400/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute -bottom-2 -right-6 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
            <div className="absolute top-1/2 -left-12 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/4 -right-10 w-2 h-2 bg-purple-300/40 rounded-full animate-ping" style={{ animationDuration: '1.8s' }} />
          </div>

          <div className="max-w-2xl text-center">
            <p className="font-exo text-lg md:text-xl text-purple-100/90 leading-relaxed mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
              {t("hero.intro")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6">
              <span className="text-2xl md:text-3xl font-exo font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                {t("hero.design")}
              </span>
              <span className="text-white/40 text-2xl font-light">+</span>
              <span className="text-2xl md:text-3xl font-exo font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {t("hero.tech")}
              </span>
              <span className="text-white/40 text-2xl font-light">+</span>
              <span className="text-2xl md:text-3xl font-exo font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
                {t("hero.dev")}
              </span>
            </div>
            <p className="font-exo text-base md:text-lg text-white/70 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {t("hero.subtitle1")}{" "}
              <span className="relative inline-block">
                <span className="text-cyan-300 font-semibold">{t("hero.ai")}</span>
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-50" />
              </span>{" "}
              {t("hero.subtitle2")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button 
              variant="gradient" 
              size="lg" 
              className="gap-2 text-base px-10 py-6 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group"
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://wa.me/5582999158022';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.click();
              }}
            >
              <Rocket size={18} className="group-hover:-translate-y-1 transition-transform animate-bounce" />
              {t("hero.cta1")}
            </Button>
            <Button 
              variant="hero" 
              size="lg" 
              className="gap-2 text-base px-10 py-6 rounded-xl border-white/20 hover:bg-white/10 transition-all duration-300"
              onClick={() => {
                document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>{t("hero.cta2")}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-8">
          <div className="scroll-indicator flex flex-col items-center gap-3">
            <span className="text-xs font-medium text-white/40 tracking-[0.3em] uppercase">{t("hero.scroll")}</span>
            <div className="scroll-indicator-dot" />
            <ChevronDown size={16} className="text-white/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*
*	To explore strange new worlds, to seek out new life
*	and new civilizations, to boldly go where no man has
*	gone before.
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
	for (float i=1.; i<12.; i++) {
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv;
		float d=length(p);
		vec3 colorTint = mix(vec3(0.357, 0.180, 1.0), vec3(0.851, 0.275, 0.937), sin(i + T * 0.1)*.5+.5);
		colorTint = mix(colorTint, vec3(0.024, 0.714, 0.831), cos(i - T * 0.05)*.5+.5);
		col+=.00125/d*(cos(sin(i)*vec3(1.,1.5,2.))+1.) * colorTint * 1.5;
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
		col=mix(col,vec3(bg*.18,bg*.08,bg*.42),d);
	}
	O=vec4(col,1);
}`;

export default HeroSection;
