"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AfricanPattern } from "./AfricanPattern";

// Define NewsItem type
interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category?: string;
  isPdf?: boolean;
  pdfUrl?: string;
}

export function News() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsItems: NewsItem[] = []; // Will be populated later

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Framer Motion Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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

  if (selectedNews) {
    return (
      <section className="pt-8 pb-16 min-h-screen bg-transparent relative overflow-hidden">
        {/* Full subtle background pattern overlay */}
        <div className="absolute inset-0 text-amber-600/15 pointer-events-none">
          <AfricanPattern className="w-full h-full" pattern="geometric" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8"
        >
          <motion.div variants={fadeInUp}>
            <Button
              onClick={() => setSelectedNews(null)}
              variant="outline"
              className="mb-8 border-amber-600/20 text-amber-700 hover:bg-amber-50"
            >
              ← Back to News
            </Button>
          </motion.div>

          <motion.article className="space-y-8" variants={container}>
            <motion.header className="space-y-4" variants={fadeInUp}>
              {selectedNews.category && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  {selectedNews.category}
                </Badge>
              )}
              <h1 className="text-4xl lg:text-5xl leading-tight text-stone-900">
                {selectedNews.title}
              </h1>
              <div className="flex items-center space-x-4 text-stone-600">
                <span>{formatDate(selectedNews.date)}</span>
                <span>•</span>
                <span>{selectedNews.readTime}</span>
              </div>
            </motion.header>

            {selectedNews.isPdf && selectedNews.pdfUrl && (
              <motion.div
                className="bg-amber-50 border border-amber-200 rounded-lg p-6"
                variants={fadeInUp}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-stone-900">
                    Download Full Report
                  </h3>
                  <Button
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => window.open(selectedNews.pdfUrl, "_blank")}
                  >
                    Download PDF
                  </Button>
                </div>
              </motion.div>
            )}

            <motion.div
              className="prose prose-lg max-w-none prose-stone"
              variants={fadeInUp}
            >
              {selectedNews.content ? (
                selectedNews.content.split("\n\n").map((p, i) => (
                  <p key={i} className="text-stone-700 leading-relaxed mb-6">
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-stone-500">No content yet.</p>
              )}
            </motion.div>
          </motion.article>
        </motion.div>
      </section>
    );
  }

  // News List View
  return (
    <section className="pt-8 pb-16 min-h-screen bg-transparent relative overflow-hidden">
      {/* Full subtle background pattern overlay */}
      <div className="absolute inset-0 text-amber-600/15 pointer-events-none">
        <AfricanPattern className="w-full h-full" pattern="geometric" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div className="text-center space-y-6 mb-16" variants={fadeInUp}>
          <h1 className="text-4xl lg:text-6xl leading-tight text-stone-900">
            BTX Capital <span className="text-amber-600">Insights</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest developments in crypto treasury
            management, blockchain innovation, and Web3 advancement across Kenya
            and East Africa.
          </p>
        </motion.div>

        {/* Articles */}
        {newsItems.length === 0 ? (
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/60 backdrop-blur-sm border-amber-200/30">
              <CardContent className="p-6 text-center text-stone-500">
                No articles available yet.
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={container}
          >
            {newsItems.map((news) => (
              <motion.div key={news.id} variants={fadeInUp}>
                <Card
                  className="bg-white/60 backdrop-blur-sm border-amber-200/30 hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedNews(news)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight text-stone-900">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-600 mb-4">{news.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-stone-500">
                      <span>{formatDate(news.date)}</span>
                      <span>{news.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
