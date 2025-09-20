"use client";

import { motion, type Variants } from "framer-motion";

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
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-amber-50 to-white px-6 py-20"
    >
      <motion.div
        className="max-w-5xl text-center w-full"
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
          At <span className="font-semibold">BTX Capital</span>, we provide a
          range of financial and investment services designed to help you grow
          and protect your wealth. Explore our tailored solutions below.
        </motion.p>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Investment Advisory",
              desc: "Get expert guidance on building a strong investment portfolio aligned with your financial goals.",
            },
            {
              title: "Wealth Management",
              desc: "Comprehensive strategies to grow, manage, and preserve your assets effectively.",
            },
            {
              title: "Risk Assessment",
              desc: "Identify and manage potential risks to make secure financial decisions.",
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
              title: "Retirement Planning",
              desc: "Plan your retirement efficiently to ensure long-term financial stability.",
            },
            {
              title: "Tax Optimization",
              desc: "Strategize your finances to optimize taxes legally and save more money.",
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
