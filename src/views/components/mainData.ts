type MainData = {
  title: string;
  description: string;
  date: string;
};

const englishData : MainData = {
  title: 'Georgy & Edwine',
  description: 'Are getting married!',
  date: '25.July.2026',
}

const russianData : MainData = {
  title: 'Георгий & Эдвин',
  description: 'Женятся!',
  date: '25.Июля.2026',
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
