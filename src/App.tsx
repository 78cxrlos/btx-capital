import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import Services from "./components/Services";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { News } from "./components/News";
import { Dashboard } from "./admin/Dashboard";

type ActiveSection = "home" | "about" | "services" | "contact" | "news";

function MainSite() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [showFooter, setShowFooter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("btx-capital");

  // Hide initial loading screen after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (section: ActiveSection) => {
    if (section !== activeSection) {
      setIsLoading(true);

      switch (section) {
        case "home":
          setLoadingMessage("btx-capital");
          break;
        case "about":
          setLoadingMessage("About us");
          break;
        case "services":
          setLoadingMessage("Our Services");
          break;
        case "contact":
          setLoadingMessage("Contact us");
          break;
        case "news":
          setLoadingMessage("Latest News");
          break;
      }

      setTimeout(() => {
        setActiveSection(section);
        setIsLoading(false);
        setShowFooter(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;

      if (scrollY + windowHeight >= docHeight - 200) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageClasses =
    "w-full min-h-screen px-6 md:px-12 lg:px-24 pt-20 pb-96 transition-opacity duration-700";

  const renderPage = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className={pageClasses}>
            <Hero onNavigate={handleNavigation} />
          </div>
        );
      case "about":
        return (
          <div className={pageClasses}>
            <About />
          </div>
        );
      case "services":
        return (
          <div className={pageClasses}>
            <Services />
          </div>
        );
      case "contact":
        return (
          <div className="w-full min-h-screen transition-opacity duration-700 pb-[40vh]">
            <Contact />
          </div>
        );
      case "news":
        return (
          <div className={pageClasses}>
            <News />
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <div className="relative">
      {/* Navigation */}
      <div
        className={`transition-opacity duration-700 ${
          showFooter
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <Navigation
          onNavigate={handleNavigation}
          activeSection={activeSection}
        />
      </div>

      {/* Page content */}
      <div
        className={`transition-opacity duration-700 ${
          showFooter
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        {renderPage()}
      </div>

      {/* Footer */}
      <div
        className={`fixed inset-0 transition-all duration-700 ${
          showFooter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
        }`}
      >
        <Footer onNavigate={handleNavigation} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router basename="/btx-capital">
      <Routes>
        {/* Admin site must come first */}
        <Route path="/admin/*" element={<Dashboard />} />
        {/* Main site */}
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </Router>
  );
}
