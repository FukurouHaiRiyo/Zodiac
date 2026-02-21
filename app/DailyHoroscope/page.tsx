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

  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
  ];

  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData[]>([]);

  useEffect(() => {
  const fetchHoroscopeData = async () => {
    try {
      const resultsArray = [];

      // Helper function to wrap the legacy request call
      const getSingleSign = (sign: any) => {
        return new Promise((resolve, reject) => {
          const options = {
            method: 'GET',
            url: 'https://horoscope-astrology.p.rapidapi.com/horoscope',
            qs: { day: 'today', sunsign: sign.toLowerCase() },
            headers: {
              'x-rapidapi-key': XRapidApiKey,
              'x-rapidapi-host': XRapidApiHost,
            },
          };

          request(options, (error, response, body) => {
            if (error) return reject(error);
            if (response.statusCode !== 200) {
              return reject(new Error(`API Error ${response.statusCode} for ${sign}`));
            }
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(new Error(`Failed to parse JSON for ${sign}: ${e}`));
            }
          });
        });
      };

      // Loop through signs sequentially to respect the 1s delay/rate limit
      for (const sign of zodiacSigns) {
        try {
          // 1. Fetch
          const result = await getSingleSign(sign);

          // 2. Translate
          const translationResult = await translateTextMyMemory(
            result.data.horoscope_data,
            null,
            'ro'
          );

          // 3. Format Translation
          const translatedHoroscope = Array.isArray(translationResult)
            ? translationResult.join(' ')
            : translationResult;

          console.log(`Translated Horoscope for ${sign}:`, translatedHoroscope);

          // 4. Store Result
          resultsArray.push({
            sign,
            date: result.data.date,
            horoscope: translatedHoroscope,
          });

          // 5. Wait 1 second before the next iteration (Rate Limit Protection)
          await new Promise((res) => setTimeout(res, 1000));

        } catch (signError) {
          console.error(`Error processing sign ${sign}:`, signError);
          // Optionally push a placeholder so the UI doesn't break
        }
      }

      setHoroscopeData(resultsArray);
    } catch (error) {
      console.error('General Error in fetchHoroscopeData:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchHoroscopeData();
}, [zodiacSigns]); // Added dependency for safety
  


  return (
    <>
      <Header
        state={false}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setState={function (_: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        }}
      />
      <section className="relative">
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
            <p className="text-center mt-10 text-gray-600">Loading horoscopes...</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {horoscopeData.map((horoscope) => (
                <div
                  key={horoscope.sign}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold capitalize text-gray-800">
                    {horoscope.sign}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">{horoscope.date}</p>
                  <p className="text-gray-600 text-sm">{horoscope.horoscope}</p>
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
