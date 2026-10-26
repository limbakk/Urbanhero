import React from 'react';
import { ElPinoHeader } from '../components/elPino/ElPinoHeader';
import { ElPinoHero } from '../components/elPino/ElPinoHero';
import { ElPinoAbout } from '../components/elPino/ElPinoAbout';
import { ElPinoDisciplines } from '../components/elPino/ElPinoDisciplines';
import { ElPinoSchedule } from '../components/elPino/ElPinoSchedule';
import { ElPinoCoaches } from '../components/elPino/ElPinoCoaches';
import { ElPinoPricing } from '../components/elPino/ElPinoPricing';
import { ElPinoGallery } from '../components/elPino/ElPinoGallery';
import { ElPinoTrialBooking } from '../components/elPino/ElPinoTrialBooking';
import { ElPinoLocationContact } from '../components/elPino/ElPinoLocationContact';
import { ElPinoFAQ } from '../components/elPino/ElPinoFAQ';
import { ElPinoFooter } from '../components/elPino/ElPinoFooter';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LegalModalType } from '../components/LegalModals';

interface ElPinoPageProps {
  onNavigateHome: () => void;
  onNavigateToSevillaEste?: () => void;
  onOpenLegal: (type: LegalModalType) => void;
  onOpenCookieSettings: () => void;
}

export const ElPinoPage: React.FC<ElPinoPageProps> = ({
  onNavigateHome,
  onNavigateToSevillaEste,
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
      <ElPinoHeader
        onNavigateHome={onNavigateHome}
        onNavigateToSevillaEste={onNavigateToSevillaEste}
        onOpenTrial={scrollToTrial}
      />

      <main className="flex-1">
        {/* A. Hero Section */}
        <ErrorBoundary fallbackTitle="Hero El Pino">
          <ElPinoHero onOpenTrial={scrollToTrial} />
        </ErrorBoundary>

        {/* B. About El Pino */}
        <ErrorBoundary fallbackTitle="Sobre El Pino">
          <ElPinoAbout />
        </ErrorBoundary>

        {/* C. Training Disciplines */}
        <ErrorBoundary fallbackTitle="Disciplinas Oficiales">
          <ElPinoDisciplines onOpenTrial={scrollToTrial} />
        </ErrorBoundary>

        {/* D. Class Schedule */}
        <ErrorBoundary fallbackTitle="Horarios Semanales">
          <ElPinoSchedule />
        </ErrorBoundary>

        {/* E. Coaching Team (Sara, Ángel, Jony, Lucía) */}
        <ErrorBoundary fallbackTitle="Equipo de Coaches">
          <ElPinoCoaches />
        </ErrorBoundary>

        {/* F. Memberships & Prices */}
        <ErrorBoundary fallbackTitle="Tarifas y Bonos">
          <ElPinoPricing onOpenTrial={scrollToTrial} />
        </ErrorBoundary>

        {/* G. Gallery & Facilities with Lightbox */}
        <ErrorBoundary fallbackTitle="Galería de Instalaciones">
          <ElPinoGallery />
        </ErrorBoundary>

        {/* H. Free Trial Classes */}
        <ErrorBoundary fallbackTitle="2 Clases de Prueba Gratis">
          <ElPinoTrialBooking />
        </ErrorBoundary>

        {/* I. Location & Contact */}
        <ErrorBoundary fallbackTitle="Ubicación y Contacto">
          <ElPinoLocationContact />
        </ErrorBoundary>

        {/* J. FAQ */}
        <ErrorBoundary fallbackTitle="Preguntas Frecuentes">
          <ElPinoFAQ />
        </ErrorBoundary>
      </main>

      {/* K. Footer */}
      <ElPinoFooter
        onNavigateHome={onNavigateHome}
        onNavigateToSevillaEste={onNavigateToSevillaEste}
        onOpenLegal={onOpenLegal}
        onOpenCookieSettings={onOpenCookieSettings}
        onOpenTrial={scrollToTrial}
      />
    </div>
  );
};
