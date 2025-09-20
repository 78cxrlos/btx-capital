import { useState } from "react";
import { Button } from "./ui/button";
import exampleImage from "../assets/logo.jpeg";

type ActiveSection = "home" | "about" | "services" | "contact";

interface NavigationProps {
  onNavigate: (section: ActiveSection) => void;
  activeSection: ActiveSection;
}

export function Navigation({ onNavigate, activeSection }: NavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links: { name: string; section: ActiveSection }[] = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Services", section: "services" },
    { name: "Contact", section: "contact" },
  ];

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

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map(({ name, section }) => (
                <button
                  key={section}
                  onClick={() => onNavigate(section)}
                  className={`px-3 py-2 transition-colors ${
                    activeSection === section
                      ? "text-amber-700 border-b-2 border-amber-600"
                      : "text-stone-700 hover:text-amber-700"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <span className="sr-only">Open main menu</span>
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
                  d={
                    isMobileOpen
                      ? "M6 18L18 6M6 6l12 12" // X icon
                      : "M4 6h16M4 12h16M4 18h16" // Hamburger
                  }
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isMobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2">
          {links.map(({ name, section }) => (
            <button
              key={section}
              onClick={() => {
                onNavigate(section);
                setIsMobileOpen(false); // close menu after click
              }}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                activeSection === section
                  ? "text-amber-700 bg-amber-50"
                  : "text-stone-700 hover:text-amber-700"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
