"use client";

import { Card, CardContent } from "./ui/card";
import { AfricanPattern } from "./AfricanPattern";
import { motion, type Variants } from "framer-motion";

// Container for staggered animations
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

// Fade + slide-up animation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function About() {
  return (
    <section className="pb-16 min-h-[150vh] bg-transparent relative">
      {/* Subtle background patterns */}
      <div className="absolute left-10 w-24 h-24 text-stone-200/10 animate-float">
        <AfricanPattern className="w-full h-full" pattern="tribal" />
      </div>
      <div
        className="absolute bottom-32 right-16 w-32 h-32 text-amber-600/8 animate-float"
        style={{ animationDelay: "3s" }}
      >
        <AfricanPattern className="w-full h-full" pattern="geometric" />
      </div>
      <div className="absolute right-20 top-1/3 w-12 h-12 bg-amber-600/5 rounded-full animate-float"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 pt-4 text-center">
        {/* About Header Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 mb-20"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
              <span className="text-amber-700 tracking-wider uppercase">
                About BTX Capital Limited
              </span>
              <div className="w-8 h-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full"></div>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-6xl text-stone-900 leading-tight"
          >
            East Africa's First Private
            <br />
            <span className="text-amber-700">Virtual Asset Wealth Managment Co.</span>
          </motion.h2>

          <motion.div variants={fadeInUp} className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl text-stone-600 leading-relaxed">
              BTX Capital Limited is a private virtual asset wealth management company incorporated in Kenya,
              with strategic ambitions of evolving into a publicly listed Virtual Asset
              Treasury Company in Kenya.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              We pioneer the integration of blockchain technology and AI in
              fund management—a first in East Africa—setting new standards for
              innovation in the financial sector.
            </p>
          </motion.div>
        </motion.div>

        {/* Core Services */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <motion.div variants={fadeInUp} className="space-y-4 mb-16">
            <h3 className="text-3xl lg:text-4xl text-stone-900">
              Core <span className="text-amber-700">Services</span>
            </h3>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Comprehensive solutions driving the future of digital finance in
              East Africa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[ // turn services into a map for animation
              {
                title: "Digital Investment Banking",
                desc: "Specialized services in crypto fund structuring, tokenized products, and digital asset capital markets.",
              },
              {
                title: "Crypto Fund Management",
                desc: "Institutional-grade portfolio strategies across Bitcoin, Ethereum, Solana, and curated digital indices.",
              },
              {
                title: "Blockchain & Web3 Advisory",
                desc: "Supporting enterprises, governments, and startups in token economics, regulatory navigation, and infrastructure design.",
              },
              {
                title: "Web3 Incubation Hub",
                desc: "Accelerating early-stage blockchain projects through capital, technical mentorship, and strategic partnerships.",
              },
            ].map((service, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-stone-200/50 bg-white/90 backdrop-blur-sm hover:bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <div className="w-8 h-8 bg-amber-600 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="text-xl text-stone-900 mb-3">
                          {service.title}
                        </h4>
                        <p className="text-stone-600 leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategic Advantages */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-16"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-3xl lg:text-4xl text-stone-900">
              Our <span className="text-amber-700">Strategic</span> Advantages
            </h3>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Pioneering the future of digital finance with cutting-edge
              technology and strategic innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                title: "Treasury Security",
                desc: "Robust treasury model ensuring optimal digital asset reserves management and optimization across multiple protocols.",
              },
              {
                title: "AI Integration",
                desc: "First in Kenya to integrate artificial intelligence with blockchain technology for enhanced transparency and efficiency.",
              },
              {
                title: "Regional Pioneer",
                desc: "Trailblazing digital financial innovation, positioning East Africa at the forefront of the global crypto economy.",
              },
            ].map((adv, i) => (
              <motion.div key={i} variants={fadeInUp} className="space-y-6 group">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <div className="w-10 h-10 bg-amber-600 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl text-stone-900">{adv.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{adv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-24 space-y-8"
        >
          <motion.div
            variants={fadeInUp}
            className="w-16 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full mx-auto"
          />
          <motion.blockquote
            variants={fadeInUp}
            className="text-2xl lg:text-3xl text-stone-700 italic leading-relaxed max-w-4xl mx-auto"
          >
            "Building the bridge between traditional finance and the digital
            economy, one innovation at a time."
          </motion.blockquote>
          <motion.p
            variants={fadeInUp}
            className="text-amber-700 tracking-wider"
          >
            — BTX Capital Limited
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
