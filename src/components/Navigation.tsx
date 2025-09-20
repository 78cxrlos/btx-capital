import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import exampleImage from "../assets/logo.jpeg";

type ActiveSection = "home" | "about" | "services" | "contact";

interface NavigationProps {
  onNavigate: (section: ActiveSection) => void;
  activeSection: ActiveSection;
}

export function Navigation({ onNavigate, activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleNavigate = (section: ActiveSection) => {
    onNavigate(section);
    setIsMenuOpen(false); // close menu after selecting
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-amber-100/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigate("home")}
          >
            <img
              src={exampleImage}
              alt="BTX Capital Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["home", "about", "services", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavigate(section as ActiveSection)}
                  className={`px-3 py-2 transition-colors ${
                    activeSection === section
                      ? "text-amber-700 border-b-2 border-amber-600"
                      : "text-stone-700 hover:text-amber-700"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white/95 backdrop-blur-sm border-t border-amber-100/20"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {["home", "about", "services", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => handleNavigate(section as ActiveSection)}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeSection === section
                    ? "text-amber-700 bg-amber-50"
                    : "text-stone-700 hover:bg-amber-50 hover:text-amber-700"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
