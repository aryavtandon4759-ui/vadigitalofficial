import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Laptop, Smartphone, Lock, ArrowUpRight, Loader2, Sparkles, RefreshCw
} from "lucide-react";
import { DemoWebsite } from "../types";

interface DemoPreviewSimulatorProps {
  demo: DemoWebsite | null;
  onClose: () => void;
}

export default function DemoPreviewSimulator({ demo, onClose }: DemoPreviewSimulatorProps) {
  if (!demo) return null;

  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [animationStyle, setAnimationStyle] = useState<"flip" | "pop" | "slide" | "fade">("flip");

  // Reset loading status whenever selected demo changes or key is re-triggered
  useEffect(() => {
    setIframeLoading(true);
  }, [demo, iframeKey]);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  const getMotionConfig = () => {
    switch (animationStyle) {
      case "flip":
        return {
          initial: { opacity: 0, y: 160, rotateX: 24, scale: 0.9, transformOrigin: "bottom center" },
          animate: !iframeLoading 
            ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } 
            : { opacity: 0, y: 160, rotateX: 24, scale: 0.9 },
          transition: { type: "spring", stiffness: 60, damping: 14, mass: 1.1 }
        };
      case "pop":
        return {
          initial: { opacity: 0, y: 240, scale: 0.75, transformOrigin: "center center" },
          animate: !iframeLoading 
            ? { opacity: 1, y: 0, scale: 1 } 
            : { opacity: 0, y: 240, scale: 0.75 },
          transition: { type: "spring", stiffness: 90, damping: 13, mass: 0.9 }
        };
      case "slide":
        return {
          initial: { opacity: 0, y: 400, transformOrigin: "center center" },
          animate: !iframeLoading 
            ? { opacity: 1, y: 0 } 
            : { opacity: 0, y: 400 },
          transition: { type: "spring", stiffness: 75, damping: 16 }
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0, scale: 0.96 },
          animate: !iframeLoading 
            ? { opacity: 1, scale: 1 } 
            : { opacity: 0, scale: 0.96 },
          transition: { duration: 0.7, ease: "easeOut" }
        };
    }
  };

  const motionConfig = getMotionConfig();

  const targetUrl = demo.url || "https://vadigital.co/";

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-neutral-950/95 backdrop-blur-md"
        id="demo-simulator-overlay"
      >
        {/* Animated Main Simulator Card with glowing outline border */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 20 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="relative w-full max-w-[98vw] h-[95vh] sm:h-[97vh] bg-[#07080b]/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          id="demo-simulator-card"
        >
          {/* Neon Fluid Orb glow behind card header */}
          <div className="absolute top-0 left-1/4 w-[300px] h-[100px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[300px] h-[100px] bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Top Bar / Metadata */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between px-4 py-3 bg-[#0a0b0f] border-b border-white/5 gap-3">
            {/* Demo Header */}
            <div className="flex items-center gap-3">
              <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${demo.accentClass} animate-pulse`} />
              <div className="text-left">
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-display">
                  {demo.name}
                  <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-blue-400 capitalize">
                    {demo.category}
                  </span>
                </h3>
                <p className="text-[10px] text-neutral-500 font-mono">Live Worker Demonstration System</p>
              </div>
            </div>

            {/* Device Toggle Mode */}
            <div className="flex items-center gap-1 bg-neutral-950 border border-white/5 p-1 rounded-lg select-none self-start md:self-auto">
              <button
                id="btn-desktop-toggle"
                onClick={() => setDeviceMode("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-sans font-semibold cursor-pointer transition-all duration-200 ${
                  deviceMode === "desktop"
                    ? "bg-white/10 text-white shadow-sm border border-white/5"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Laptop className="w-3.5 h-3.5 text-blue-400" />
                <span>Desktop View</span>
              </button>
              <button
                id="btn-mobile-toggle"
                onClick={() => setDeviceMode("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-sans font-semibold cursor-pointer transition-all duration-200 ${
                  deviceMode === "mobile"
                    ? "bg-white/10 text-white shadow-sm border border-white/5"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mobile Mockup</span>
              </button>
            </div>

            {/* Entrance FX Selector */}
            <div className="flex items-center gap-1 bg-neutral-950 border border-white/5 p-1 rounded-lg select-none self-start md:self-auto shrink-0">
              <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase px-2 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" /> Load FX:
              </span>
              <button
                onClick={() => { setAnimationStyle("flip"); handleRefresh(); }}
                className={`px-2.5 py-1 rounded text-[10px] font-sans font-bold cursor-pointer transition-all ${
                  animationStyle === "flip"
                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/30 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                }`}
                title="Beautiful 3D flip-up from horizontal coordinate"
              >
                3D Flip
              </button>
              <button
                onClick={() => { setAnimationStyle("pop"); handleRefresh(); }}
                className={`px-2.5 py-1 rounded text-[10px] font-sans font-bold cursor-pointer transition-all ${
                  animationStyle === "pop"
                    ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                }`}
                title="Soft spring pop-up from depth"
              >
                Pop Up
              </button>
              <button
                onClick={() => { setAnimationStyle("slide"); handleRefresh(); }}
                className={`px-2.5 py-1 rounded text-[10px] font-sans font-bold cursor-pointer transition-all ${
                  animationStyle === "slide"
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                }`}
                title="High-performance slide-up from bottom"
              >
                Slide
              </button>
              <button
                onClick={() => { setAnimationStyle("fade"); handleRefresh(); }}
                className={`px-2.5 py-1 rounded text-[10px] font-sans font-bold cursor-pointer transition-all ${
                  animationStyle === "fade"
                    ? "bg-amber-600/20 text-amber-300 border border-amber-500/30 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                }`}
                title="Minimalist fade-in"
              >
                Fade
              </button>
            </div>

            {/* Actions: Refresh and Launch Out, and Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="p-1.5 rounded-lg border border-white/5 bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850 cursor-pointer transition-colors"
                title="Refresh Frame"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${iframeLoading ? "animate-spin text-blue-400" : ""}`} />
              </button>
              
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-bold leading-none cursor-pointer transition-all"
                title="Open in new tab"
              >
                <span>Launch Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                id="btn-close-simulator"
                onClick={onClose}
                className="p-1.5 rounded-lg border border-white/10 bg-rose-950/20 text-rose-300 hover:text-white hover:bg-rose-900 cursor-pointer transition-colors ml-1"
                title="Close Live Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Simulated Web Address / URL Bar */}
          <div className="px-4 py-2 bg-[#06080b] border-b border-white/5 flex items-center gap-2 text-left">
            <div className="flex items-center gap-1.5 mr-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            
            <div className="flex-1 flex items-center bg-[#0d1017] border border-white/5 rounded-lg py-1 px-3 max-w-2xl mx-auto text-[11px] text-neutral-400 gap-1.5 select-all">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-neutral-600 font-mono">https://</span>
              <span className="text-neutral-200 font-mono truncate">{targetUrl.replace("https://", "").replace("http://", "")}</span>
              <span className="text-emerald-400/80 font-mono ml-auto text-[9px] tracking-wider uppercase font-bold shrink-0 hidden sm:inline flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Fast SSL
              </span>
            </div>
          </div>

          {/* Viewport Frame with Iframe Integration */}
          <div 
            className="flex-1 bg-neutral-950 p-2 sm:p-4 flex items-center justify-center relative overflow-hidden"
            style={{ perspective: "1500px" }}
          >
            
            {/* Spinning preview loader overlay */}
            <AnimatePresence>
              {iframeLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-[#07080b] flex flex-col items-center justify-center space-y-4"
                >
                  <div className="relative">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 animate-spin [animation-duration:10s]" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs font-bold text-white font-mono tracking-wider uppercase">Loading Live Preview Screen</p>
                    <p className="text-[10px] text-neutral-500 font-mono">Connecting securely to fast Cloudflare Edge workers...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated Desktop/Mobile framing constraints */}
            <motion.div 
              key={`${targetUrl}-${iframeKey}-${animationStyle}`}
              initial={motionConfig.initial}
              animate={motionConfig.animate}
              transition={motionConfig.transition}
              className={`h-full w-full border border-white/10 rounded-xl bg-black shadow-2xl flex flex-col overflow-hidden relative transition-all duration-500 ${
                deviceMode === "desktop" ? "max-w-full" : "max-w-[380px]"
              }`}
              id="iframe-viewport-container"
            >
              {deviceMode === "mobile" && (
                <div className="h-4 bg-[#111] w-full flex items-center justify-center shrink-0 border-b border-white/5 text-[9px] font-mono text-neutral-650 tracking-widest uppercase">
                  •••• Dynamic Handset Frame ••••
                </div>
              )}
              
              <iframe
                key={`${targetUrl}-${iframeKey}`}
                src={targetUrl}
                title={demo.name}
                onLoad={() => setIframeLoading(false)}
                className="w-full h-full border-none bg-[#090b0e]"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Info Footer Guide */}
          <div className="px-5 py-2.5 bg-[#0a0b0f] border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-550 gap-2">
            <span className="flex items-center gap-1 text-neutral-400 font-semibold font-mono">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              VA Digital Edge Node: Active Real-Time Render
            </span>
            <p className="text-[10px] text-neutral-500 font-sans">
              Interactions, clicks, and page routines are 100% functional inside this isolated preview playground.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
