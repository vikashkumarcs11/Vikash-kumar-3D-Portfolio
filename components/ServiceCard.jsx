import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {

  FaArrowRight,
  FaTimes,
  FaStar,

} from 'react-icons/fa';
import Link from "next/link";
import { SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTailwindcss, SiFramer } from 'react-icons/si';
import { fadeIn, textVariant } from "../utils/motion";
const projectsData = [


{
  id: 1,
  image: "/assets/image/dehati.png",
  images: [
    "/assets/image/dehati.png",
  ],
  tech: ["React", "Node.js", "MongoDB", "Express", "Responsive"],
  techIcons: [SiReact, SiJavascript, SiTailwindcss],
  title: "Dehati E-Commerce",
  description: "A rural-focused e-commerce platform offering pure and quality grocery products with features like search, cart, COD, and regional availability support.",
  category: "E-Commerce",
  githubLink: "#",
  liveLink: "https://www.dehatimall.online",
  color: "from-orange-500 to-yellow-500",
  accentColor: "bg-gradient-to-r from-orange-500 to-yellow-500",
  featured: true,
  year: "2025",
  stats: {
    complexity: 80,
    impact: 85,
    innovation: 78
  }
},

{
  id: 2,
  image: "/assets/image/anarya.png",
  images: [
    "/assets/image/anarya.png",
  ],
  tech: ["React",  "Tailwind CSS", "Responsive"],
  techIcons: [SiReact, SiJavascript, SiTailwindcss],
  title: "Anarya Open University",
  description: "A modern educational platform providing online courses, degree programs, and multilingual support (Hindi & English) with a focus on accessible and holistic learning.",
  category: "Education",
  githubLink: "#",
  liveLink: "https://www.anaryauniversity.online/",
  color: "from-blue-500 to-indigo-600",
  accentColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
  featured: true,
  year: "2026",
  stats: {
    complexity: 82,
    impact: 88,
    innovation: 80
  }
},



  {
    id: 3,
    image: "/assets/image/library.png",
    images: [
      "/assets/image/library.png",

    ],
    tech: ["React",  "MongoDB",],
    techIcons: [SiReact, SiNodedotjs, SiMongodb],
    title: "Library Management System",
    description: "A comprehensive digital library solution with real-time tracking, automated inventory, and advanced analytics dashboard for educational institutions.",
    category: "Full Stack",
    githubLink: "#",
    liveLink: "https://gt-library-management.vercel.app/",
    color: "from-cyan-500 to-blue-600",
    accentColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    featured: true,
    year: "2024",
    stats: {
      complexity: 95,
      impact: 90,
      innovation: 85
    }
  },
  {
    id: 4,
    image: "/assets/image/e-commoras.png",
    images: [
      "/assets/image/e-commoras.png",

    ],
    tech: ["Next.js", "TypeScript", "Stripe", "Firebase", "Tailwind"],
    techIcons: [SiNextdotjs, SiTypescript, SiTailwindcss],
    title: "Suppkart E-Commerce",
    description: "Enterprise-grade e-commerce platform with real-time inventory, payment processing, and advanced customer analytics.",
    category: "E-Commerce",
    githubLink: "#",
    liveLink: "https://suppkart-e-commerce.netlify.app/",
    color: "from-purple-500 to-pink-600",
    accentColor: "bg-gradient-to-r from-purple-500 to-pink-600",
    featured: true,
    year: "2024",
    stats: {
      complexity: 92,
      impact: 95,
      innovation: 88
    }
  },
  {
    id: 5,
    image: "/assets/image/Fast Food.png",
    images: [
      "/assets/image/Fast Food.png",

    ],
    tech: ["React", "Framer Motion", "Context API", "UI/UX", "PWA"],
    techIcons: [SiReact, SiFramer, SiJavascript],
    title: "Fast Food Go",
    description: "Ultra-fast food ordering PWA with real-time updates, cart management, and seamless checkout experience.",
    category: "Frontend",
    githubLink: "#",
    liveLink: "https://fast-food-green.netlify.app/",
    color: "from-orange-500 to-red-600",
    accentColor: "bg-gradient-to-r from-orange-500 to-red-600",
    year: "2023",
    stats: {
      complexity: 85,
      impact: 90,
      innovation: 92
    }
  },
  {
    id: 6,
    image: "/assets/image/school.png",
    images: [
      "/assets/image/school.png",

    ],
    tech: ["React", "Chart.js", "D3.js", "Material-UI", "Responsive"],
    techIcons: [SiReact, SiJavascript, SiTailwindcss],
    title: "EduStream Analytics",
    description: "Advanced educational dashboard with real-time student analytics, performance tracking, and interactive data visualization.",
    category: "Dashboard",
    githubLink: "#",
    liveLink: "https://school-demo-vkr.netlify.app/",
    color: "from-emerald-500 to-teal-600",
    accentColor: "bg-gradient-to-r from-emerald-500 to-teal-600",
    featured: true,
    year: "2023",
    stats: {
      complexity: 88,
      impact: 85,
      innovation: 90
    }
  },
  {
    id: 7,
    image: "/assets/image/travel.png",
    images: [
      "/assets/image/travel.png",

    ],
    tech: ["Next.js", "TypeScript", "Mapbox", "Prisma", "PostgreSQL"],
    techIcons: [SiNextdotjs, SiTypescript, SiNodedotjs],
    title: "Travel Explorer Pro",
    description: "AI-powered travel planning platform with destination discovery, itinerary generation, and booking system.",
    category: "Full Stack",
    githubLink: "#",
    liveLink: "#",
    color: "from-indigo-500 to-purple-600",
    accentColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
    year: "2024",
    stats: {
      complexity: 96,
      impact: 88,
      innovation: 95
    }
  },
  
];

const categories = ["All", "Full Stack", "E-Commerce", "Frontend", "Dashboard", "Mobile"];

const techStack = [
  { name: "React", icon: SiReact, color: "text-cyan-400", count: 5 },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400", count: 1 },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white", count: 1 },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-400", count: 5 },
  { name: "MongoDB", icon: SiMongodb, color: "text-emerald-400", count: 5 },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-teal-400", count: 5 },
  { name: "Framer", icon: SiFramer, color: "text-pink-400", count: 3 },
];

export default function UltimatePortfolioShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: 15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500" />


      </div>

      <section ref={containerRef} className="relative py-6 px-4  md:px-6 min-h-screen text-white overflow-hidden">
        <div className="md:px-20 px:10 mx-auto relative z-10">


          {/* Tech Stack Overview */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16"
          >

            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 px-2 py-3 rounded-xl bg-white/5 border  border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all group"
                >
                  <tech.icon className={`${tech.color} text-2xl`} />
                  <div className="">
                    <div className="font-semibold text-white">{tech.name} </div>
                    <div className="text-xs text-slate-400">{tech.count}.projects</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Projects Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <motion.div
                variants={textVariant()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <p className={"sectionSubText"}>My work</p>
                <h2 className={"sectionHeadText"}>Projects.</h2>
              </motion.div>

              <div className="w-full flex">
                <motion.p
                  variants={fadeIn("", "", 0.1, 1)}
                  className="mt-3 dark:text-ctnSecondaryDark text-ctnSecondaryLight text-[17px] max-w-3xl leading-[30px]"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                >
                  These projects showcase my practical skills and experience, each with
                  descriptions and links to code repositories and live demos. They
                  demonstrate my ability to handle complex challenges, adapt to
                  different technologies, and oversee projects from start to finish.
                </motion.p>
              </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 hidden md:black">
                <FaStar className="text-yellow-500" />
                <span className="text-sm">Premium Selection</span>
              </div>
            </div>

          </motion.div>


          {/* All Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}

            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="dark:bg-bgSecondaryDark bg-bgSecondaryLight rounded-2xl  shadow-sm shadow-primary group relative cursor-pointer"



              >
<a href={project.liveLink} target="_blank" rel="noopener noreferrer">                {/* 3D Card Effect */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/30 to-black/30 border border-white/10 backdrop-blur-lg transition-all duration-500 group-hover:border-cyan-500/40 group-hover:shadow-xl group-hover:shadow-cyan-500/10 h-full transform-style-3d perspective-1000">

                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />

                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      loading="lazy"
                      quality={82}
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 ${project.color} opacity-30 mix-blend-overlay`} />

                    {/* Tech Icons */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {project.techIcons?.slice(0, 3).map((Icon, index) => (
                        <div
                          key={index}
                          className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10"
                        >
                          <Icon className="text-white text-lg" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${project.accentColor}`}>
                            {project.category}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <span className="text-3xl font-black text-slate-700 group-hover:text-slate-600">
                        {project.id}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/5 rounded text-xs text-cyan-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}

                    </div>
                  </div>
                </div>
                </a>
              </motion.div>
            ))}
          </motion.div>


        </div>




      </section >

      {/* Add to tailwind.config.js or style tag */}
      < style jsx > {`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style >
    </>
  );
}



{/* <Tilt className="w-[250px]" tiltMaxAngleX="10" tiltMaxAngleY="10">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div options={{
            max: 45, 
            scale: 1,
            speed: 450,
          }}
          className="dark:bg-bgSecondaryDark bg-bgSecondaryLight rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <div className="w-16 h-16 object-contain relative">{icon}</div>
          <h3 className="dark:text-ctnPrimaryDark text-ctnPrimaryLight text-[20px] font-bold text-center w-[80%]">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt> */}