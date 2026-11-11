import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KrewLogo } from '../common/KrewLogo';
import { Button } from '../common/Button';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Product', href: '#problem' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Our Crew', href: '#crew' },
    { label: 'Differentiators', href: '#differentiators' },
    { label: 'Live Sprint Roadmap', href: '#roadmap' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-krew-border/60 bg-krew-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <KrewLogo size="md" showTagline />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-krew-text-secondary hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-krew-text-secondary hover:text-white transition-colors px-3 py-1.5"
          >
            Sign In
          </Link>
          <Link to="/dashboard">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Enter Studio
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="primary" size="sm">
              Studio
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-krew-text-secondary hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-krew-border bg-krew-charcoal px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-krew-text-secondary hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-krew-border/60 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-sm font-medium py-2 rounded-lg bg-krew-surface text-white"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-sm font-semibold py-2.5 rounded-lg bg-krew-purple text-white shadow-purple-glow"
              >
                Meet Your Crew
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

