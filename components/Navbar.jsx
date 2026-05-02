"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";
import dynamic from "next/dynamic";


// Dynamic import for react-scroll to prevent SSR issues
const ScrollLink = dynamic(
  () => import("react-scroll").then((mod) => mod.Link),
  { ssr: false }
);

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: 'Home', to: 'home' }, // Fixed casing to match your sections
    { name: 'Portfolio', to: 'portfolio' },
    { name: 'Experience', to: 'experience' },
    { name: 'About', to: 'about' },
    { name: 'Contact', to: 'contact' }
  ];

  const socialLinks = [
    { Icon: FaLinkedin, href: "https://www.linkedin.com/in/vikash-kumar-gt/", color: "hover:text-blue-500" },
    { Icon: FaGithub, href: "https://github.com", color: "hover:text-gray-300" },
    { Icon: FaTelegram, href: "https://t.me/vikashhappy", color: "hover:text-sky-500" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background change logic
      setScrolled(window.scrollY > 50);

      // Progress bar logic
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
      ? 'bg-cyan-950/30 backdrop-blur-md  py-2'
      : 'bg-transparent py-2'
      }`}>

      {/* Top Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[3px]  bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container md:mx-auto pl-5    md:px-12">
        <div className="flex items-center  ">

          {/* Logo Section */}

          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative w-16 h-16">
              <div className="relative w-full h-full rounded-full border-2 border-slate-700 overflow-hidden group-hover:border-cyan-500/50 transition-colors">
                <Image
                  src="/assets/myphoto.jpg"
                  width={70}
                  height={70}
                  sizes="70px"
                  priority
                  alt="Vikash Kumar"
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Vikash<span className="text-cyan-400">.</span>
              </h1>
              <p className="text-[15px] uppercase tracking-[0.2em] text-slate-500 font-bold group-hover:text-slate-400 transition-colors">
                Developer
              </p>
            </div>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-auto bg-slate-900/40 border border-slate-800/50 rounded-full px-2 py-1 backdrop-blur-sm">
            {navItems.map((item) => (
              <ScrollLink
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-100}
                activeClass="bg-slate-800 text-cyan-400"
                className="px-5 py-2 rounded-full cursor-pointer text-slate-400 hover:text-white text-sm font-semibold transition-all duration-300"
              >
                {item.name}
              </ScrollLink>
            ))}
          </div>


          {/* Mobile Menu Toggle */}
          <button onClick={() => setShow(!show)}
            className="md:hidden ml-auto w-10 h-10 absolute right-5 top-6 flex items-center justify-center rounded-xl text-white"
          >
            {show ? <IoCloseSharp size={24} /> : <AiOutlineBars size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/30 backdrop-blur-md border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  onClick={() => setShow(false)}
                  className="text-xl font-bold text-slate-400 hover:text-white transition-colors"
                  activeClass="text-cyan-400"
                >
                  {item.name}
                </ScrollLink>
              ))}

              <div className="pt-6 border-t border-slate-400 flex items-center justify-between">
                <div className="flex space-x-4">
                  {socialLinks.map((social, i) => (
                    <a key={i} href={social.href} className={`text-slate-400 ${social.color} transition-colors`}>
                      <social.Icon size={24} />
                    </a>
                  ))}
                </div>
                <p className="text-[10px] text-slate-300 font-mono tracking-widest uppercase">Available for work</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;