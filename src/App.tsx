import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import Services from "./components/Services";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { News } from "./components/News";
import { Dashboard } from "./admin/Dashboard";
import { AdminLogin } from "./admin/AdminLogin";

type ActiveSection = "home" | "about" | "services" | "news" | "contact";

function MainSite() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [prevSection, setPrevSection] = useState<ActiveSection>("home");
  const [isLoading, setIsLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const newsRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs: Record<ActiveSection, React.RefObject<HTMLDivElement | null>> = {
    home: homeRef,
    about: aboutRef,
    services: servicesRef,
    news: newsRef,
    contact: contactRef,
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (section: ActiveSection) => {
    if (section !== activeSection) {
      setPrevSection(activeSection);
      setActiveSection(section);
      sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });

      if (section === "contact") {
        setShowFooter(true);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      (Object.keys(sectionRefs) as ActiveSection[]).forEach((section) => {
        const ref = sectionRefs[section].current;
        if (ref) {
          const offsetTop = ref.offsetTop;
          const offsetBottom = offsetTop + ref.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });

      if (contactRef.current) {
        const contactTop = contactRef.current.offsetTop;
        setShowFooter(window.scrollY + window.innerHeight >= contactTop + 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageClasses =
    "w-full min-h-screen px-6 md:px-12 lg:px-24 pt-20 transition-opacity duration-700";

  if (isLoading) {
    return <LoadingScreen message="btx-capital" />;
  }

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full z-50 bg-stone-900/80 backdrop-blur-md">
        <Navigation onNavigate={handleNavigation} activeSection={activeSection} />
      </div>

      <div className="transition-opacity duration-700 relative z-0 pt-20">
        <div ref={homeRef} className={pageClasses}>
          <Hero onNavigate={handleNavigation} />
        </div>
        <div ref={aboutRef} className={pageClasses}>
          <About />
        </div>
        <div ref={servicesRef} className={pageClasses}>
          <Services />
        </div>
        <div ref={newsRef} className={pageClasses + " pb-32"}>
          <News />
        </div>

        <motion.div
          ref={contactRef}
          className="w-full min-h-screen pt-20 pb-0"
          initial={{
            opacity: prevSection === "news" ? 0 : 1,
            y: prevSection === "news" ? 50 : 0,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Contact />
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={showFooter ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Footer onNavigate={handleNavigation} />
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router basename="/"> {/* ✅ Correct base path */}
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/admin/login" replace />}
        />

        {/* Main public site */}
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </Router>
  );
}
