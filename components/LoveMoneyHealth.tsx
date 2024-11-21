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
    if (value > 0) return '⬆️'; // Arrow up
    if (value < 0) return '⬇️'; // Arrow down
    return '➖'; // Equal (No change)
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
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 md:px-8 space-y-10">
          <div className="grid grid-cols-12 gap-16"> {/* Adjusted gap for layout */}
            {/* Zodiac Signs and Legend */}
            <div className="col-span-3 space-y-12">
              {/* Legend */}
              <div className="flex flex-col items-start space-y-4 text-black">
                <h4 className="text-lg font-bold text-gray-700">Legend</h4>
                <div className="flex items-center gap-2">
                  <span>⬆️</span>
                  <span>Increase</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⬇️</span>
                  <span>Decrease</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>➖</span>
                  <span>No Change</span>
                </div>
              </div>


              {/* Zodiac Signs */}
              <div className="flex flex-col items-start space-y-6">
                {Object.entries(zodiacImages as Record<ZodiacSign, string>).map(([sign, image]) => (
                  <div key={sign} className="flex items-center gap-4">
                    <img src={image} alt={sign} className="w-10 h-10" />
                    <span className="capitalize text-gray-700 text-lg">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Horoscope Data (Center) */}
            <div className="col-span-9 grid grid-cols-4 gap-8"> {/* 4 columns for data */}
              {loading ? (
                <p>Loading...</p>
              ) : (
                horoscopeData.map((data) => (
                  <div
                    key={data.sign}
                    className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow"
                  >
                    <img
                      src={zodiacImages[data.sign as ZodiacSign]}
                      alt={data.sign}
                      className="w-16 h-16"
                    />
                    <h3 className="text-lg font-semibold capitalize mt-4">
                      {data.sign}
                    </h3>
                    <p className="text-sm text-gray-600">{data.date}</p>

                    <div className="mt-6 w-full space-y-4">
                      <div className="flex items-center gap-4">
                        <span>{icons.love}</span>
                        <span className="text-sm text-gray-700">Love</span>
                        <span className="text-lg">{getIconForValue(data.love)}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{icons.health}</span>
                        <span className="text-sm text-gray-700">Health</span>
                        <span className="text-lg">{getIconForValue(data.health)}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{icons.money}</span>
                        <span className="text-sm text-gray-700">Money</span>
                        <span className="text-lg">{getIconForValue(data.money)}</span>
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
