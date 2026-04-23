type MainData = {
  title: string;
  description: string;
  date: string;
};

const mainData = (lang: 'en' | 'ru'): MainData | undefined => {
  switch (lang) {
    case 'en':
      return {
        title: 'Georgy & Edwine',
        description: 'Are getting married!',
        date: '25.July.2026',
      };
    case 'ru':
      return {
        title: 'Георгий & Эдвин',
        description: 'Женятся!',
        date: '25.Июля.2026',
      };
    default:
      return {
        title: 'Georgy & Edwine',
        description: 'Are getting married!',
        date: '25.July.2026',
      };
  }
};

export default mainData;
