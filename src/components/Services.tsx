"use client";

import { motion, type Variants } from "framer-motion";
import { AfricanPattern } from "./AfricanPattern";

const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="min-h-screen flex flex-col items-center justify-start bg-transparent relative overflow-hidden px-6 py-20"
    >
      {/* Full subtle background pattern overlay */}
      <div className="absolute inset-0 text-amber-600/15 pointer-events-none">
        <AfricanPattern className="w-full h-full" pattern="geometric" />
      </div>

      <motion.div
        className="max-w-5xl text-center w-full relative z-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Title */}
        <motion.h2
          variants={item}
          className="text-4xl font-bold text-amber-700 mb-6"
        >
          Our Services
        </motion.h2>

        {/* Intro Text */}
        <motion.p variants={item} className="text-lg text-stone-700 mb-12">
          At <span className="font-semibold">BTX Capital</span>, we provide a range of financial and investment services to private clients, 
          enterprises, and institutional investors who demand security, sophistication, and strategic digital asset exposure. 
          Explore our tailored solutions below.
        </motion.p>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Digital Asset Management",
              desc: "We provide secure, institutional-grade management of digital asset portfolios tailored for private clients seeking long-term value and strategic exposure.",
            },
            {
              title: "Digital Corporate Finance",
              desc: "We structure and execute innovative capital solutions using tokenized assets, smart contracts, and blockchain rails to modernize fundraising, M&A, and corporate restructuring.",
            },
            {
              title: "Digital Asset-Backed Lending",
              desc: "We offer bespoke credit solutions where clients can unlock liquidity by using their digital assets—such as Bitcoin, Ethereum, or tokenized securities—as collateral.",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-amber-700 mb-3">
                {service.title}
              </h3>
              <p className="text-stone-600 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Extra Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              title: "Web3 Innovation",
              desc: "We empower enterprises to navigate and capitalize on Web3 through strategic advisory, token design, smart contract architecture, and decentralized infrastructure deployment.",
            },
            {
              title: "Digital Asset Treasury",
              desc: "We intend to become East Africa’s first Digital Asset Treasury (DAT)—building a blockchain-native treasury through strategic allocation in Digital Assets and yield-generating protocols, with a strong focus on governance, risk, and compliance.",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-amber-700 mb-3">
                {service.title}
              </h3>
              <p className="text-stone-600 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* More details */}
        <motion.div variants={item} className="text-left mb-20">
          <h3 className="text-2xl font-semibold text-amber-700 mb-4">
            Why Choose Us?
          </h3>
          <ul className="list-disc list-inside text-stone-700 space-y-2">
            <li>Experienced team of financial advisors and investment experts.</li>
            <li>Personalized solutions tailored to your goals.</li>
            <li>Transparent and ethical practices.</li>
            <li>Continuous monitoring and portfolio adjustments.</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
