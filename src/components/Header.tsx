"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button - Left */}
        <button 
          className="md:hidden text-foreground hover:text-brand transition-colors p-2" 
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo - Center Mobile, Left Desktop */}
        <Link href="/" className="font-heading font-black tracking-tighter text-2xl md:text-3xl hover:text-brand transition-colors flex-1 text-center md:text-left">
          GOSPEL<span className="text-brand">READS</span>
        </Link>

        {/* Desktop Navigation - Right */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-brand">Início</Link>
          <Link href="/sobre" className="transition-colors hover:text-brand">Sobre</Link>
          <Link href="/contato" className="transition-colors hover:text-brand">Contato</Link>
          
          {/* Theme Toggle Button Desktop */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-foreground hover:text-brand transition-colors rounded-full"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </nav>

        {/* Theme Toggle Button Mobile - Right */}
        <div className="md:hidden flex items-center">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-foreground hover:text-brand transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="block font-sans text-lg font-medium hover:text-brand transition-colors">Início</Link>
          <Link href="/sobre" onClick={() => setIsMenuOpen(false)} className="block font-sans text-lg font-medium hover:text-brand transition-colors">Sobre Nós</Link>
          <Link href="/autores" onClick={() => setIsMenuOpen(false)} className="block font-sans text-lg font-medium hover:text-brand transition-colors">Autores</Link>
          <Link href="/contato" onClick={() => setIsMenuOpen(false)} className="block font-sans text-lg font-medium hover:text-brand transition-colors">Contato</Link>
        </div>
      )}
    </header>
  );
}
