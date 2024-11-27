'use client';

import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import translateTextMyMemory from '../scripts/translate';

import { XRapidApiKey, XRapidApiHost } from '@/app/env';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


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
        const data: HoroscopeData[] = await Promise.all(
          zodiacSigns.map(async (sign) => {
            const response = await fetch(
              `https://${XRapidApiHost}/get-horoscope/weekly?sign=${sign}`,
              {
                method: 'GET',
                headers: {
                  'x-rapidapi-key': XRapidApiKey,
                  'x-rapidapi-host': XRapidApiHost,
                },
              }
            );
  
            if (!response.ok) {
              throw new Error(`Failed to fetch weekly horoscope for ${sign}`);
            }
  
            const result = await response.json();
  
            // Translate the horoscope text
            const translatedHoroscope = await translateTextMyMemory(
              result.data.horoscope_data,
              'en', // Source language (English)
              'ro'  // Target language (Romanian)
            );
  
            console.log(`Translated Weekly Horoscope for ${sign}:`, translatedHoroscope);
  
            // Simulate delay to avoid rate limits
            await new Promise((resolve) => setTimeout(resolve, 200));
  
            return {
              sign,
              date: result.data.date,
              horoscope: translatedHoroscope,
            };
          })
        );
  
        setHoroscopeData(data);
      } catch (error) {
        console.error('Error fetching or translating weekly horoscope data:', error);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setState={function (_: React.SetStateAction<boolean>): void {
          throw new Error('Function not implemented.');
        }}
      />
      <section className='relative'>
        <div className='relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8'>
          <div className='space-y-5 max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl text-black font-extrabold mx-auto md:text-5xl'>
              Horoscop zilnic pentru toate zodiile 🌌✨
            </h2>
            <p className='max-w-2xl mx-auto text-gray-600'>
              Descoperiți îndrumările cosmice de astăzi pentru fiecare semn zodiacal.
            </p>
          </div>

          {loading ? (
            <p>Loading horoscopes...</p>
          ) : (
            <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {horoscopeData.map((horoscope) => (
                <div key={horoscope.sign} className='p-4 border rounded-lg shadow-lg'>
                  <h3 className='text-lg font-semibold capitalize text-gray-800'>{horoscope.sign}</h3>
                  <p className='text-gray-500 text-xs mb-2'>{horoscope.date}</p>
                  <p className='text-gray-600 text-sm'>{horoscope.horoscope}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Background Gradient */}
        <div
          className='absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg'
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
