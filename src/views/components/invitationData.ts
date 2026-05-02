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
    title: string;
    restaurantData: {
      time: string;
      location: string;
      map: string;
    };
    churchData: {
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
    title: 'The Celebration',
    churchData: {
      time: '6:15 PM',
      location: 'Restaurant Name',
      map: 'locationmapHere'
    },
    restaurantData: {
      time: '6:15 PM',
      location: 'Restaurant Name',
      map: 'locationmapHere'
    }
  },
  gift: {
    title: 'Gift Registry',
    gratitude: 'Your love, laughter and presence are all we could wish for on our special day.',
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
    title: 'Торжество',
    churchData: {
      time: '18:15',
      location: 'Название ресторана',
      map: 'locationmapHere'
    },
    restaurantData: {
      time: '18:15',
      location: 'Название ресторана',
      map: 'locationmapHere'
    }
  },
  gift: {
    title: 'Свадебные подарки',
    gratitude: 'Ваша любовь, смех и присутствие — это всё, о чем мы могли бы мечтать в наш особенный день.',
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
