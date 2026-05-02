"use client";

import dynamic from "next/dynamic";
import { memo } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

import { fadeIn, textVariant } from "@/utils/motion";
import { heroTexts } from "@/constants";
import { DiMongodb } from "react-icons/di";
import { FaLinkedin, FaGithub, FaTelegram, FaFacebook, FaYoutube, FaReact } from "react-icons/fa";

import { SiExpress, SiTailwindcss, SiNodedotjs } from "react-icons/si";

import { TbBrandJavascript } from "react-icons/tb";

const ComputersCanvas = dynamic(() => import("./canvas/Computers"), {
	ssr: false,
	loading: () => (
		<div className="absolute inset-0" aria-hidden />
	),
});

const heroTechIcons = [
	{
		Icon: FaReact,
		label: "React",
		color: "text-cyan-400",
	},
	{
		Icon: TbBrandJavascript,
		label: "JavaScript",
		color: "text-yellow-400",
	},
	{
		Icon: SiNodedotjs,
		label: "Node.js",
		color: "text-green-400",
	},
	{
		Icon: SiExpress,
		label: "Express",
		color: "text-gray-300",
	},
	{
		Icon: DiMongodb,
		label: "MongoDB",
		color: "text-green-400",
	},
	{
		Icon: SiTailwindcss,
		label: "Tailwind",
		color: "text-sky-400",
	},
];

const heroSocialLinks = [
	{
		Icon: FaLinkedin,
		href: "https://www.linkedin.com/in/vikash-kumar-gt/",
		color: "hover:text-blue-400",
		label: "LinkedIn",
	},
	{
		Icon: FaGithub,
		href: "https://github.com",
		color: "hover:text-gray-300",
		label: "GitHub",
	},
	{
		Icon: FaTelegram,
		href: "https://t.me/vikashhappy",
		color: "hover:text-sky-400",
		label: "Telegram",
	},
	{
		Icon: FaFacebook,
		href: "https://www.facebook.com/profile.php?id=100006169817486",
		color: "hover:text-blue-500",
		label: "Facebook",
	},
	{
		Icon: FaYoutube,
		href: "#",
		color: "hover:text-red-500",
		label: "YouTube",
	},
];

function Hero({ loading, isMobile }) {
  return (
    <section className="relative w-full min-h-screen md:h-[800px] flex flex-col  items-center justify-center mx-auto px-6 gap-10">



      <motion.div
        variants={fadeIn("up", "spring")}
        initial="hidden"
        whileInView={!loading && "show"}
        viewport={{ once: true, amount: 0.25 }}
        className="md:w-2/3 w-full md:h-[750px] sm:h-[300px] h-[220px] md:ml-[620px] top-[10%]   absolute md:top-[150px] "
      >
        <ComputersCanvas isMobile={isMobile} />
      </motion.div>







      <div className="absolute top-[250px] md:top-[140px] left-0 md:left-[5%]  max-w-2xl  flex flex-row items-start gap-5">

        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-primary" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView={!loading && "show"}
          viewport={{ once: true, amount: 0.25 }}
        >
          <h1 className={`heroHeadText`}>
            Hi, I&apos;m{" "}
            <span className="dark:text-five text-primary">Vikash</span>
          </h1>



          <p className={`heroSubText mt-2 tracking-wide`}>
            <TypeAnimation
              sequence={heroTexts}
              // preRenderFirstString={true}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </p>





          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}

            className="mt-6 text-gray-200 text-base md:text-lg leading-relaxed"
          >
            Hi, I&apos;m a passionate <span className="text-cyan-400 font-semibold">BCA graduate</span> specializing in modern web development.
            I build exceptional digital experiences using <span className="text-blue-400">React</span>,{' '}
            <span className="text-green-400">Node.js</span>, and cutting-edge technologies.
            Let&apos;s turn your ideas into reality!


          </motion.p>




          {/* Tech Stack & Socials */}
          <div className="mt-5 space-y-5">
            {/* Currently Working On */}
            <div className="space-y-4 mb-10">
              <h3 className="text-gray-200 font-medium tracking-wider flex items-center justify-center lg:justify-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                CURRENTLY WORKING WITH
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {heroTechIcons.map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group-hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <tech.Icon className={`w-8 h-8 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {tech.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-gray-200 font-medium tracking-wider flex items-center justify-center lg:justify-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                CONNECT WITH ME
              </h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {heroSocialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`relative group ${social.color} transition-colors duration-300`}
                    aria-label={social.label}
                  >
                    <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-full p-3 border border-gray-800 group-hover:border-current transition-all duration-300">
                      <social.Icon className="w-6 h-6 text-gray-400 group-hover:text-current transition-colors duration-300" />
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {social.label}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div> 


           <Link
                  href="document/vikash_kumar.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit"
                >
                  <div className="btn w-fit mt-10 bg-tertiary text-white px-7 py-2 rounded-md overflow-hidden relative cursor-pointer">
                    <div className="original bg-primary text-white px-7 py-2">
                      Resume
                    </div>
                    <div className="letters">
                      <span>R</span>
                      <span>e</span>
                      <span>s</span>
                      <span>u</span> 
                      <span>m</span>
                      <span>e</span>
                    </div>
                  </div>
                </Link>
        </motion.div>

       
      </div >




    </section >
  );
}

export default memo(Hero);
