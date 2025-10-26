// src/components/News.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AfricanPattern } from "./AfricanPattern";
import api from "../api/api";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category?: string;
  isPdf?: boolean;
  pdfUrl: string | null;
}

export function News() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/news");
      const items = (res.data || []).map((n: any) => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        date: n.date || n.created_at || n.createdAt,
        readTime:
          n.readTime ||
          (n.read_time ? `${n.read_time} min read` : "1 min read"),
        category: n.category,
        isPdf: Boolean(n.pdf_url || n.pdfUrl),
        pdfUrl: n.pdf_url || n.pdfUrl || null,
      }));
      setNewsItems(items);
    } catch (err) {
      console.error("Failed to load news", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Disable body scroll when overlay is open
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedNews]);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // FULL-SCREEN ARTICLE OVERLAY - SCROLLABLE WITH STICKY BACK BUTTON
  if (selectedNews) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 overflow-y-auto">
        <div className="flex items-start justify-center min-h-screen p-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white dark:bg-gray-900 max-w-4xl w-full rounded-2xl shadow-2xl p-10 relative"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* STICKY BACK BUTTON */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 z-20 pt-4 pb-4">
              <Button
                onClick={() => setSelectedNews(null)}
                variant="outline"
                className="text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ← Back
              </Button>
            </div>

            {selectedNews.category && (
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 dark:bg-amber-700/20 dark:text-amber-300 mt-4"
              >
                {selectedNews.category}
              </Badge>
            )}

            <h1 className="mt-6 text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-gray-100">
              {selectedNews.title}
            </h1>

            <div className="mt-2 flex items-center space-x-4 text-gray-500 dark:text-gray-400">
              <span>{formatDate(selectedNews.date)}</span>
              <span>•</span>
              <span>{selectedNews.readTime}</span>
            </div>

            {selectedNews.isPdf && selectedNews.pdfUrl && (
              <div className="mt-6 bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-700 rounded-lg p-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Download Full Report
                </h3>
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => window.open(selectedNews.pdfUrl!, "_blank")}
                >
                  Download PDF
                </Button>
              </div>
            )}

            <div className="mt-6 prose prose-lg max-w-none text-gray-800 dark:text-gray-200">
              {selectedNews.content
                ? selectedNews.content.split("\n\n").map((p, i) => (
                    <p key={i} className="mb-6 leading-relaxed">
                      {p}
                    </p>
                  ))
                : "No content available."}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // NEWS GRID PAGE - ORIGINAL STYLING RESTORED
  return (
    <section className="pt-8 pb-16 min-h-screen bg-transparent relative overflow-hidden">
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

        {loading ? (
          <motion.div variants={fadeInUp}>
            <Card className="bg-white/60 backdrop-blur-sm border-amber-200/30">
              <CardContent className="p-6 text-center text-stone-500">
                Loading...
              </CardContent>
            </Card>
          </motion.div>
        ) : newsItems.length === 0 ? (
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
