'use client';

import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import translateTextMyMemory from '@/app/scripts/translateMyMemory';
import { XRapidApiKey, XRapidApiHost } from '@/app/env';

interface HoroscopeData {
  sign: string;
  date: string;
  horoscope: string;
}

const DailyHoroscopePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData[]>([]);

  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  useEffect(() => {
    const fetchHoroscopeData = async () => {
      try {
        setLoading(true);
        const resultsArray: HoroscopeData[] = [];

        // Sequential loop to respect API rate limits (1s delay per request)
        for (const sign of zodiacSigns) {
          try {
            // Updated to use the /horoscope endpoint with 'day' and 'sunsign' params
            const response = await fetch(
              `https://${XRapidApiHost}/horoscope?day=today&sunsign=${sign.toLowerCase()}`,
              {
                method: 'GET',
                headers: {
                  'x-rapidapi-key': XRapidApiKey,
                  'x-rapidapi-host': XRapidApiHost,
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Failed to fetch ${sign}: ${response.statusText}`);
            }

            const result = await response.json();

            // The /horoscope endpoint typically returns result.horoscope or result.data.horoscope
            // We'll target result.horoscope based on the standard RapidAPI structure for this host
            const rawText = result.horoscope || (result.data && result.data.horoscope) || "No content available";

            // 2. Translate to Romanian
            const translationResult = await translateTextMyMemory(
              rawText,
              null,
              'ro'
            );

            const translatedHoroscope = Array.isArray(translationResult)
              ? translationResult.join(' ')
              : translationResult;

            // 3. Store Result
            resultsArray.push({
              sign,
              date: result.date || new Date().toLocaleDateString('ro-RO'),
              horoscope: translatedHoroscope,
            });

            console.log(`Updated horoscope for: ${sign}`);

            // 4. Rate Limit Protection: Wait 1 second before next fetch
            await new Promise((resolve) => setTimeout(resolve, 1000));

          } catch (signError) {
            console.error(`Error processing ${sign}:`, signError);
          }
        }

        setHoroscopeData(resultsArray);
      } catch (error) {
        console.error('General Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscopeData();
  }, []); 

  return (
    <>
      <Header
        state={false}
        setState={() => {}} 
      />
      <section className="relative min-h-screen bg-gray-50">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 sm:py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Horoscop Zilnic 🌌
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Predicțiile astrelor pentru astăzi, traduse special pentru tine.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center mt-20">
              <div className="w-16 h-16 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
              <p className="mt-6 text-gray-500 font-medium italic">Citind configurația planetelor...</p>
            </div>
          ) : (
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {horoscopeData.map((item) => (
                <div
                  key={item.sign}
                  className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold capitalize text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.sign}
                    </h3>
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase">
                      Astăzi
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-4 font-mono">{item.date}</p>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{item.horoscope}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Background Blur */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-30 blur-[120px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(168,85,247,0.4) 50%, rgba(236,72,153,0.1) 100%)',
          }}
        ></div>
      </section>
    </>
  );
};

export default DailyHoroscopePage;
