import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

interface ElPinoHeaderProps {
  onNavigateHome: () => void;
  onNavigateToSevillaEste?: () => void;
  onOpenTrial: () => void;
}

export const ElPinoHeader: React.FC<ElPinoHeaderProps> = ({
  onNavigateHome,
  onNavigateToSevillaEste,
  onOpenTrial,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061325]/95 backdrop-blur-md border-b border-cyan-500/25 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#061325]/95 via-[#061325]/75 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00d2ff] rounded-lg p-1 text-left"
              aria-label="Volver a la portada corporativa de Urban Hero"
            >
              <div className="relative w-10 h-13 rounded-md overflow-hidden p-0.5 bg-gradient-to-br from-[#00d2ff] via-[#1a3e68] to-[#061325] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <img
                  src="/assets/aistudio/file_00000000b6e481f49d3ade00d7044cd3_5cc0e2ba.png"
                  alt="Logo Urban Hero El Pino"
                  className="w-full h-full object-contain rounded-[2px] drop-shadow-[0_2px_8px_rgba(0,210,255,0.4)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] text-cyan-400 uppercase font-bold leading-none">
                  Box de CrossTraining
                </span>
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-heading leading-tight group-hover:text-cyan-300 transition-colors">
                  Urban Hero
                </span>
                <span className="text-[9px] tracking-wider text-slate-400 uppercase -mt-0.5">
                  Polígono El Pino, Sevilla
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-slate-200">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sede Central</span>
            </button>

            <a href="#inicio" className="hover:text-[#00d2ff] transition-colors py-1">
              Inicio
            </a>
            <a href="#disciplinas" className="hover:text-[#00d2ff] transition-colors py-1">
              Disciplinas
            </a>
            <a href="#horarios" className="hover:text-[#00d2ff] transition-colors py-1">
              Horarios
            </a>
            <a href="#coaches" className="hover:text-[#00d2ff] transition-colors py-1">
              Coaches
            </a>
            <a href="#tarifas" className="hover:text-[#00d2ff] transition-colors py-1">
              Tarifas
            </a>
            <a href="#galeria" className="hover:text-[#00d2ff] transition-colors py-1">
              Instalaciones
            </a>
            <a href="#faq" className="hover:text-[#00d2ff] transition-colors py-1">
              FAQ
            </a>
            <a href="#contacto" className="hover:text-[#00d2ff] transition-colors py-1">
              Contacto
            </a>

            {/* Seamless Link to other gym: Sevilla Este */}
            {onNavigateToSevillaEste ? (
              <button
                type="button"
                onClick={onNavigateToSevillaEste}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-[11px] font-bold flex items-center gap-1 transition-colors"
                title="Visitar sede de Sevilla Este"
              >
                <span>Sevilla Este</span>
              </button>
            ) : (
              <a
                href="/urban-hero-sevilla-este"
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-[11px] font-bold flex items-center gap-1 transition-colors"
                title="Visitar sede de Sevilla Este"
              >
                <span>Sevilla Este</span>
              </a>
            )}
          </nav>

          {/* CTA & Mobile trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenTrial}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#00d2ff] to-[#0ea5e9] text-[#061325] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-[#061325]" />
              <span>2 Clases Gratis</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú móvil'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#061427]/98 border-b border-cyan-500/25 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          
          <div className="space-y-1 border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-semibold text-cyan-300 hover:bg-white/5 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Sede Central Urban Hero</span>
            </button>

            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Inicio
            </a>
            <a
              href="#disciplinas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Disciplinas CrossTraining
            </a>
            <a
              href="#horarios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Horarios Semanales
            </a>
            <a
              href="#coaches"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Equipo de Coaches
            </a>
            <a
              href="#tarifas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Tarifas y Bonos
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Galería del Box
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Preguntas Frecuentes
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-400"
            >
              Ubicación y Contacto
            </a>
          </div>

          <div className="pt-1">
            {onNavigateToSevillaEste ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToSevillaEste();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0a2342] border border-cyan-500/20 text-white text-xs font-semibold"
              >
                <span>Visitar Urban Hero Sevilla Este</span>
                <span className="text-cyan-400 font-bold">Ver Sede →</span>
              </button>
            ) : (
              <a
                href="/urban-hero-sevilla-este"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0a2342] border border-cyan-500/20 text-white text-xs font-semibold"
              >
                <span>Visitar Urban Hero Sevilla Este</span>
                <span className="text-cyan-400 font-bold">Ver Sede →</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
