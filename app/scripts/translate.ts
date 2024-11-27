const translateTextMyMemory = async (text: string, from: string, to: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // MyMemory API response structure
    const translatedText = data.responseData.translatedText;

    if (!translatedText) {
      throw new Error('No translation found in the API response.');
    }

    console.log(data); // Optional: Log the full response for debugging
    return translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error; // Re-throw error to handle it upstream if needed
  }
};

export default translateTextMyMemory;
