'use client';

import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import translateTextMyMemory from '@/app/scripts/translateMyMemory';
import { XRapidApiKey, XRapidApiHost } from '@/app/env';

interface PhraseData {
  date: string;
  phrase: string;
}

const WeeklyHoroscopePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [phraseData, setPhraseData] = useState<PhraseData | null>(null);

  useEffect(() => {
    const fetchDailyPhrase = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://${XRapidApiHost}/dailyphrase`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': XRapidApiKey,
              'x-rapidapi-host': XRapidApiHost,
              'Content-Type': 'application/json'
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch daily phrase: ${response.statusText}`);
        }

        const result = await response.json();

        // Extract the phrase depending on the API's specific response structure
        const rawText = 
          result.phrase || 
          result.daily || 
          result.message || 
          result.data?.phrase ||
          "Nu am putut descifra fraza zilei astăzi.";

        // Translate the phrase to Romanian
        const translationResult = await translateTextMyMemory(
          rawText,
          'en',
          'ro'
        );

        const translatedPhrase = Array.isArray(translationResult)
          ? translationResult.join(' ')
          : translationResult;

        setPhraseData({
          date: result.date || new Date().toLocaleDateString('ro-RO'),
          phrase: translatedPhrase,
        });

      } catch (error) {
        console.error('Error fetching daily phrase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyPhrase();
  }, []);

  return (
    <>
      <Header
        state={false}
        setState={() => {}} 
      />
      
      <section className="relative min-h-screen bg-gray-50 flex flex-col items-center">
        <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 py-20 sm:py-28 md:px-8">
          
          {/* Header Section */}
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Fraza Zilei 💬✨
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Gândul tău astrologic inspirațional pentru astăzi.
            </p>
          </div>

          {loading ? (
            /* Loading State */
            <div className="flex flex-col items-center mt-20">
              <div className="w-16 h-16 border-4 border-t-rose-500 border-gray-200 rounded-full animate-spin"></div>
              <p className="mt-6 text-gray-500 font-medium italic">Preluăm înțelepciunea astrelor...</p>
            </div>
          ) : phraseData ? (
            /* Single Card Result */
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="group relative bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                
                <span className="inline-block text-[12px] font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                  Inspirație Zilnică
                </span>
                
                <p className="text-gray-400 text-sm mb-6 font-mono">{phraseData.date}</p>
                
                <blockquote className="text-xl sm:text-2xl text-gray-800 leading-relaxed font-serif italic relative">
                  <span className="text-4xl text-rose-300 absolute -top-4 -left-4">"</span>
                  {phraseData.phrase}
                  <span className="text-4xl text-rose-300 absolute -bottom-4 -right-2">"</span>
                </blockquote>
              </div>
            </div>
          ) : (
            <div className="mt-16 text-center text-gray-500">
              Nu a putut fi încărcată nicio frază. Încercați din nou mai târziu.
            </div>
          )}
        </div>

        {/* Thematic Background Blur */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] opacity-20 blur-[130px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(244,63,94,0.4) 0%, rgba(251,146,60,0.3) 50%, rgba(236,72,153,0.1) 100%)',
          }}
        ></div>
      </section>
    </>
  );
};

export default WeeklyHoroscopePage;