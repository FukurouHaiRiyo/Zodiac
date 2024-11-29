const translateTextMyMemory = async (
    text: string,
    sourceLang: string | null,
    targetLang: string
  ): Promise<string> => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sourceLang, targetLang }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch translation');
      }
  
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error('Error translating text with API:', error);
      throw new Error('Translation failed');
    }
  };
  
  export default translateTextMyMemory;
  