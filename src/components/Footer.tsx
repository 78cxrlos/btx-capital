"use client";

import { AfricanPattern } from "./AfricanPattern";
import { Linkedin, Twitter } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import btxGroupImage from "../assets/btxgroup.jpeg";

type ActiveSection = "home" | "about" | "services" | "news" | "contact";

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
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-900 via-stone-800 to-black overflow-hidden font-[Poppins]">
      {/* African pattern overlay */}
      <div className="absolute inset-0 text-white/5 -z-20">
        <AfricanPattern className="w-full h-full" pattern="tribal" />
      </div>

      {/* Flowing wave background */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="w-full h-full text-white/10"
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
        <motion.div
          variants={fadeInUp}
          className="space-y-6 flex flex-col items-center"
        >
          <motion.div variants={scaleIn} className="relative w-64 md:w-80">
            {/* Glow background */}
            <div className="absolute inset-0 rounded-2xl bg-white/10 blur-2xl -z-10" />

            {/* Logo */}
            <img
              src={btxGroupImage}
              alt="BTX Group Logo"
              className="w-full rounded-2xl object-contain shadow-xl hover:scale-105 hover:shadow-white/40 transition-transform duration-500 ease-out"
            />
          </motion.div>

          {/* Animated tagline */}
          <p className="text-white uppercase font-semibold tracking-wider md:text-lg max-w-3xl bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent animate-gradient-x">
            East Africa's First Private Digital Asset Management Company with
            strategic ambitions of evolving into East Africa's First Publicly
            Listed Digital Asset Treasury Company.
          </p>
        </motion.div>

        {/* Navigation links */}
        <motion.div
          variants={container}
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-lg font-medium text-white"
        >
          {["home", "about", "services", "news", "contact"].map((section) => (
            <motion.button
              key={section}
              variants={fadeInUp}
              onClick={() => {
                if (section === "contact") {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  onNavigate(section as ActiveSection);
                }
              }}
              className="relative group"
            >
              <span className="transition-colors duration-300 group-hover:text-gray-200">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
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
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          >
            <Linkedin size={28} />
          </motion.a>
          <motion.a
            variants={scaleIn}
            href="https://twitter.com/btxcapital"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          >
            <Twitter size={28} />
          </motion.a>
        </motion.div>

        {/* Bottom copyright */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 border-t border-white/20 pt-6 text-white/80 text-sm"
        >
          © 2025 BTX Capital Limited. All rights reserved.
        </motion.div>
      </motion.footer>
    </div>
  );
}
