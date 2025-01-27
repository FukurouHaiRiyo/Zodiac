// import { XRapidApiKey, XRapidApiHost } from '@/app/env';

// interface ISendMail {
//     to: string,
//     subject: string,
//     message: string
// }

// export class MailService {
//     private async fetchHoroscopeForSign(sign: string): Promise<string> {
//         try {
//             const response = await fetch(
//                 `https://${XRapidApiHost}/get-horoscope/monthly?sign=${sign}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'x-rapidapi-key': XRapidApiKey,
//                         'x-rapidapi-host': XRapidApiHost,
//                     },
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch horoscope for ${sign}`);
//             }

//             const result = await response.json();
//             const horoscope = result.data.horoscope_data;

//             // Optionally process the horoscope (e.g., translate or truncate)
//             // const limitedHoroscope = limitTextLength(horoscope);
//             // const translatedHoroscope = await translateTextMicrosoft(limitedHoroscope);

//             return horoscope; // Replace with `translatedHoroscope` if processing
//         } catch (error) {
//             console.error(`Error fetching horoscope data for ${sign}:`, error);
//             return 'Unable to retrieve horoscope data at the moment.';
//         }
//     }
// }