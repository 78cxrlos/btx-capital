import { useState } from "react";
import { Button } from "./ui/button";
import exampleImage from "../assets/logo.jpeg";

type ActiveSection = "home" | "about" | "services" | "contact";

interface NavigationProps {
  onNavigate: (section: ActiveSection) => void;
  activeSection: ActiveSection;
}

export function Navigation({ onNavigate, activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-amber-100/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <img
              src={exampleImage}
              alt="BTX Capital Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["home", "about", "services", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => onNavigate(section as ActiveSection)}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-amber-100/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["home", "about", "services", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => {
                  onNavigate(section as ActiveSection);
                  setIsMenuOpen(false); // close after click
                }}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeSection === section
                    ? "text-amber-700 bg-amber-50"
                    : "text-stone-700 hover:text-amber-700 hover:bg-amber-50"
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
