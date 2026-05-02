"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, memo, useCallback } from "react";
import { useTheme } from "next-themes";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "@/utils/motion";

const Skill3DCard = memo(function Skill3DCard({ skill, theme }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      // Sirf hovered card hi rotate aur scale hoga
      animate={{
        rotateX: isHovered ? mousePosition.y : 0,
        rotateY: isHovered ? mousePosition.x : 0,
        scale: isHovered ? 1.15 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10" // Taaki hover wala card upar dikhe
      style={{ perspective: "1000px" }}
    >
      <Link href={skill.link || "#"} target="_blank" className="block relative">
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">

          {/* Glowing Shadow: Sirf hover hone par dikhega */}
          <div
            className={`absolute inset-0 rounded-2xl  transition-opacity duration-300 blur-xl ${isHovered ? "opacity-60" : "opacity-0"
              }`}
            style={{
              background: `linear-gradient(135deg, ${skill.color || '#805def'}, ${skill.color2 || '#4f46e5'})`
            }}
          />

          {/* Icon Container */}
          <div className={`relative w-full h-full rounded-2xl p-3 flex items-center justify-center backdrop-blur-md transition-colors duration-300
            ${theme === 'dark'
              ? (isHovered ? 'bg-gray-800/80 border-violet-500/50' : 'bg-gray-900/40 border-white/5')
              : (isHovered ? 'bg-white border-violet-400' : 'bg-white/50 border-gray-200')}
            border shadow-lg`}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src={skill.icon}
                alt={skill.name}
                fill
                sizes="(max-width: 768px) 40px, 48px"
                loading="lazy"
                className="object-contain"
              />
            </div>
          </div>


          {/* Tooltip: Icon ke samne (Center mein) */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center pb-20  z-50 pointer-events-none"
            >
              <div className="bg-black/80 dark:bg-violet-600/90 backdrop-blur-sm mb-5  text-white text-[11px] px-3 py-1 rounded-full shadow-xl whitespace-nowrap font-bold border border-white/20">
                {skill.name}
              </div>
            </motion.div>

          )}
        </div>
      </Link>
    </motion.div>
  );
});

function Tech() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const categories = [
    { title: "Languages", items: technologies.languages },
    { title: "Frameworks", items: technologies.frameworks },
    { title: "Libraries", items: technologies.libraries },
    { title: "Databases", items: technologies.databases },
    { title: "Tools", items: technologies.tools },
    { title: "Environments", items: technologies.environments },
  ];

  if (!mounted) return null;

  return (
    <section className="w-full py-20 px-4 md:px-8" id="skills">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-violet-500 font-mono text-sm tracking-widest uppercase mb-2">Technical Proficiency</p>
        <h2 className="text-4xl md:text-6xl font-black dark:text-white text-slate-900">
          My Tech Stack<span className="text-violet-500">.</span>
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            initial="hidden"
            whileInView="show"
            className={`p-8 rounded-[35px] border backdrop-blur-sm dark:bg-bgSecondaryDark bg-bgSecondaryLight relative overflow-hidden group
              ${theme === 'dark' ? 'dark:bg-bgSecondaryDark bg-bgSecondaryLight' : 'dark:bg-bgSecondaryDark bg-bgSecondaryLight shadow-xl'}`}
          >
            <h3 className="text-xl font-bold mb-8 dark:text-white text-slate-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-violet-500 rounded-full inline-block" />
              {category.title}
            </h3>

            {/* Grid for Icons */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 place-items-center dark:bg-bgSecondaryDark bg-bgSecondaryLight">
              {category.items.map((skill) => (
                <Skill3DCard key={skill.name} skill={skill} theme={theme} />
              ))}
            </div>

            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.9] dark:opacity-[0.9] pointer-events-none">
              <span className="text-2xl font-black">{index + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>




 
    </section> 
  );
}

export default SectionWrapper(Tech, "tech");