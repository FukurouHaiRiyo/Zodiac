const translateTextMicrosoft = async (text: string): Promise<string> => {
  const response = await fetch(
    'https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=ro&from=en&textType=plain',
    {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '1591618643mshd45411114ae3579p181d33jsn4a85dd05e1ea',
        'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
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