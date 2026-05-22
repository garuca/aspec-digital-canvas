import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineBackground() {
  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden select-none pointer-events-auto">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="flex flex-col items-center gap-4">
              {/* Modern spinner with glowing gradients */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/10 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-cyan-400 border-b-purple-600 border-l-transparent animate-spin" />
              </div>
              <span className="text-sm font-exo text-purple-200/50 tracking-widest uppercase animate-pulse">
                Carregando Canvas 3D...
              </span>
            </div>
          </div>
        }
      >
        <Spline
          className="w-full h-full"
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>
    </div>
  );
}
