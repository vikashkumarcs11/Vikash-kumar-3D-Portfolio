"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon, description }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className=" px-[1px] py-[1px] rounded-[20px] shadow-card  border border-violet-500/20 bg-gradient-to-b from-violet-500/10 to-transparent backdrop-blur-sm"
  >
    <div className="bg-bgSecondaryDark dark:bg-[#151030] rounded-[20px] py-5 px-4 min-h-[200px] flex justify-evenly items-center flex-col">
      <h3 className="text-white text-[17px] font-bold text-center">
        {title}
      </h3>
      <p className=" text-[14px] text-center  opacity-80">
        {description}
      </p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>

      

        <motion.div variants={textVariant()} className="md:px-20 md:w-2/3  ">
          <p className="text-violet-500 font-mono  text-sm tracking-widest uppercase mb-2">
            Introduction
          </p>
          <h2 className="text-4xl md:text-6xl font-black dark:text-white text-slate-900">
            Overview<span className="text-violet-500">.</span>
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] md:px-20 md:w-3/4 leading-[30px]  dark:text-gray-300 text-slate-600"
        >
          I&apos;m a{" "}
          <span className="text-white font-semibold">Full Stack Developer</span>{" "}
          currently working full-time at{" "}
          <span className="text-violet-500 font-bold">Ajeevak Nidhi Limited</span>,
          where I build and maintain scalable web applications using React.js, Node.js,
          and REST APIs. I specialize in the{" "}
          <span className="text-white font-semibold">MERN Stack</span> with hands-on
          experience in JWT authentication, role-based access control, and frontend
          performance optimization — reducing page load time by{" "}
          <span className="text-violet-400 font-semibold">30%</span> in production.
        </motion.p>

        <motion.p
          variants={fadeIn("", "", 0.2, 1)}
          className="mt-4 text-secondary text-[17px] md:px-20 md:w-3/4 leading-[30px] dark:text-gray-300 text-slate-600"
        >
          From intern to full-time developer, I&apos;ve shipped real projects —
          a multilingual university platform, a Dehati e-commerce app, and a Library
          Management System — all with clean UI, smooth animations using{" "}
          <span className="text-white font-semibold">Framer Motion &amp; GSAP</span>,
          and full admin control. I&apos;m a quick learner who loves solving real-world
          problems — one clean commit at a time.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 md:px-20  sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <ServiceCard
            index={0}
            title="Frontend Developer"
            description="React.js, Next.js, Framer Motion & Tailwind CSS for pixel-perfect UI."
          />
          <ServiceCard
            index={1}
            title="Backend Developer"
            description="Robust Node.js & Express APIs with secure JWT authentication."
          />
          <ServiceCard
            index={2}
            title="Database Management"
            description="Designing scalable schemas in MongoDB, MySQL, and PostgreSQL."
          />
          <ServiceCard
            index={3}
            title="Problem Solver"
            description="Optimizing performance and implementing complex CRUD operations."
          />
        </div>
     
    </>
  );
};

export default SectionWrapper(About, "about");