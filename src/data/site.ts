// Verified business facts only. Source: CLIENT_REQUIREMENTS.md.
// Do not add fields here that were not explicitly supplied by the client.

export const site = {
  name: 'Hammer Boarding House',
  tagline: 'Student boarding house',
  description:
    'Affordable, secure student boarding house a short walk from UNILUS, with furnished rooms and Wi-Fi, security, garbage collection and electricity included in rent.',

  email: 'ferdsambulo@gmail.com',
  phoneDisplay: '+260 977 802 016',
  phoneHref: 'tel:+260977802016',

  // Digits only, as required by the wa.me link format.
  whatsappNumber: '260977802016',

  deposit: 'K500',
  priceMin: 2000,
  priceMax: 3000,
  currency: 'K',
  occupancyPerRoom: 2,
  houseCount: 7,

  furniture: ['Single board beds', 'Study tables', 'Wardrobes'],
  includedInRent: ['Wi-Fi', 'Security', 'Garbage collection', 'Electricity'],

  nearby: ['Restaurants', 'Pharmacies', 'Supermarkets'],
  distanceUnilus: 'Approximately a 3-minute walk to the small gate',
  distanceShops: 'Approximately a 7-minute walk',
  distanceTransport: 'Approximately a 7-minute walk',

  houseRules: ['No boys allowed', 'Curfew applies'],
  visitorPolicy: 'Female friends and close relatives only',

  checkIn: 'Flexible',
  moveOut: 'Flexible',
  earlyDeparturePolicy:
    'If a tenant leaves before their rental period ends, they forfeit the remaining rental period/payment.',
} as const;
