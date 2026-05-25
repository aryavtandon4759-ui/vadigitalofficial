import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Monitor, MapPin, Search, CalendarRange, MessageSquareText, 
  Phone, ArrowUpRight, Check, ArrowRight, ShieldCheck, 
  Sparkles, Menu, X, MessageSquare, ClipboardList, Clock, 
  ChevronRight, Bot, Send, Languages, QrCode, Copy
} from "lucide-react";
import { SERVICES, DEMO_WEBSITES } from "./data";
import { DemoWebsite } from "./types";
import DemoPreviewSimulator from "./components/DemoPreviewSimulator";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("https://vadigital.co");
  const [copiedLink, setCopiedLink] = useState(false);
  const [showStagingQR, setShowStagingQR] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<DemoWebsite | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Track system time for showing uptime or live hours
  const [currentUtcTime, setCurrentUtcTime] = useState("09:38:10");

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Hello! Main VA Digital AI Customer Support representative hoon. Main English, Hindi aur Hinglish teenon me transparent chat kar sakta hoon! Aapke business ke liye high speed custom website, landing portfolio, ya local Google Maps SEO me help chahiye? Puchiye, main haazir hoon! 😊"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatOpen) {
      setTimeout(scrollToBottom, 80);
    }
  }, [messages, chatOpen]);

  useEffect(() => {
    // Elegant incremental 0-100 loader timer
    let loaderTimer: any = null;
    if (loading) {
      loaderTimer = setInterval(() => {
        setLoadPercent(prev => {
          if (prev >= 100) {
            clearInterval(loaderTimer);
            setTimeout(() => {
              setLoading(false);
            }, 600);
            return 100;
          }
          // Increment with sleek variable rates (simulates real loading)
          const step = Math.floor(Math.random() * 8) + 3;
          return Math.min(100, prev + step);
        });
      }, 30);
    }

    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Keep dynamic clock ticking for metadata visual accent
    const interval = setInterval(() => {
      const now = new Date();
      const pad = (num: number) => String(num).padStart(2, "0");
      setCurrentUtcTime(`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
      if (loaderTimer) clearInterval(loaderTimer);
    };
  }, [loading]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 2000);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputText;
    if (!rawText.trim()) return;

    const userMsg = { role: "user" as const, content: rawText };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    try {
      const payload = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: payload })
      });

      if (!res.ok) {
        throw new Error("AI Chat Router status returned not active");
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: "model" as const, content: data.text }]);
    } catch (err) {
      console.error("AI communication system offline:", err);
      setMessages(prev => [
        ...prev,
        {
          role: "model" as const,
          content: "Uh oh! Support connectivity state is transiently slow. Niche WhatsApp ya Direct Call icon button daba kar ek baar direct connection banyiye! Hum aapki high performance website jald hi start karwa denge. 🙏"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const phoneHref = "tel:+919079911681";
  const whatsappHref = "https://wa.me/919079911681?text=Hello%20VA%20Digital%2C%20I%20saw%20your%20website%20and%20would%20love%20to%20discuss%20a%20modern%20website%20for%20my%20business.";

  return (
    <>
      {/* 24/7 PROFESSIONAL HIGH-END 0-100 BOOTLOADER COVER */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -80,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 bg-[#020203] z-[9999] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none"
            id="fancy-agency-bootloader"
          >
            {/* Top Bar Indicators */}
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-600">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                VA DIGITAL STAGING ENVIRONMENT
              </span>
              <span>NETWORK STATUS: OPTIMIZED</span>
            </div>

            {/* Glowing Fluid Orb in Loading Backside */}
            <div className="absolute inset-x-0 top-1/3 flex items-center justify-center">
              <motion.div 
                animate={{
                  scale: [1, 1.25, 0.95, 1],
                  opacity: [0.5, 0.8, 0.4, 0.5],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-[450px] h-[450px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
              />
            </div>

            {/* Middle Typographic Segment */}
            <div className="relative text-left space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#8e9bb0] block font-mono">
                CREATING HIGHEST VISIBILITY EXPERIENCE
              </span>
              
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-6xl sm:text-7xl md:text-8xl font-black font-display tracking-tighter text-white leading-none uppercase"
                >
                  VA Digital
                </motion.h2>
              </div>

              <p className="text-xs text-neutral-500 font-mono tracking-wider max-w-sm uppercase leading-relaxed">
                Hand-built high performance Web pipelines. Custom booking systems • Rank #1 Map packs • Blazing edge speed.
              </p>
            </div>

            {/* Bottom Progress Segment */}
            <div className="relative space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1 text-left">
                  <span className="text-[10px] text-neutral-600 font-mono tracking-widest block uppercase">ESTIMATION PRE-RENDER COMPLETE</span>
                  <p className="text-xs font-mono text-neutral-300">SYSTEM COGNIZANT ENGINE LOADED...</p>
                </div>
                
                {/* Huge Numeric Percentage Indicator */}
                <div className="text-6xl sm:text-8xl font-sans font-light tracking-tighter text-white font-display">
                  {String(loadPercent).padStart(3, "0")}
                </div>
              </div>

              {/* Progress Line */}
              <div className="h-[2px] bg-neutral-900 overflow-hidden relative rounded-full w-full">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400" 
                  style={{ width: `${loadPercent}%` }} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#030303] text-[#f3f4f6] font-sans antialiased overflow-x-hidden relative select-none">
        
        {/* Glow-Scroll Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-550 z-50 origin-left shadow-[0_2px_8px_rgba(59,130,246,0.6)]"
          style={{ scaleX }}
        />
        
        {/* 1. FLOATING MODERN DECORATIVE UI BACKGROUND EFFECTS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Shifting background glopping neon orb 1 */}
          <motion.div 
            animate={{
              scale: [1, 1.15, 0.95, 1],
              x: [0, 40, -30, 0],
              y: [0, -30, 40, 0],
              rotate: [0, 90, 180, 270],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[6%] left-[10%] w-96 h-96 rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" 
          />
          {/* Shifting background glopping neon orb 2 */}
          <motion.div 
            animate={{
              scale: [1, 0.9, 1.2, 1],
              x: [0, -60, 40, 0],
              y: [0, 50, -40, 0],
              rotate: [180, 270, 90, 180],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[35%] right-[5%] w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[160px] pointer-events-none" 
          />
          {/* Shifting background glopping neon orb 3 */}
          <motion.div 
            animate={{
              scale: [1, 1.25, 0.85, 1],
              x: [0, 30, -50, 0],
              y: [0, 60, -30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[20%] left-[15%] w-[450px] h-[450px] rounded-full bg-emerald-600/5 blur-[140px] pointer-events-none" 
          />
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

      {/* 2. PREMIUM STICKY HEADER / NAVBAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "py-3 bg-[#030303]/80 backdrop-blur-md border-b border-white/5 shadow-glass" 
            : "py-5 bg-transparent border-b border-transparent"
        }`}
        id="main-nav-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button 
            id="logo-button"
            onClick={() => handleScrollTo("hero")}
            className="flex items-center gap-2 cursor-pointer text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold font-display text-sm relative overflow-hidden transition-transform duration-200 group-hover:scale-105">
              VA
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600" />
            </div>
            <div>
              <span className="text-white font-bold tracking-tight font-display text-lg">VA Digital</span>
              <p className="text-[9px] text-gray-500 font-mono tracking-widest leading-none">CRAFTED DESIGN</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button 
              id="nav-link-about"
              onClick={() => handleScrollTo("about")}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer font-medium"
            >
              About
            </button>
            <button 
              id="nav-link-demos"
              onClick={() => handleScrollTo("demos")}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer font-medium flex items-center gap-1.5"
            >
              Demo Websites
              <span className="bg-blue-950/60 text-blue-400 border border-blue-900/30 font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                Live Previews
              </span>
            </button>
            <button 
              id="nav-link-services"
              onClick={() => handleScrollTo("services")}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer font-medium"
            >
              Services
            </button>
            <button 
              id="nav-link-contact-text"
              onClick={() => handleScrollTo("contact")}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer font-medium"
            >
              Contact Us
            </button>
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              id="header-cta-phone"
              href={phoneHref}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 bg-white/5"
            >
              <Phone className="w-3 h-3 text-blue-500" />
              +91 90799 11681
            </a>
            <button 
              id="header-cta-demo"
              onClick={() => handleScrollTo("demos")}
              className="text-xs font-bold font-sans px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 cursor-pointer shadow-sm transition-all"
            >
              Explore Demos
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/5 text-gray-400 hover:text-white bg-white/5 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 3. MOBILE DROPDOWN DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] inset-x-0 z-30 bg-[#07080b]/95 border-b border-white/5 md:hidden overflow-hidden backdrop-blur-lg"
            id="mobile-drawer"
          >
            <div className="px-5 py-6 space-y-4">
              <button
                id="mob-link-about"
                onClick={() => handleScrollTo("about")}
                className="block w-full text-left py-2 text-md font-medium text-gray-400 hover:text-white border-b border-white/5"
              >
                About
              </button>
              <button
                id="mob-link-demos"
                onClick={() => handleScrollTo("demos")}
                className="block w-full text-left py-2 text-md font-medium text-gray-400 hover:text-white border-b border-white/5 flex items-center justify-between"
              >
                <span>Demo Websites</span>
                <span className="bg-blue-950/40 text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-blue-900/30">
                  5 Live Preview Models
                </span>
              </button>
              <button
                id="mob-link-services"
                onClick={() => handleScrollTo("services")}
                className="block w-full text-left py-2 text-md font-medium text-gray-400 hover:text-white border-b border-white/5"
              >
                Services
              </button>
              <button
                id="mob-link-contact"
                onClick={() => handleScrollTo("contact")}
                className="block w-full text-left py-2 text-md font-medium text-gray-400 hover:text-white"
              >
                Contact
              </button>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <a
                  id="mob-cta-call"
                  href={phoneHref}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-white/5 bg-white/5 text-xs text-gray-300 font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  Call Now
                </a>
                <a
                  id="mob-cta-whatsapp"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs text-white font-bold"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN LAYOUT */}
      <main className="relative z-10">

        {/* 1. HERO & ABOUT SECTION IN EDITORIAL ADJOINED GRID */}
        <section 
          id="hero" 
          className="pt-28 pb-12 md:pt-40 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            {/* Left Hero Section (col-span-8) */}
            <div className="lg:col-span-8 text-left space-y-6">
              {/* Subtle Decorative Capsule with Sparkles */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: -25, rotateX: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 border border-blue-500/15 bg-blue-950/20 text-blue-400 rounded-full text-xs font-medium font-sans tracking-wide"
                style={{ transformOrigin: "top center" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                Empowering Local Businesses with Elite Web Design
              </motion.div>

              {/* Hero Big Heading with editorial scale */}
              <motion.h1 
                initial={{ opacity: 0, y: 60, rotateX: 35, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold font-display text-white tracking-tight leading-[0.95]"
                style={{ transformOrigin: "bottom center", perspective: "1000px" }}
              >
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Websites</span> <br />
                For Local Businesses
              </motion.h1>

              {/* Subheading focusing on growth outcomes */}
              <motion.p 
                initial={{ opacity: 0, y: 40, rotateX: 18 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.35 }}
                className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed font-sans font-light"
                style={{ transformOrigin: "bottom center" }}
              >
                VA Digital hands local brands a powerful web presence. We build ultra-modern, blazing-fast, high-converting websites optimized specifically for search engines, bookings, and local maps growth.
              </motion.p>

              {/* Premium Animated CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 35, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 95, damping: 13, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <button
                  id="hero-cta-demos"
                  onClick={() => handleScrollTo("demos")}
                  className="px-6 py-3.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-600/20 cursor-pointer active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  View Demo Sites
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-cta-contact"
                  onClick={() => handleScrollTo("contact")}
                  className="px-6 py-3.5 text-sm font-semibold text-neutral-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Contact Now
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                </button>
              </motion.div>
            </div>

            {/* Right About Section (col-span-4) */}
            <div 
              id="about" 
              className="lg:col-span-4 self-stretch flex items-end pb-2 text-left"
            >
              <motion.div 
                initial={{ opacity: 0, y: 70, rotateX: 25, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-65px" }}
                transition={{ type: "spring", stiffness: 65, damping: 13, delay: 0.25 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm w-full space-y-4 shadow-glass hover:border-blue-500/20 transition-all duration-300"
                style={{ transformOrigin: "bottom center", perspective: "1000px" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold block">About Our Agency</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                
                {/* Exact user-requested About text */}
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  “VA Digital helps local businesses establish a strong online presence with modern websites, Google Business setup, SEO basics, and online booking solutions.”
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span>Based in India</span>
                  <span>Est. 2026</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

          {/* OUR EXPERTISE SEGMENT & TICKER BAR WITH SLIDING SCROLL ANIMATION */}
          <section className="border-y border-white/5 bg-neutral-950/40 py-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              <div className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-neutral-500 w-32 text-left">
                Our Core Focus
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Website Design",
                  "Google Business",
                  "SEO Setup",
                  "Booking Systems",
                  "AI Support"
                ].map((item, idx) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="px-4 py-2 bg-neutral-900 border border-white/5 rounded-full flex items-center gap-2 hover:border-blue-500/30 hover:scale-105 transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-xs text-neutral-300 font-mono">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

        {/* 3. DEMO WEBSITES SECTION (WITH HERO PREVIEW SIMULATOR LAUNCHERS) */}
        <section 
          id="demos" 
          className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >
          {/* Section titles */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase">
              INTERACTIVE TEMPLATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Sovereign Website Previews
            </h2>
            <p className="text-gray-400 text-sm">
              We don&apos;t just show boring wireframes. Click <span className="font-semibold text-white">Live Preview</span> on any of our hand-crafted, fully functional demo templates to interact with them in real-time.
            </p>
          </div>

          {/* Cards Grid of 5 Demo items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4" style={{ perspective: "1500px" }}>
            {DEMO_WEBSITES.map((demo, idx) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 90, rotateX: 22, rotateY: idx % 2 === 0 ? -4 : 4, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 70, damping: 14, delay: idx * 0.08 }}
                whileHover={{ y: -10, scale: 1.02, borderColor: "rgba(59,130,246,0.3)", boxShadow: "0 20px 40px -15px rgba(59,130,246,0.2)" }}
                className="group bg-[#090b0e] border border-gray-900 focus-within:border-blue-500 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gray-800 shadow-sm transition-all duration-300"
                style={{ transformOrigin: "bottom center" }}
                id={`demo-card-${demo.id}`}
              >
                {/* Thumbnail Layer */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-950">
                  <img 
                    src={demo.thumbnailUrl} 
                    alt={demo.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/15 to-transparent" />
                  
                  {/* Category label badge */}
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white font-mono text-[9px] px-2 py-0.5 rounded border border-white/5 uppercase tracking-wider">
                    {demo.category}
                  </span>
                </div>

                {/* Card Body Information */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-display text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                      {demo.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {demo.description}
                    </p>
                  </div>

                  {/* Program features list with micro checkboxes */}
                  <div className="flex flex-wrap gap-1.5">
                    {demo.features.map((feat) => (
                      <span 
                        key={feat}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 text-[9px] text-gray-400 border border-white/5 font-mono"
                      >
                        <Check className="w-2.5 h-2.5 text-blue-500" />
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Action live launcher button */}
                  <div className="pt-2">
                    <button
                      id={`btn-preview-trigger-${demo.id}`}
                      onClick={() => setSelectedDemo(demo)}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-white/5 border border-white/15 rounded-xl hover:bg-white hover:text-black group-hover:border-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Live Preview
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. SERVICES SECTION */}
        <section 
          id="services" 
          className="py-20 bg-black/60 border-t border-y border-white/5 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header Titles */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold tracking-widest text-blue-500 uppercase">
                WHAT WE EXCEL AT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight font-display">
                Services Crafted For Local Commerce
              </h2>
              <p className="text-gray-400 text-sm">
                Brimming with high-performance frameworks and built for structural visibility.
              </p>
            </div>

            {/* Custom Interactive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {SERVICES.map((srv, idx) => {
                // Resolve icon safely
                const renderIcon = () => {
                  const props = { className: "w-5 h-5 text-blue-400" };
                  switch (srv.iconName) {
                    case "Monitor": return <Monitor {...props} />;
                    case "MapPin": return <MapPin {...props} />;
                    case "Search": return <Search {...props} />;
                    case "CalendarRange": return <CalendarRange {...props} />;
                    case "MessageSquareText": return <MessageSquareText {...props} />;
                    default: return <Monitor {...props} />;
                  }
                };

                return (
                  <motion.div
                    key={srv.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.3)", backgroundColor: "#0c0e14" }}
                    className="p-6 bg-[#08090d] border border-gray-950 rounded-2xl flex flex-col justify-between text-left space-y-4 transition-colors relative overflow-hidden group"
                    id={`service-card-${srv.id}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-900/10 flex items-center justify-center shrink-0">
                      {renderIcon()}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white tracking-tight font-display">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        {srv.description}
                      </p>
                    </div>
                    <div className="pt-2 text-[10px] text-gray-500 font-mono flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Fully Setup &amp; Deployed
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. CONTACT SECTION */}
        <section 
          id="contact" 
          className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Centered Premium Contact Container with glass aesthetics and major viewport slide */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
            className="relative max-w-3xl mx-auto bg-gradient-to-b from-neutral-900/90 to-black/95 border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden shadow-premium"
            id="premium-contact-card"
          >
            {/* Glowing Accent Ring Behind */}
            <motion.div 
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-blue-500/15 blur-[65px] pointer-events-none" 
            />
            <motion.div 
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-indigo-500/15 blur-[65px] pointer-events-none" 
            />

            <div className="relative space-y-8 flex flex-col items-center">
              
              {/* Icon Capsule */}
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-base relative shadow-sm">
                VA
                <div className="absolute bottom-0 inset-x-0 h-1 bg-blue-600 rounded-b-lg" />
              </div>

              {/* Exact user requested header text */}
              <div className="space-y-3 max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  Let’s Build Your Online Presence
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Connect with our team instantly. We create rapid, standard-compliant solutions to help you get discovered on local web index maps and increase conversion ratios.
                </p>
              </div>

              {/* Verified contact points info */}
              <div className="w-full max-w-md bg-black/60 border border-white/5 rounded-2xl p-5 space-y-4">
                
                {/* Standard Call Node */}
                <a 
                  id="contact-call-btn"
                  href={phoneHref}
                  className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl group transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/50 border border-blue-900/20 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-mono leading-none">DIRECT HEAD OFFICE LINE</p>
                      <p className="text-sm font-bold font-mono text-white mt-1">+91 90799 11681</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </a>

                {/* Premium WhatsApp Button */}
                <a 
                  id="contact-whatsapp-btn"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-emerald-950/20 border border-emerald-900/30 hover:bg-emerald-950/30 rounded-xl group transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-920/10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-emerald-500 font-mono font-bold leading-none">WHATSAPP CHAT SYNC</p>
                      <p className="text-sm font-bold text-white mt-1">Connect On WhatsApp</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </a>

              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Active and Accepting Bookings — Current Local Time Indicator
              </div>

            </div>
          </motion.div>
        </section>

      </main>

      {/* 6. IMMERSIVE MINIMALIST FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-black/60 relative z-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white text-black flex items-center justify-center font-bold font-display text-xs">
              VA
            </div>
            <span className="text-white font-bold font-display text-sm">VA Digital</span>
          </div>

          {/* Exact user requested footer text */}
          <p className="text-xs text-gray-500 font-mono tracking-wider">
            VA Digital ©️ 2026
          </p>

          <div className="flex gap-4 text-xs text-gray-400 font-mono">
            <button onClick={() => handleScrollTo("about")} className="hover:text-white transition-colors cursor-pointer">About</button>
            <span>•</span>
            <button onClick={() => handleScrollTo("demos")} className="hover:text-white transition-colors cursor-pointer">Live Demos</button>
            <span>•</span>
            <button onClick={() => handleScrollTo("services")} className="hover:text-white transition-colors cursor-pointer">Services</button>
          </div>
        </div>
      </footer>

      {/* 24/7 INTERACTIVE AI CHATBOT SIDE-WIDGET (WHATSAPP-GREEN AND DEEP METEOR AI HYBRID DESIGN) */}
      <div 
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 flex flex-col items-end"
        id="ai-support-bubble-container"
      >
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="w-[90vw] sm:w-[380px] h-[520px] bg-[#090b0f] border border-white/10 rounded-2xl shadow-premium overflow-hidden flex flex-col mb-4 select-text"
              id="ai-support-chat-window"
            >
              {/* Chat Window Header */}
              <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-650 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center border border-white/15">
                      <Bot className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    {/* Pulsing status indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#090b0f] animate-ping" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#090b0f]" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-display">
                      VA AI Support Agent
                      <span className="text-[9px] px-1.5 py-0.5 bg-black/40 text-emerald-300 rounded-full uppercase tracking-wider font-mono font-bold leading-none select-none">
                        Online
                      </span>
                    </h4>
                    <p className="text-[10px] text-emerald-100/80 font-mono flex items-center gap-1">
                      <Languages className="w-3 h-3 text-white" /> Hinglish • English • Hindi
                    </p>
                  </div>
                </div>
                <button 
                  id="close-chat-widget"
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 rounded-lg bg-black/20 text-white/80 hover:text-white hover:bg-black/40 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Window Message Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/40 text-left scrollbar-thin">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role !== "user" && (
                      <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-900/30 flex items-center justify-center shrink-0 self-end">
                        <Bot className="w-4 h-4 text-emerald-400" />
                      </div>
                    )}
                    <div 
                      className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-xs md:text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-emerald-600 text-white rounded-br-none shadow-sm shadow-emerald-700/15 font-sans font-medium" 
                          : "bg-[#11141b] border border-white/5 text-gray-200 rounded-bl-none font-sans"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-900/30 flex items-center justify-center shrink-0 self-end">
                      <Bot className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="bg-[#11141b] border border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Quick Buttons Bar */}
              <div className="p-2 border-t border-white/5 bg-[#0b0e14]/90 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none select-none">
                {[
                  "Website starting pricing kya hai?",
                  "Google Business profile help",
                  "Fast loading speed setup",
                  "AI features integrations"
                ].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSendMessage(sug)}
                    className="shrink-0 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-gray-350 hover:text-white rounded-full text-[10px] border border-white/5 transition-all cursor-pointer font-sans"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Chat Input Field Container */}
              <div className="p-3 bg-[#0d1017] border-t border-white/5 flex gap-2">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder="Ask in Hindi, English, Hinglish..."
                  className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
                />
                <button 
                  id="send-chat-payload"
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Custom Activator (Renders dual green active rings similar to WhatsApp button badge) */}
        <motion.button
          id="ai-agent-trigger-btn"
          onClick={() => setChatOpen(!chatOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 cursor-pointer border-2 border-white/10 z-40 group focus:outline-none"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 group-hover:scale-125 transition-transform duration-500 animate-ping pointer-events-none" />
          
          {chatOpen ? (
            <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Bot className="w-5.5 h-5.5 md:w-6 md:h-6 text-white transition-transform group-hover:rotate-12" />
              <span className="text-[7.5px] font-bold font-mono tracking-tighter uppercase text-emerald-100 leading-none mt-0.5">
                24/7 AI
              </span>
            </div>
          )}

          {!chatOpen && (
            <span className="absolute -top-1 -right-0.5 bg-rose-500 text-white text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
              1
            </span>
          )}
        </motion.button>
      </div>

      {/* 7. DYNAMIC MOBILE-ONLY STICKY CTAS CONTAINER BAR */}
      <div 
        className="fixed bottom-0 inset-x-0 z-40 bg-[#07080b]/90 backdrop-blur-md border-t border-white/5 px-4 py-3 md:hidden flex gap-3 shadow-lg"
        id="sticky-mobile-ctas"
      >
        <a 
          id="sticky-mob-call"
          href={phoneHref}
          className="flex-1 py-3 bg-white/5 text-gray-200 border border-white/10 rounded-xl text-xs font-mono font-bold tracking-tight text-center flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <Phone className="w-4 h-4 text-blue-500" />
          Call Now
        </a>
        <a 
          id="sticky-mob-whatsapp"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wide text-center flex items-center justify-center gap-1.5 focus:outline-none active:scale-[0.98] transition-transform"
        >
          <MessageSquare className="w-4 h-4" />
          WhatsApp Now
        </a>
      </div>

      {/* 9. SOVEREIGN COMPACT DEVELOPER STAGING QR TOOL (BOTTOM-LEFT CORNER) */}
      <div 
        className="fixed bottom-20 left-4 md:bottom-8 md:left-8 z-45 flex flex-col items-start"
        id="staging-qr-widget-container"
      >
        <AnimatePresence>
          {showStagingQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="bg-[#090b0f] border border-white/10 rounded-2xl p-4 shadow-2xl w-64 flex flex-col items-center select-text mb-3"
            >
              <div className="flex justify-between items-center w-full mb-2">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 animate-pulse" /> Mobile Sandbox
                </span>
                <button
                  onClick={() => setShowStagingQR(false)}
                  className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-32 h-32 bg-white p-1.5 rounded-lg mb-2 relative overflow-hidden">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}&color=0-0-0&bgcolor=255-255-255&qzone=2`}
                  alt="Staging Link QR"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <motion.div 
                  animate={{ y: [-5, 125, -5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-[1.5px] bg-blue-500/60 shadow-[0_0_6px_#3b82f6] pointer-events-none"
                />
              </div>

              <p className="text-[10px] text-neutral-400 font-sans text-center mb-2 leading-tight">
                Scan with mobile camera to view live responsive staging environment.
              </p>

              <div className="flex gap-1.5 w-full">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-1 px-2 bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-neutral-400" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShowStagingQR(!showStagingQR)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-9 px-3 rounded-full bg-neutral-900 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white shadow-xl flex items-center gap-1.5 cursor-pointer text-[11px] font-mono font-semibold"
        >
          <QrCode className="w-3.5 h-3.5 text-blue-400" />
          <span>Staging Link</span>
        </motion.button>
      </div>

      {/* 8. MODULAR BROWSABLE IFRAME SIMULATOR MODAL */}
      <DemoPreviewSimulator 
        demo={selectedDemo}
        onClose={() => setSelectedDemo(null)}
      />

    </div>
    </>
  );
}
