// src/components/Contact.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AfricanPattern } from "./AfricanPattern";
import { motion, type Variants } from "framer-motion";
import api from "../api/api";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export function Contact() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await api.post("/contacts", form);
      setStatus({ type: "success", text: "Message sent successfully!" });
      setForm({ first_name: "", last_name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: "Failed to send message. Try again later." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 min-h-[150vh] bg-gradient-to-br from-stone-900 via-amber-900/20 to-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 text-amber-600/8">
        <AfricanPattern className="w-full h-full" pattern="geometric" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info column — unchanged */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                <span className="text-amber-400 tracking-wider uppercase">Get In Touch</span>
              </div>
              <h2 className="text-4xl lg:text-5xl leading-tight">
                Partner with <span className="text-amber-400">Kenya&apos;s Premier Digital Asset Manager</span>
              </h2>
            </div>

            <p className="text-lg text-stone-100 leading-relaxed">
              Whether launching, scaling, or evolving, we empower forward-thinking organizations—enterprises,
              startups, and institutions—to navigate and thrive in the digital asset economy.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg text-white mb-1">Email Us</div>
                  <div className="text-amber-400">connect@btx-capital.com</div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg text-white mb-1">Call Us</div>
                  <div className="text-amber-400"> - </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg text-white mb-1">Visit Us</div>
                  <div className="text-amber-400 space-y-4">
                    <p>
                      <strong>Group Address:</strong> <br />
                      BTX Treasury Group Corp. <br />
                      1007 N Orange St. 4th Floor Suite #4778 <br />
                      Wilmington, Delaware 19801 <br />
                      United States.
                    </p>

                    <p>
                      <strong>Nairobi Address:</strong> <br />
                      BTX Capital Limited <br />
                      Riverside Drive <br />
                      Nairobi, Kenya.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
            <Card className="bg-white/5 border-amber-600/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Connect with Our Experts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-stone-200">First Name</label>
                      <Input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Enter your first name" className="bg-white/10 border-amber-600/30 text-white placeholder:text-stone-400" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-stone-200">Last Name</label>
                      <Input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Enter your last name" className="bg-white/10 border-amber-600/30 text-white placeholder:text-stone-400" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-stone-200">Email Address</label>
                    <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" className="bg-white/10 border-amber-600/30 text-white placeholder:text-stone-400" required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-stone-200">Message</label>
                    <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your digital asset needs, Web3 project, or partnership opportunity..." className="bg-white/10 border-amber-600/30 text-white placeholder:text-stone-400 min-h-[100px]" required />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3">
                    {loading ? "Sending..." : "Send Message"}
                  </Button>

                  {status && (
                    <p className={`text-sm text-center mt-2 ${status.type === "success" ? "text-amber-400" : "text-red-400"}`}>
                      {status.text}
                    </p>
                  )}

                  <p className="text-xs text-stone-400 text-center mt-4">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section (unchanged) */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} className="mt-32 text-center space-y-8 border-t border-amber-600/20 pt-16">
          <h3 className="text-3xl lg:text-4xl text-white">
            Frequently Asked <span className="text-amber-400">Questions</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="text-xl text-amber-400">What services does BTX Capital provide?</h4>
              <p className="text-stone-100">We offer Private Digital Investment Banking, Private Virtual Asset Fund Management, Blockchain & Web3 Advisory, and Web3 Incubation services across Kenya and East Africa. Our Ambition is to be the first listed Virtual Asset Treasury in East Africa subject to regulatory approvals</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl text-amber-400">How do you integrate AI and blockchain?</h4>
              <p className="text-stone-100">We&apos;re the first in Kenya to combine AI with blockchain technology for enhanced transparency, security, and efficiency in digital asset management.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl text-amber-400">Who can benefit from your services?</h4>
              <p className="text-stone-100">Enterprises seeking Web3 transformation, governments exploring blockchain infrastructure, startups needing incubation, and institutions requiring treasury services. We currently do not offer services to retail clients.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl text-amber-400">What makes BTX Capital unique?</h4>
              <p className="text-stone-100">As Kenya&apos;s first private digital asset wealth management company, we are in a good position to be the first publicly listed Virtual Asset Treasury Company after regulatory approval.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
