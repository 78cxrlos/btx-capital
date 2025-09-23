"use client";

import { AfricanPattern } from "./AfricanPattern";
import { Linkedin, Twitter } from "lucide-react";
import { motion, type Variants } from "framer-motion";

type ActiveSection = "home" | "about" | "services" | "contact";

interface FooterProps {
  onNavigate: (section: ActiveSection) => void;
}

// Animation Variants
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-900 via-stone-800 to-amber-900 overflow-hidden">
      {/* African pattern overlay */}
      <div className="absolute inset-0 text-amber-600/5 -z-20">
        <AfricanPattern className="w-full h-full" pattern="tribal" />
      </div>

      {/* Flowing wave background */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="w-full h-full text-amber-700/10"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z"
            className="opacity-50 animate-wave-1"
          />
          <path
            d="M0,120 L0,80 Q200,20 400,80 Q600,140 800,80 Q1000,20 1200,80 L1200,120 Z"
            className="opacity-30 animate-wave-2"
          />
        </svg>
      </div>

      {/* Central content */}
      <motion.footer
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex flex-col items-center justify-center text-center space-y-12 px-6 lg:px-16"
      >
        {/* Logo + tagline */}
        <motion.div variants={fadeInUp} className="space-y-4">
          <div className="text-6xl md:text-7xl font-extrabold text-white tracking-wider">
            BTX<span className="text-amber-400">Capital</span>
          </div>
          <p className="text-amber-400 uppercase font-semibold tracking-wider md:text-lg">
            East Africa's First Private Digital Asset Management Company with strategic ambitions of evolving into East Africa's First Publicly Listed Digital Asset
              Treasury Company.          </p>
        </motion.div>

        {/* Navigation links */}
        <motion.div
          variants={container}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-lg font-medium text-amber-200"
        >
          {["home", "about", "services", "contact"].map((section) => (
            <motion.button
              key={section}
              variants={fadeInUp}
              onClick={() => onNavigate(section as ActiveSection)}
              className="hover:text-white transition-colors duration-300"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div variants={container} className="flex space-x-6">
          <motion.a
            variants={scaleIn}
            href="https://linkedin.com/company/btx-capital"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-amber-600/20 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-600/30 hover:scale-110 transition-all duration-300"
          >
            <Linkedin size={28} />
          </motion.a>
          <motion.a
            variants={scaleIn}
            href="https://twitter.com/btxcapital"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-amber-600/20 rounded-full flex items-center justify-center text-amber-400 hover:bg-amber-600/30 hover:scale-110 transition-all duration-300"
          >
            <Twitter size={28} />
          </motion.a>
        </motion.div>

        {/* Bottom copyright */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 border-t border-amber-500/20 pt-6 text-amber-300 text-sm"
        >
          © 2025 BTX Capital Limited. All rights reserved.
        </motion.div>
      </motion.footer>
    </div>
  );
}
