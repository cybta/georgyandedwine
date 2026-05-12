type MainData = {
  title: string;
  description: string;
  date: string;
};

const englishData : MainData = {
  title: 'Georgy & Edwine',
  description: 'Are getting married!',
  date: 'Saturday, July 25, 2026',
}

const russianData : MainData = {
  title: 'Георгий & Эдвин',
  description: 'Женятся!',
  date: 'Суббота, 25 июля 2026 г.',
}

const mainData = (lang: 'en' | 'ru'): MainData | undefined => {
  switch (lang) {
    case 'en':
      return englishData;
    case 'ru':
      return russianData;
    default:
      return englishData;
  }
};

export default mainData;
