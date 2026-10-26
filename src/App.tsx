import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GymCards } from './components/GymCards';
import { Methodology } from './components/Methodology';
import { Values } from './components/Values';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { TimerChallenge } from './components/TimerChallenge';
import { JoinTrialSection } from './components/JoinTrialSection';
import { LatestNews } from './components/LatestNews';
import { InstagramFeed } from './components/InstagramFeed';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { CookieBanner } from './components/CookieBanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ElPinoPage } from './pages/ElPinoPage';
import { SevillaEstePage } from './pages/SevillaEstePage';

export default function App() {
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState<boolean>(false);
  const [selectedTrialGym, setSelectedTrialGym] = useState<'el-pino' | 'sevilla-este'>('el-pino');

  // Client-side routing state supporting /urban-hero-el-pino and /urban-hero-sevilla-este
  const getInitialRoute = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('urban-hero-el-pino') || hash.includes('urban-hero-el-pino')) {
        return '/urban-hero-el-pino';
      }
      if (path.includes('urban-hero-sevilla-este') || hash.includes('urban-hero-sevilla-este')) {
        return '/urban-hero-sevilla-este';
      }
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('urban-hero-el-pino') || hash.includes('urban-hero-el-pino')) {
        setCurrentRoute('/urban-hero-el-pino');
      } else if (path.includes('urban-hero-sevilla-este') || hash.includes('urban-hero-sevilla-este')) {
        setCurrentRoute('/urban-hero-sevilla-este');
      } else {
        setCurrentRoute('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept clicks on links pointing to the dedicated gym sites
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      if (href.includes('urban-hero-el-pino') && !href.includes('instagram')) {
        e.preventDefault();
        navigateTo('/urban-hero-el-pino');
      } else if (href.includes('urban-hero-sevilla-este') && !href.includes('instagram')) {
        e.preventDefault();
        navigateTo('/urban-hero-sevilla-este');
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Dynamic SEO title & meta sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (currentRoute === '/urban-hero-el-pino') {
        document.title = 'Urban Hero El Pino | Box de CrossTraining, Halterofilia y Open Box en Sevilla';
      } else if (currentRoute === '/urban-hero-sevilla-este') {
        document.title = 'Urban Hero Sevilla Este | Entrenamiento Funcional y Salud en Hotel Vértice Sevilla';
      } else {
        document.title = 'Urban Hero Training Center | CrossTraining y Entrenamiento Funcional en Sevilla';
      }
    }
  }, [currentRoute]);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', path);
      } catch {
        // Fallback for restricted iframe
        window.location.hash = path.replace('/', '');
      }
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTrialSection = (gymId?: 'el-pino' | 'sevilla-este') => {
    if (gymId) {
      setSelectedTrialGym(gymId);
    }
    const element = document.getElementById('unete');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render El Pino dedicated website
  if (currentRoute === '/urban-hero-el-pino') {
    return (
      <>
        <ErrorBoundary fallbackTitle="Web Oficial Urban Hero El Pino">
          <ElPinoPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateToSevillaEste={() => navigateTo('/urban-hero-sevilla-este')}
            onOpenLegal={(type) => setActiveLegalModal(type)}
            onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
          />
        </ErrorBoundary>

        {/* Shared Legal & Cookie Modals */}
        <LegalModals
          currentModal={activeLegalModal}
          onClose={() => setActiveLegalModal(null)}
          onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        />
        <CookieBanner
          onOpenLegal={(type) => setActiveLegalModal(type)}
          isSettingsOpenDirectly={isCookieSettingsOpen}
          onCloseSettingsDirectly={() => setIsCookieSettingsOpen(false)}
        />
      </>
    );
  }

  // Render Sevilla Este dedicated website
  if (currentRoute === '/urban-hero-sevilla-este') {
    return (
      <>
        <ErrorBoundary fallbackTitle="Web Oficial Urban Hero Sevilla Este">
          <SevillaEstePage
            onNavigateHome={() => navigateTo('/')}
            onNavigateToElPino={() => navigateTo('/urban-hero-el-pino')}
            onOpenLegal={(type) => setActiveLegalModal(type)}
            onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
          />
        </ErrorBoundary>

        {/* Shared Legal & Cookie Modals */}
        <LegalModals
          currentModal={activeLegalModal}
          onClose={() => setActiveLegalModal(null)}
          onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        />
        <CookieBanner
          onOpenLegal={(type) => setActiveLegalModal(type)}
          isSettingsOpenDirectly={isCookieSettingsOpen}
          onCloseSettingsDirectly={() => setIsCookieSettingsOpen(false)}
        />
      </>
    );
  }

  // Render Corporate Landing Page (completely preserved)
  return (
    <div className="min-h-screen bg-[#061325] text-slate-100 flex flex-col font-sans selection:bg-[#00d2ff] selection:text-[#061325]">
      
      {/* 1. Header & Navigation with 3D Identity */}
      <Header
        onOpenTrial={scrollToTrialSection}
        onNavigateToElPino={() => navigateTo('/urban-hero-el-pino')}
        onNavigateToSevillaEste={() => navigateTo('/urban-hero-sevilla-este')}
      />

      <main className="flex-1">
        {/* A. Hero Section with Background Video & 3D Extruded Logo */}
        <ErrorBoundary fallbackTitle="Hero Urban Hero">
          <Hero onOpenTrial={scrollToTrialSection} />
        </ErrorBoundary>

        {/* B. Choose Your Gym: El Pino & Sevilla Este Premium Cards */}
        <ErrorBoundary fallbackTitle="Nuestros Gimnasios en Sevilla">
          <GymCards
            onSelectGymForTrial={scrollToTrialSection}
            onNavigateToElPino={() => navigateTo('/urban-hero-el-pino')}
            onNavigateToSevillaEste={() => navigateTo('/urban-hero-sevilla-este')}
          />
        </ErrorBoundary>

        {/* C. Our Methodology: Philosophy, Technique, Individual Scaling */}
        <ErrorBoundary fallbackTitle="Nuestra Metodología">
          <Methodology />
        </ErrorBoundary>

        {/* D. Our Values: Community, Commitment, Professionalism, Continuous Improvement */}
        <ErrorBoundary fallbackTitle="Nuestros Valores">
          <Values />
        </ErrorBoundary>

        {/* E. What Makes Our Gyms Different: Comparison Matrix & Interactive Finder */}
        <ErrorBoundary fallbackTitle="Comparativa de Centros">
          <ComparisonMatrix onSelectGymForTrial={scrollToTrialSection} />
        </ErrorBoundary>

        {/* High-Precision Athletic Timer & Target Reaction Challenge */}
        <ErrorBoundary fallbackTitle="Precision Athletic Timer">
          <TimerChallenge />
        </ErrorBoundary>

        {/* F. Join Urban Hero: 2 Free Trial Classes & Verified Booking */}
        <ErrorBoundary fallbackTitle="Reserva de 2 Clases Gratis">
          <JoinTrialSection selectedGymId={selectedTrialGym} />
        </ErrorBoundary>

        {/* G. Latest News */}
        <ErrorBoundary fallbackTitle="Últimas Noticias">
          <LatestNews />
        </ErrorBoundary>

        {/* H. Instagram Feed: Real posts linking to @urbanheroelpino & @urbanherosevillaeste */}
        <ErrorBoundary fallbackTitle="Comunidad Instagram">
          <InstagramFeed />
        </ErrorBoundary>

        {/* I. FAQ */}
        <ErrorBoundary fallbackTitle="Preguntas Frecuentes">
          <FAQ />
        </ErrorBoundary>

        {/* J. Final CTA */}
        <ErrorBoundary fallbackTitle="Comienza tu entrenamiento">
          <FinalCTA onOpenTrial={scrollToTrialSection} />
        </ErrorBoundary>
      </main>

      {/* K. Footer */}
      <Footer
        onOpenLegal={(type) => setActiveLegalModal(type)}
        onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        onOpenTrial={scrollToTrialSection}
      />

      {/* Legal & Privacy Compliance Modals (Aviso Legal, Privacidad, Cookies) */}
      <LegalModals
        currentModal={activeLegalModal}
        onClose={() => setActiveLegalModal(null)}
        onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
      />

      {/* LSSI-CE & GDPR Cookie Consent Banner */}
      <CookieBanner
        onOpenLegal={(type) => setActiveLegalModal(type)}
        isSettingsOpenDirectly={isCookieSettingsOpen}
        onCloseSettingsDirectly={() => setIsCookieSettingsOpen(false)}
      />

    </div>
  );
}
