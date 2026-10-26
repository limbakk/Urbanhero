import React from 'react';
import { CheckCircle, Quote } from 'lucide-react';
import { SEVILLA_ESTE_COACHES, SevillaEsteCoach } from '../../data/sevillaEsteData';

export const SevillaEsteCoaches: React.FC = () => {
  return (
    <section id="coaches" className="py-20 relative bg-[#061427]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-[0.25em] text-[#00d2ff] uppercase block">
            Profesionales Titulados
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading tracking-wide">
            Equipo Técnico de Sevilla Este
          </h2>
          <p className="text-base text-slate-300">
            Especialistas en Ciencias de la Actividad Física, readaptación y acondicionamiento saludable. Entrenadores que supervisan cada movimiento y adaptan el ejercicio a tu cuerpo.
          </p>
        </div>

        {/* Coaches Grid: Dani, Elena, Marcos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SEVILLA_ESTE_COACHES.map((coach: SevillaEsteCoach) => (
            <div
              key={coach.id}
              className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#09203d] to-[#06162a] border border-cyan-500/25 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Photo */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={coach.imageUrl}
                    alt={`Coach ${coach.name} de Urban Hero Sevilla Este`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09203d] via-transparent to-black/20" />

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-2xl font-black text-white uppercase font-heading tracking-wide">
                      {coach.name}
                    </h3>
                    <span className="text-xs font-bold text-cyan-300 block">
                      {coach.role}
                    </span>
                  </div>
                </div>

                {/* Bio & Details */}
                <div className="p-5 space-y-3">
                  <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 text-[11px] text-cyan-300">
                    <strong className="text-white block font-semibold">Especialidad:</strong>
                    <span>{coach.specialty}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {coach.bio}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{coach.experience}</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-5 pt-0">
                <blockquote className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-slate-300 italic relative">
                  <Quote className="w-3.5 h-3.5 text-cyan-400/60 inline mr-1" />
                  "{coach.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
