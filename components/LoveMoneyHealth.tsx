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

const zodiacImages: any = {
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
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-20 md:px-8 text-center space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              horoscopeData.map((data) => (
                <div
                  key={data.sign}
                  className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow"
                >
                  <img
                    src={zodiacImages[data.sign]}
                    alt={data.sign}
                    className="w-24 h-24"
                  />
                  <h3 className="text-xl font-semibold capitalize mt-4">
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
      </section>
    </div>
  );
};

export default LoveMoneyHealth;
