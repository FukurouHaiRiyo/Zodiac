import { translateApi, translateHost } from "../env";

const translateTextMicrosoft = async (text: string): Promise<string> => {
  const response = await fetch(
    'https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=ro&from=en&textType=plain',
    {
      method: 'POST',
      headers: {
        'x-rapidapi-key': translateApi,
        'x-rapidapi-host': translateHost,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ text }]),
    }
  );

  const data = await response.json();
  console.log(data);
  return data[0].translations[0].text;
};

export default translateTextMicrosoft;