import translateTextMicrosoft from "./translate";

import { XRapidApiKey, XRapidApiHost } from "@/app/env";

// Helper function for basic sentiment analysis
const analyzeSentiment = (text: string) => {
  const loveKeywords = ['love', 'relationship', 'romantic', 'affection'];
  const healthKeywords = ['health', 'well-being', 'energy', 'vitality'];
  const moneyKeywords = ['money', 'finance', 'wealth', 'prosperity'];

  let loveScore = 0;
  let healthScore = 0;
  let moneyScore = 0;

  const words = text.toLowerCase().split(/\s+/);
  words.forEach((word) => {
    if (loveKeywords.includes(word)) loveScore += 10;
    if (healthKeywords.includes(word)) healthScore += 10;
    if (moneyKeywords.includes(word)) moneyScore += 10;
  });

  return {
    love: Math.min(loveScore, 100),
    health: Math.min(healthScore, 100),
    money: Math.min(moneyScore, 100),
  };
};

// Fetch horoscope data with API call and sentiment analysis
export const fetchHoroscopeData = async () => {
  const zodiacSigns = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
  ];

  try {
    const data = await Promise.all(
      zodiacSigns.map(async (sign) => {
        const response = await fetch(
          `https://${XRapidApiHost}/get-horoscope/daily?sign=${sign}&day=today`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': XRapidApiKey,
              'x-rapidapi-host': XRapidApiHost,
            },
          }
        );

        const result = await response.json();
        const sentimentScores = analyzeSentiment(result.data.horoscope_data);

        return {
          sign,
          date: result.data.date,
          horoscope: result.data.horoscope_data,
          love: sentimentScores.love,
          health: sentimentScores.health,
          money: sentimentScores.money,
          previousLove: undefined,
          previousHealth: undefined,
          previousMoney: undefined,
        };
      })
    );

    return data;
  } catch (error) {
    console.error('Error fetching horoscope data:', error);
    return [];
  }
};
