import { Button } from "./ui/button";
import exampleImage from '../assets/logo.jpeg';

type ActiveSection = 'home' | 'about' | 'services' | 'contact';

interface NavigationProps {
  onNavigate: (section: ActiveSection) => void;
  activeSection: ActiveSection;
}

export function Navigation({ onNavigate, activeSection }: NavigationProps) {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-amber-100/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <img 
              src={exampleImage} 
              alt="BTX Capital Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 transition-colors ${
                  activeSection === 'home' 
                    ? 'text-amber-700 border-b-2 border-amber-600' 
                    : 'text-stone-700 hover:text-amber-700'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`px-3 py-2 transition-colors ${
                  activeSection === 'about' 
                    ? 'text-amber-700 border-b-2 border-amber-600' 
                    : 'text-stone-700 hover:text-amber-700'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('services')}
                className={`px-3 py-2 transition-colors ${
                  activeSection === 'services' 
                    ? 'text-amber-700 border-b-2 border-amber-600' 
                    : 'text-stone-700 hover:text-amber-700'
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => onNavigate('contact')}  
                className={`px-3 py-2 transition-colors ${
                  activeSection === 'contact' 
                    ? 'text-amber-700 border-b-2 border-amber-600' 
                    : 'text-stone-700 hover:text-amber-700'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
