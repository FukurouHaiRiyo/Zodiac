'use client';
import { useState, useEffect } from 'react';
import { fetchHoroscopeData } from '@/app/scripts/horoscope';

type HoroscopeData = {
  sign: string;
  date: string;
  horoscope: string;
  love: number;
  health: number;
  money: number;
  previousLove?: number;
  previousHealth?: number;
  previousMoney?: number;
};

type ZodiacSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

const zodiacImages: Record<ZodiacSign, string> = {
  aries: 'aries.png',
  taurus: 'taurus.png',
  gemini: 'gemini.png',
  cancer: 'cancer.png',
  leo: 'leo.png',
  virgo: 'virgo.png',
  libra: 'libra.png',
  scorpio: 'scorpio.png',
  sagittarius: 'sagittarius.png',
  capricorn: 'capricorn.png',
  aquarius: 'aquarius.png',
  pisces: 'pisces.png',
};

const icons = {
  love: '❤️',
  health: '➕',
  money: '💲',
};

const LoveMoneyHealth = () => {
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData[]>([]);
  const [loading, setLoading] = useState(true);

  const getIconForValue = (value: number) => {
    if (value > 0) return '⬆️';
    if (value < 0) return '⬇️';
    return '🟰';
  };

  useEffect(() => {
    const loadHoroscopeData = async () => {
      const data = await fetchHoroscopeData();
      setHoroscopeData((prevData) =>
        data.map((item) => {
          const previous = prevData.find((prev) => prev.sign === item.sign) as HoroscopeData | undefined;
          return {
            ...item,
            previousLove: previous?.love,
            previousHealth: previous?.health,
            previousMoney: previous?.money,
          };
        })
      );
      setLoading(false);
    };

    loadHoroscopeData();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <section className="relative flex-grow flex flex-col items-center">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-10 sm:px-6 space-y-10">
          <div className="grid grid-cols-3 md:grid-cols-12 gap-10">
            {/* Zodiac Signs and Legend */}
            <div className="col-span-12 md:col-span-3 space-y-8">
              {/* Legend */}
              <div className="flex flex-col items-start space-y-2 text-black">
                <h4 className="text-lg font-bold text-gray-700">Legend</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="flex items-center gap-2">
                    <span>⬆️</span>
                    <span>Increase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⬇️</span>
                    <span>Decrease</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🟰</span>
                    <span>No Change</span>
                  </div>
                </div>
              </div>

              {/* Zodiac Signs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(zodiacImages as Record<ZodiacSign, string>).map(([sign, image]) => (
                  <div key={sign} className="flex items-center gap-3">
                    <img src={image} alt={sign} className="w-8 h-8 sm:w-10 sm:h-10" />
                    <span className="capitalize text-gray-900 text-sm sm:text-base">{sign}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Horoscope Data */}
            <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                <p>Loading...</p>
              ) : (
                horoscopeData.map((data) => (
                  <div
                    key={data.sign}
                    className="flex flex-col items-center bg-gray-100 p-4 sm:p-6 rounded-lg shadow"
                  >
                    <img
                      src={zodiacImages[data.sign as ZodiacSign]}
                      alt={data.sign}
                      className="w-12 h-12 sm:w-16 sm:h-16"
                    />
                    <h3 className="text-black sm:text-lg font-semibold capitalize mt-2 sm:mt-4">
                      {data.sign}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{data.date}</p>

                    <div className="mt-4 w-full space-y-2 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <span>{icons.love}</span>
                        <span className="text-xs sm:text-sm text-gray-700">Love</span>
                        <span className="text-base">{getIconForValue(data.love)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{icons.health}</span>
                        <span className="text-xs sm:text-sm text-gray-700">Health</span>
                        <span className="text-base">{getIconForValue(data.health)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{icons.money}</span>
                        <span className="text-xs sm:text-sm text-gray-700">Money</span>
                        <span className="text-base">{getIconForValue(data.money)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoveMoneyHealth;
