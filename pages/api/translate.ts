import * as deepl from 'deepl-node';
import { NextApiRequest, NextApiResponse } from 'next';

import { deeplKey } from '@/app/env';

const authKey = deeplKey; 
const translator = new deepl.Translator(authKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text, sourceLang, targetLang } = req.body;

    try {
      const result = await translator.translateText(text, sourceLang, targetLang);

      // Handle both single text and array of texts
      const translatedText = Array.isArray(result)
        ? result.map((item) => item.text).join(' ') // Combine translations if input is an array
        : result.text;

      res.status(200).json({ translatedText });
    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({ error: 'Translation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

