"use client";

import { Button } from "./ui/button";
import { AfricanPattern } from "./AfricanPattern";
import { motion, type Variants } from "framer-motion";

type ActiveSection = "home" | "about" | "services" | "contact";

interface HeroProps {
  onNavigate: (section: ActiveSection) => void;
}

// Parent container for staggered animations
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Child element animation (fade + slide up)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // "easeOut" equivalent
    },
  },
};

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-transparent overflow-hidden">
      {/* Subtle background pattern overlay */}
      <div className="absolute inset-0 text-amber-600/15">
        <AfricanPattern className="w-full h-full" pattern="geometric" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-16">
        <div className="flex items-center justify-center min-h-[80vh]">
          {/* Motion container for staggered children */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-8 max-w-4xl"
          >
            {/* Accent */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center space-x-3"
            >
              <div className="w-12 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
              <span className="text-stone-600 tracking-wider uppercase">
                East Africa's First Private Digital Asset Wealth Manager
              </span>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full"></div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl lg:text-8xl text-stone-900 tracking-tight leading-tight font-light">
                <span className="text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 bg-clip-text font-normal tracking-wider uppercase">
                  Where Digital Assets 
                </span>
                <span className="block text-stone-900 font-light tracking-normal normal-case">
                  Meet Institutional Trust
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl lg:text-2xl text-stone-600 leading-relaxed max-w-3xl mx-auto"
            >
              East Africa's first Private Digital Asset Management Company, with ambitions to graduate into East Africa's First Publicly listed Digital Asset Treasury Company,
              integrating blockchain technology and AI to revolutionize digital
              asset management, digital corporate finance, digital asset-backed lending solutions and Web3 innovation.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-8 justify-center"
            >
              <Button
                size="lg"
                onClick={() => onNavigate?.("contact")}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg"
              >
                Partner With Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate?.("services")}
                className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full text-lg"
              >
                Explore Services
              </Button>
            </motion.div>

            {/* Decorative dots */}
            <motion.div
              variants={fadeInUp}
              className="pt-12 flex justify-center"
            >
              <div className="flex space-x-3">
                <div className="w-3 h-3 bg-amber-600/40 rounded-full animate-float"></div>
                <div
                  className="w-3 h-3 bg-amber-600/40 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-amber-600/40 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
