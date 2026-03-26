import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center font-sans">
      
      {/* Right Diagonal Orange Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-orange-950 via-orange-600 to-yellow-500"
        style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)", opacity: 0.8 }}
      >
        {/* Synthetic noise texture overlay for grainy look */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" 
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')"
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-16 max-w-4xl mx-auto p-6 text-center">
        
        {/* Custom Logo & Name Container */}
        <div className="flex flex-col md:flex-row items-center gap-6 justify-center drop-shadow-2xl">
          {/* Logo Icon (Abstract mirrored structural arcs) */}
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500 shrink-0">
            {/* Left Arc */}
            <path d="M22 8 C 34 8, 40 20, 40 32 C 40 44, 34 56, 22 56 L 14 48 C 22 48, 28 40, 28 32 C 28 24, 22 16, 14 16 Z" fill="currentColor"/>
            {/* Right Arc */}
            <path d="M42 8 C 30 8, 24 20, 24 32 C 24 44, 30 56, 42 56 L 50 48 C 42 48, 36 40, 36 32 C 36 24, 42 16, 50 16 Z" fill="currentColor"/>
            {/* Center Notches (Left and Right outward extensions) */}
            <rect x="0" y="28" width="12" height="8" rx="2" fill="currentColor" />
            <rect x="52" y="28" width="12" height="8" rx="2" fill="currentColor" />
          </svg>

          {/* App Name styled with modern extended sans-serif look */}
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase text-left leading-tight" style={{ letterSpacing: "0.15em" }}>
            Track<br/>
            <span className="text-2xl md:text-4xl text-zinc-300 font-bold" style={{ letterSpacing: "0.2em" }}>Your Money</span>
          </h1>
        </div>

        {/* Enter Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="group relative px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white uppercase tracking-[0.3em] text-sm font-bold rounded hover:bg-white/10 transition-all overflow-hidden drop-shadow-lg"
        >
          <span className="relative z-10">Enter Platform</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>

      </div>
    </div>
  );
}
