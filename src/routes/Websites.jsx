import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Websites = () => {
  const [activeUrl, setActiveUrl] = useState("chrome://newtab");
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const navigate = useNavigate();
  const sites = [
    {
      name: "Famalicão Liberal",
      url: "https://famalicaoliberal.pt",
      icon: "🏛️",
      color: "from-blue-500 to-teal-300",
    },
    {
      name: "Striking Media",
      url: "https://media.striking.pt",
      icon: "📸",
      color: "from-green-300 to-yellow-600",
    },
    {
      name: "Termo IL",
      url: "https://termo.diogopcastelos.pt",
      icon: "📝",
      color: "from-black to-teal-100",
    },
    {
      name: "CV",
      url: "/docs/CV - Diogo Piteira Castelos.pdf",
      icon: "📄",
      color: "from-pink-200 to-red-400",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSiteClick = (url) => {
    if (url.includes(".pdf")) {
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      link.click();
    } else {
      setLoading(true);
      setActiveUrl(url);
    }
  };

  // Animation variants for intro overlay
  const overlayVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  const bgExpandVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: 10,
      opacity: 0,
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  const textVariants = {
    initial: { scale: 0.8, opacity: 0, filter: "drop-shadow(0 0 0px #fff)" },
    animate: {
      scale: [1, 1.1, 1],
      opacity: 1,
      filter: [
        "drop-shadow(0 0 4px #fff)",
        "drop-shadow(0 0 12px #fff)",
        "drop-shadow(0 0 4px #fff)",
      ],
      transition: {
        duration: 2.4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100/30 via-white/20 to-blue-100/30 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white overflow-hidden"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400"
              variants={bgExpandVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div
              className="relative text-5xl md:text-7xl font-extrabold tracking-wide"
              variants={textVariants}
              initial="initial"
              animate="animate"
            >
              🚀 Websites Portal
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-6xl">
        {/* Monitor Frame */}
        <div className="bg-gradient-to-b from-slate-300/40 to-slate-600/40 backdrop-blur-md p-2 md:p-6 rounded-xl md:rounded-3xl shadow-2xl border border-white/30">
          <div className="relative w-full h-[75vh] bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl overflow-hidden shadow-inner border border-white/50">
            {/* Browser Header */}
            <div className="h-12 bg-slate-100/60 backdrop-blur-sm border-b border-slate-300/40 flex items-center px-4">
              <div className="flex gap-2 mr-4">
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="w-3 h-3 cursor-pointer rounded-full bg-red-500/80 hover:bg-red-600 transition-colors"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div
                  onClick={() => {
                    setActiveUrl("chrome://newtab");
                    setLoading(false);
                  }}
                  className="w-3 h-3 cursor-pointer rounded-full bg-green-500/80"
                />
              </div>
              <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-slate-700 border border-slate-300/50 truncate">
                {activeUrl === "chrome://newtab"
                  ? "chrome://newtab/"
                  : activeUrl}
              </div>
              <div className="ml-3 flex gap-1">
                <div className="w-1 h-1 bg-slate-500 rounded-full" />
                <div className="w-1 h-1 bg-slate-500 rounded-full" />
                <div className="w-1 h-1 bg-slate-500 rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full h-full bg-white/60 backdrop-blur-sm relative">
              {activeUrl === "chrome://newtab" ? (
                <div className="flex flex-col items-center justify-center h-full p-6 md:p-8">
                  {/* Google Logo */}
                  <div className="text-5xl md:text-6xl font-light mb-8 tracking-wide">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-500">g</span>
                    <span className="text-green-500">l</span>
                    <span className="text-red-500">e</span>
                  </div>

                  {/* Search Bar */}
                  <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-full px-4 py-3 border border-slate-300/50 mb-8 shadow-sm text-sm">
                    <div className="flex items-center text-slate-600">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Search Google or type a URL
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mb-8">
                    <button className="px-4 py-2 bg-slate-100/80 backdrop-blur-sm hover:bg-slate-200/80 rounded border border-slate-300/50 text-slate-700 text-sm transition-colors">
                      Google Search
                    </button>
                    <button className="px-4 py-2 bg-slate-100/80 backdrop-blur-sm hover:bg-slate-200/80 rounded border border-slate-300/50 text-slate-700 text-sm transition-colors">
                      I'm Feeling Lucky
                    </button>
                  </div>

                  {/* Quick Access */}
                  <h3 className="text-slate-600 mb-6 font-medium">
                    Quick Access
                  </h3>
                  <div className="grid grid-cols-4 gap-4 md:gap-6">
                    {sites.map((site, i) => (
                      <button
                        key={i}
                        onClick={() => handleSiteClick(site.url)}
                        className="group flex flex-col transition-all duration-300 items-center p-2 md:p-3 rounded-xl hover:bg-black/20"
                      >
                        <div
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${site.color} flex items-center justify-center text-xl md:text-2xl shadow group-hover:scale-110 duration-300 transition-transform mb-2`}
                        >
                          {site.icon}
                        </div>
                        <span className="text-xs md:text-sm text-slate-700 font-medium">
                          {site.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  {loading && (
                    <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <iframe
                    src={activeUrl}
                    className="w-full h-full"
                    title="Website"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    onLoad={() => setLoading(false)}
                  />
                  <button
                    onClick={() => {
                      setActiveUrl("chrome://newtab");
                      setLoading(false);
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors border border-slate-300/50 shadow-sm z-20"
                  >
                    <svg
                      className="w-5 h-5 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monitor Stand */}
        <div className="flex justify-center mt-4">
          <div className="w-20 md:w-24 h-5 md:h-6 bg-gradient-to-b from-slate-400/60 to-slate-700/60 backdrop-blur-sm rounded-t-lg border border-white/30" />
        </div>
        <div className="flex justify-center">
          <div className="w-32 md:w-40 h-2 md:h-3 bg-gradient-to-b from-slate-500/60 to-slate-800/60 backdrop-blur-sm rounded-lg shadow-lg border border-white/20" />
        </div>
      </div>
    </div>
  );
};

export default Websites;
