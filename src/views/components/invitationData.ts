export type InvitationData = {
  quote: {
    text: string;
    ref: string;
  }
  intro: string;
  georgyFamily: string;
  edwineFamily: string;
  invitationText: string;
  names: string;
  date: string;
  celebration: {
    churchData: {
      title: string;
      time: string;
      location: string;
      map: string;
    };
    restaurantData: {
      title: string;
      time: string;
      location: string;
      map: string;
    };
  }

  gift: {
    title: string;
    wishlistMsg: string;
    wishlistDetails: string;
  }
};

const englisData: InvitationData = {
  quote: {
    text: 'Therefore what God has joined together, let no one separate.',
    ref: 'Mark 10:9'
  },
  intro: 'With joyous hearts,',
  georgyFamily: 'Oleg & Natalia BYKHANOV',
  edwineFamily: 'Nazih & Lydia SAAD',
  invitationText: 'Request the honor of your presence at the wedding of',
  names: 'Georgy & Edwine',
  date: 'Saturday, July 25, 2026',
  celebration: {
    churchData: {
      title: 'The Ceremony',
      time: '6:00 PM',
      location: 'St.Georges Church Bsalim',
      map: 'https://maps.app.goo.gl/bhHam1LGiNJ7usCg9'
    },
    restaurantData: {
      title: 'The Celebration',
      time: '8:30 PM',
      location: 'Cielo Verde Ghazir',
      map: 'https://maps.app.goo.gl/41HfYHhMgVz6GR5g8'
    }
  },
  gift: {
    title: 'Wedding Registry',
    wishlistMsg: 'For those who wish, a wedding registry is available at',
    wishlistDetails: 'WHISHLIST HERE',
  }
}

const russianData: InvitationData = {
  quote: {
    text: 'Итак, что Бог сочетал, того человек да не разлучает.',
    ref: 'От Марка 10:9'
  },
  intro: 'С радостью в сердцах,',
  georgyFamily: 'Олег и Наталья Быхановы',
  edwineFamily: 'Назих и Лидия Саад',
  invitationText: 'Просят почтить их присутствием на свадьбе своих сына и дочери',
  names: 'Георгий и Эдвин',
  date: '25 июля 2026',
  celebration: {
    churchData: {
      title: 'Церемонии',
      time: '18:00',
      location: 'St.Georges Church Bsalim',
      map: 'https://maps.app.goo.gl/bhHam1LGiNJ7usCg9'
    },
    restaurantData: {
      title: 'Празднование',
      time: '20:30',
      location: 'Cielo Verde Ghazir',
      map: 'https://maps.app.goo.gl/41HfYHhMgVz6GR5g8'
    }
  },
  gift: {
    title: 'Свадебные подарки',
    wishlistMsg: 'Для тех, кто желает сделать подарок, наш список пожеланий доступен по ссылке:',
    wishlistDetails: 'WISHLIST HERE',
  }
}

const invitationData = (lang: 'en' | 'ru'): InvitationData | undefined => {
  switch (lang) {
    case 'en':
      return englisData;
    case 'ru':
      return russianData;
    default:
      return englisData;
  }
};

export default invitationData;
