'use client';

import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import translateTextMyMemory from '@/app/scripts/translateMyMemory';
import { XRapidApiKey, XRapidApiHost } from '@/app/env';

interface SignProfileData {
  sign: string;
  translatedSign: string;
  elementOrPlanet: string;
  description: string;
}

const DailyHoroscopePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<SignProfileData[]>([]);

  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  // Local dictionary for 100% accurate, instant translations
  const romanianZodiacNames: Record<string, string> = {
    aries: 'Berbec',
    taurus: 'Taur',
    gemini: 'Gemeni',
    cancer: 'Rac',
    leo: 'Leu',
    virgo: 'Fecioară',
    libra: 'Balanță',
    scorpio: 'Scorpion',
    sagittarius: 'Săgetător',
    capricorn: 'Capricorn',
    aquarius: 'Vărsător',
    pisces: 'Pești',
  };

  // Function to limit text to ensure translation reliability
  const limitTextLength = (text: string, maxLength = 800): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    const fetchZodiacProfiles = async () => {
      try {
        setLoading(true);
        const resultsArray: SignProfileData[] = [];

        // Sequential loop to respect API rate limits (1s delay per request)
        for (const sign of zodiacSigns) {
          try {
            const response = await fetch(
              `https://${XRapidApiHost}/sign?s=${sign.toLowerCase()}`,
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
              throw new Error(`Failed to fetch profile for ${sign}: ${response.statusText}`);
            }

            const result = await response.json();

            // The /sign endpoint usually returns properties like 'about', 'nature', 'element'.
            const rawText = 
              result.about || 
              result.description || 
              result.nature || 
              "Informații indisponibile pentru această zodie.";

            const limitedText = limitTextLength(rawText);

            // Translate the long description to Romanian
            const translationResult = await translateTextMyMemory(
              limitedText,
              'en',
              'ro'
            );

            const translatedDescription = Array.isArray(translationResult)
              ? translationResult.join(' ')
              : translationResult;

            const subInfo = result.element ? `Element: ${result.element}` : 'Profil General';

            // Store Result with the localized sign name
            resultsArray.push({
              sign,
              translatedSign: romanianZodiacNames[sign],
              elementOrPlanet: subInfo,
              description: translatedDescription,
            });

            console.log(`Updated profile for: ${sign}`);

            // Rate Limit Protection: Wait 1 second before next fetch
            await new Promise((resolve) => setTimeout(resolve, 1000));

          } catch (signError) {
            console.error(`Error processing ${sign}:`, signError);
          }
        }

        setProfileData(resultsArray);
      } catch (error) {
        console.error('General Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchZodiacProfiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              Profil Astrologic 🌙
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Descoperă caracteristicile, trăsăturile și natura fiecărui semn zodiacal.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center mt-20">
              <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
              <p className="mt-6 text-gray-500 font-medium italic">Analizăm trăsăturile zodiilor...</p>
            </div>
          ) : (
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {profileData.map((item) => (
                <div
                  key={item.sign}
                  className="group relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    {/* Render the safely mapped Romanian name instead of relying on the API */}
                    <h3 className="text-xl font-bold capitalize text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.translatedSign}
                    </h3>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase tracking-wide">
                      Caracteristici
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-4 font-mono">{item.elementOrPlanet}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-25 blur-[120px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.4) 0%, rgba(99,102,241,0.3) 50%, rgba(168,85,247,0.1) 100%)',
          }}
        ></div>
      </section>
    </>
  );
};

export default DailyHoroscopePage;
