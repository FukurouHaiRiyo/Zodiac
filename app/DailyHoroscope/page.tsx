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

        // We use a for...of loop to process signs one by one.
        // This allows the 1s delay to actually work and prevent API blocking.
        for (const sign of zodiacSigns) {
          try {
            // 1. Fetch from RapidAPI
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

            // 2. Translate the horoscope text to Romanian
            // result.data.horoscope_data is the specific field from this API
            const translationResult = await translateTextMyMemory(
              result.data.horoscope_data,
              null,
              'ro'
            );

            // 3. Handle string or array response from the translator
            const translatedHoroscope = Array.isArray(translationResult)
              ? translationResult.join(' ')
              : translationResult;

            console.log(`Processed: ${sign}`);

            // 4. Add to our temporary array
            resultsArray.push({
              sign,
              date: result.data.date,
              horoscope: translatedHoroscope,
            });

            // 5. Rate Limit Delay: Wait 1 second before moving to the next sign
            await new Promise((resolve) => setTimeout(resolve, 1000));

          } catch (signError) {
            console.error(`Error processing horoscope for ${sign}:`, signError);
          }
        }

        // Once all signs are done, update the state once
        setHoroscopeData(resultsArray);
      } catch (error) {
        console.error('General Error fetching horoscope data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscopeData();
    // Empty dependency array ensures this only runs once on mount
  }, []); 

  return (
    <>
      <Header
        state={false}
        setState={() => {}} 
      />
      <section className="relative min-h-screen bg-white">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 sm:py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-black mx-auto md:text-5xl">
              Horoscop zilnic pentru toate zodiile 🌌✨
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
              Descoperiți îndrumările cosmice de astăzi pentru fiecare semn zodiacal.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center mt-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">Se încarcă horoscopul (traducere în curs)...</p>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {horoscopeData.map((horoscope) => (
                <div
                  key={horoscope.sign}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold capitalize text-gray-800">
                    {horoscope.sign}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">{horoscope.date}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {horoscope.horoscope}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Background Gradient */}
        <div
          className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)',
          }}
        ></div>
      </section>
    </>
  );
};

export default DailyHoroscopePage;
