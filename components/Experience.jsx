import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const glassEffect = {
  light: "bg-white/80 backdrop-blur-xl border border-white/20",
  dark: "bg-gray-900/70 backdrop-blur-xl border border-gray-700/30"
};

function ExperienceCard({ experience, index, theme, isActive, onClick }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => onClick(index)}
      className={`relative cursor-pointer transition-all duration-300 rounded-3xl py-4 px-4
        ${isActive ? 'scale-105 ring-2 ring-purple-500/50' : 'hover:scale-102'} 
        ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80' : 'bg-gradient-to-br from-white/90 to-gray-50/90'}
        border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'}
        shadow-2xl shadow-black/10 hover:shadow-purple-500/10`}
    >
      {isActive && (
        <motion.div
          layoutId="activeExperience"
          className="absolute inset-0 rounded-3xl border-2 border-purple-500/30 pointer-events-none"
        />
      )}
      
      <div className="relative z-10">
        <h4 className="text-center font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          {experience.company_name}
        </h4>
        <p className="text-center text-sm font-medium dark:text-gray-300 text-gray-700">
          {experience.title}
        </p>
        <div className="text-center mt-2">
          <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-wider rounded-full dark:bg-purple-900/30 dark:text-purple-300 bg-purple-100 text-purple-700 font-bold">
            {experience.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Experience() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeExp, setActiveExp] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeExperience = experiences[activeExp];

  // Navigation Logic
  const handleNext = () => {
    setActiveExp((prev) => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveExp((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    
    <section ref={containerRef} className="relative w-full min-h-screen  py-20 px-4 md:px-8 overflow-hidden">
      {/* Background decoration */}
       <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />     

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"

          style={{
            backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px),
                              linear-gradient(to bottom, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'

          }}

        />

      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={textVariant()}
          // initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full dark:bg-gray-800/50 bg-gray-100/50 border dark:border-gray-700 border-gray-200">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm font-medium dark:text-purple-400 text-purple-600">MY JOURNEY</span>
          </div>
          <h2 className="text-5xl  font-bold dark:text-white text-gray-900">
            Professional <span className="text-purple-500">Experience</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative pl-8 border-l-2 border-purple-500/20 space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 ${theme === 'dark' ? 'border-gray-900' : 'border-white'} transition-all duration-300 ${activeExp === index ? 'bg-purple-500 scale-125' : 'bg-gray-400'}`} />
                    <ExperienceCard
                      experience={exp}
                      index={index}
                      theme={theme}
                      isActive={activeExp === index}
                      onClick={setActiveExp}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 flex flex-col">
            <div className={`flex-grow rounded-3xl p-8 ${glassEffect[theme]} shadow-2xl relative overflow-hidden`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                      <h3 className="text-3xl font-bold dark:text-white text-gray-900">{activeExperience.title}</h3>
                      <p className="text-purple-500 font-medium text-lg">{activeExperience.company_name}</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-500 text-sm font-bold border border-purple-500/20">
                      {activeExperience.date}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {activeExperience.points.map((point, index) => (
                      <div key={index} className="flex items-start gap-4 dark:text-gray-300 text-gray-700">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>

                  {activeExperience.tech && (
                    <div className="flex flex-wrap gap-2">
                      {activeExperience.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-md bg-gray-500/10 text-xs font-medium dark:text-gray-400 text-gray-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons - Placed OUTSIDE AnimatePresence */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrev}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl dark:bg-gray-800 bg-gray-100 hover:bg-purple-500 hover:text-white transition-all active:scale-95"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Previous
              </button>
              
              <div className="flex gap-2">
                {experiences.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${activeExp === i ? 'w-8 bg-purple-500' : 'w-2 bg-gray-500/30'}`} />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl dark:bg-gray-800 bg-gray-100 hover:bg-purple-500 hover:text-white transition-all active:scale-95"
              >
                Next <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionWrapper(Experience, "work");