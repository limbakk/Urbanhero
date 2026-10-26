import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Dumbbell, Shield, Sparkles, Instagram } from 'lucide-react';
import { GYMS } from '../data/gymData';

interface HeaderProps {
  onOpenTrial: (gymId?: 'el-pino' | 'sevilla-este') => void;
  onNavigateToElPino?: () => void;
  onNavigateToSevillaEste?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTrial,
  onNavigateToElPino,
  onNavigateToSevillaEste,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gymsDropdownOpen, setGymsDropdownOpen] = useState(false);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setGymsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setGymsDropdownOpen(false);
    }, 280);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGymsDropdownOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setGymsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061325]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-2xl shadow-black/50 py-3'
          : 'bg-gradient-to-b from-[#061325]/90 via-[#061325]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity: Small Standalone Symbol + Unified Brand Identity */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#00d2ff] rounded-lg p-0.5 sm:p-1"
            aria-label="Urban Hero Training Center - Inicio"
          >
            <div className="relative w-8 sm:w-10 h-10 sm:h-12 rounded-md overflow-hidden p-0.5 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/file_00000000b6e481f49d3ade00d7044cd3_5cc0e2ba.png"
                alt="Logo Urban Hero Training Center"
                className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(0,210,255,0.4)]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-cyan-400 uppercase font-semibold leading-tight">
                Training Center
              </span>
              <span className="text-lg sm:text-2xl font-black tracking-wider text-white uppercase font-heading leading-none group-hover:text-cyan-300 transition-colors">
                Urban Hero
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium" aria-label="Navegación principal">
            <a
              href="#"
              className="text-slate-200 hover:text-[#00d2ff] transition-colors py-1 hover:border-b-2 hover:border-[#00d2ff]"
            >
              Inicio
            </a>

            {/* Gyms Dropdown with Stable Bridge and Smooth Interaction */}
            <div
              ref={dropdownRef}
              className="relative py-1"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setGymsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-slate-200 hover:text-[#00d2ff] transition-colors py-1 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-md px-1"
                aria-expanded={gymsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Nuestros Gimnasios</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    gymsDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu with zero gap */}
              {gymsDropdownOpen && (
                <div
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                  className="absolute top-full left-0 pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  role="menu"
                >
                  <div className="bg-[#091e38] border border-cyan-500/30 rounded-xl shadow-2xl p-3 backdrop-blur-xl">
                    <div className="px-3 py-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider border-b border-white/10 mb-2">
                      Selecciona tu centro en Sevilla
                    </div>
                    {GYMS.map((gym) => {
                      const isElPino = gym.id === 'el-pino';
                      const handleNavigate = () => {
                        setGymsDropdownOpen(false);
                        if (isElPino && onNavigateToElPino) {
                          onNavigateToElPino();
                        } else if (gym.id === 'sevilla-este' && onNavigateToSevillaEste) {
                          onNavigateToSevillaEste();
                        } else {
                          window.open(gym.externalUrl, '_blank', 'noopener,noreferrer');
                        }
                      };

                      return (
                        <button
                          key={gym.id}
                          type="button"
                          onClick={handleNavigate}
                          className="w-full flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] hover:border-cyan-400/50 transition-all group/item border border-white/5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-2 last:mb-0"
                          role="menuitem"
                        >
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover/item:bg-cyan-500 group-hover/item:text-[#061325] transition-colors mt-0.5 shrink-0">
                            <Dumbbell className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-white text-sm group-hover/item:text-cyan-300">
                                {gym.name}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-cyan-400 shrink-0" />
                            </div>
                            <span className="text-[11px] text-cyan-400 block font-medium mt-0.5">
                              {gym.badge}
                            </span>
                            <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {gym.address}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                    <div className="mt-2 pt-2 border-t border-white/10 text-center">
                      <a
                        href="#gimnasios"
                        onClick={() => setGymsDropdownOpen(false)}
                        className="text-xs text-slate-300 hover:text-cyan-300 underline font-medium block py-1"
                      >
                        Comparar ambos centros
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#metodologia"
              className="text-slate-200 hover:text-[#00d2ff] transition-colors py-1 hover:border-b-2 hover:border-[#00d2ff]"
            >
              Metodología
            </a>

            <a
              href="#valores"
              className="text-slate-200 hover:text-[#00d2ff] transition-colors py-1 hover:border-b-2 hover:border-[#00d2ff]"
            >
              Valores
            </a>

            <a
              href="#noticias"
              className="text-slate-200 hover:text-[#00d2ff] transition-colors py-1 hover:border-b-2 hover:border-[#00d2ff]"
            >
              Noticias
            </a>

            <a
              href="#faq"
              className="text-slate-200 hover:text-[#00d2ff] transition-colors py-1 hover:border-b-2 hover:border-[#00d2ff]"
            >
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenTrial()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00d2ff] to-[#0ea5e9] text-[#061325] font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-[#061325]" />
                <span>2 Clases Gratis</span>
              </span>
              <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </button>
          </div>

          {/* Mobile Actions: Trial Button & Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenTrial()}
              className="px-3 py-1.5 rounded-md bg-[#00d2ff] text-[#061325] text-xs font-bold uppercase tracking-wider shadow-md"
            >
              2 Clases Gratis
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú móvil'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061325]/98 border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1 border-b border-white/10 pb-3">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5 hover:text-cyan-400"
            >
              Inicio
            </a>
            <a
              href="#metodologia"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Nuestra Metodología
            </a>
            <a
              href="#valores"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Nuestros Valores
            </a>
            <a
              href="#noticias"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Noticias
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Preguntas Frecuentes
            </a>
          </div>

          {/* Direct Gym Sites in Mobile Drawer */}
          <div className="pt-2">
            <span className="block px-3 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              Visitar Webs de Gimnasios
            </span>
            <div className="space-y-2">
              {GYMS.map((gym) => {
                const isElPino = gym.id === 'el-pino';
                return (
                  <div
                    key={gym.id}
                    className="p-3 rounded-xl bg-[#0a223f] border border-cyan-500/20 text-white flex items-center justify-between"
                  >
                    <div>
                      {isElPino && onNavigateToElPino ? (
                        <button
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onNavigateToElPino();
                          }}
                          className="font-bold text-sm block text-left text-cyan-300 hover:underline"
                        >
                          {gym.name} (Web Dedicada)
                        </button>
                      ) : gym.id === 'sevilla-este' && onNavigateToSevillaEste ? (
                        <button
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onNavigateToSevillaEste();
                          }}
                          className="font-bold text-sm block text-left text-cyan-300 hover:underline"
                        >
                          {gym.name} (Web Dedicada)
                        </button>
                      ) : (
                        <a
                          href={gym.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-sm block"
                        >
                          {gym.name}
                        </a>
                      )}
                      <span className="text-xs text-slate-300">{gym.badge}</span>
                    </div>
                    <a
                      href={gym.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-cyan-400 hover:text-white"
                      title="Web externa"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Link to Instagram section on landing page */}
          <div className="pt-2 border-t border-white/10">
            <a
              href="#instagram"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-pink-400 hover:text-pink-300 hover:bg-white/5 transition-colors font-semibold"
            >
              <Instagram className="w-4 h-4" />
              <span>Ver publicaciones en Instagram</span>
            </a>
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d2ff] to-[#0ea5e9] text-[#061325] font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-[#061325]" />
              <span>Reservar 2 Clases Gratis</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
