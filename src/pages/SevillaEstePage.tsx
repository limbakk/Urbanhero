import React from 'react';
import { SevillaEsteHeader } from '../components/sevillaEste/SevillaEsteHeader';
import { SevillaEsteHero } from '../components/sevillaEste/SevillaEsteHero';
import { SevillaEsteAbout } from '../components/sevillaEste/SevillaEsteAbout';
import { SevillaEsteDisciplines } from '../components/sevillaEste/SevillaEsteDisciplines';
import { SevillaEsteSchedule } from '../components/sevillaEste/SevillaEsteSchedule';
import { SevillaEsteCoaches } from '../components/sevillaEste/SevillaEsteCoaches';
import { SevillaEstePricing } from '../components/sevillaEste/SevillaEstePricing';
import { SevillaEsteGallery } from '../components/sevillaEste/SevillaEsteGallery';
import { SevillaEsteTrialBooking } from '../components/sevillaEste/SevillaEsteTrialBooking';
import { SevillaEsteLocationContact } from '../components/sevillaEste/SevillaEsteLocationContact';
import { SevillaEsteFAQ } from '../components/sevillaEste/SevillaEsteFAQ';
import { SevillaEsteFooter } from '../components/sevillaEste/SevillaEsteFooter';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LegalModalType } from '../components/LegalModals';

interface SevillaEstePageProps {
  onNavigateHome: () => void;
  onNavigateToElPino?: () => void;
  onOpenLegal: (type: LegalModalType) => void;
  onOpenCookieSettings: () => void;
}

export const SevillaEstePage: React.FC<SevillaEstePageProps> = ({
  onNavigateHome,
  onNavigateToElPino,
  onOpenLegal,
  onOpenCookieSettings,
}) => {
  const scrollToTrial = () => {
    const el = document.getElementById('clases-gratis');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#061325] text-slate-100 flex flex-col font-sans selection:bg-[#00d2ff] selection:text-[#061325]">
      {/* Header with Navigation & Brand Logo */}
      <SevillaEsteHeader
        onNavigateHome={onNavigateHome}
        onNavigateToElPino={onNavigateToElPino}
        onOpenTrial={scrollToTrial}
      />

      <main className="flex-1">
        {/* A. Hero Section */}
        <ErrorBoundary fallbackTitle="Hero Sevilla Este">
          <SevillaEsteHero onOpenTrial={scrollToTrial} />
        </ErrorBoundary>

        {/* B. About Sevilla Este in Hotel Vértice */}
        <ErrorBoundary fallbackTitle="Sobre Sevilla Este">
          <SevillaEsteAbout />
        </ErrorBoundary>

        {/* C. Training Disciplines */}
        <ErrorBoundary fallbackTitle="Disciplinas Funcionales">
          <SevillaEsteDisciplines onOpenTrial={scrollToTrial} />
        </ErrorBoundary>

        {/* D. Class Schedule */}
        <ErrorBoundary fallbackTitle="Horarios Semanales">
          <SevillaEsteSchedule />
        </ErrorBoundary>

        {/* E. Coaching Team (Dani, Elena, Marcos) */}
        <ErrorBoundary fallbackTitle="Equipo de Coaches">
          <SevillaEsteCoaches />
        </ErrorBoundary>

        {/* F. Memberships & Prices */}
        <ErrorBoundary fallbackTitle="Tarifas y Bonos">
          <SevillaEstePricing onOpenTrial={scrollToTrial} />
        </ErrorBoundary>

        {/* G. Gallery & Facilities with Lightbox */}
        <ErrorBoundary fallbackTitle="Galería de Instalaciones">
          <SevillaEsteGallery />
        </ErrorBoundary>

        {/* H. Free Trial Classes */}
        <ErrorBoundary fallbackTitle="2 Clases de Prueba Gratis">
          <SevillaEsteTrialBooking />
        </ErrorBoundary>

        {/* I. Location & Contact */}
        <ErrorBoundary fallbackTitle="Ubicación y Contacto">
          <SevillaEsteLocationContact />
        </ErrorBoundary>

        {/* J. FAQ */}
        <ErrorBoundary fallbackTitle="Preguntas Frecuentes">
          <SevillaEsteFAQ />
        </ErrorBoundary>
      </main>

      {/* K. Footer */}
      <SevillaEsteFooter
        onNavigateHome={onNavigateHome}
        onNavigateToElPino={onNavigateToElPino}
        onOpenLegal={onOpenLegal}
        onOpenCookieSettings={onOpenCookieSettings}
        onOpenTrial={scrollToTrial}
      />
    </div>
  );
};
