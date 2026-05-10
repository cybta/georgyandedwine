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
    gratitude: string;
    wishlistMsg: string;
    wishlistDetails: string;
    reservationMsg: string;
  }
};

const englisData: InvitationData = {
  quote: {
    text: 'Therefore what God has joined together, let no one separate.',
    ref: 'Mark 10:9'
  },
  intro: 'With joyous hearts,',
  georgyFamily: 'Oleg & Natalia Bykhanov',
  edwineFamily: 'Nazih & Lydia Saad',
  invitationText: 'Request the honor of your presence at the wedding of their son and daughter',
  names: 'Georgy & Edwine',
  date: '25.July.2026',
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
    gratitude: 'Your love, laughter and presence are all we could wish for on our special day.',
    wishlistMsg: 'For those who wish, a wedding registry is available at',
    wishlistDetails: 'WHISHLIST HERE',
    reservationMsg: 'Kindly confirm your presence Before July 1st.'
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
    gratitude: 'Ваша любовь, смех и присутствие — это всё, о чем мы могли бы мечтать в наш особенный день.',
    wishlistMsg: 'Для тех, кто желает сделать подарок, наш список пожеланий доступен по ссылке:',
    wishlistDetails: 'WISHLIST HERE',
    reservationMsg: 'Kindly confirm your presence Before July 1st.'
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
