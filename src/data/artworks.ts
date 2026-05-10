export interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  imageUrl: string;
  price: number;  // in Rs
  featured: boolean;
  sizes: string[];
  description: string;
}

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Al-Fatiha',
    artist: 'Abubakar.Arts', 
    category: 'Quranic',
    imageUrl: '/images/al-fatiha.jpg', 
    price: 400,      // 8/8
    featured: true,
    sizes: ['16x20"', '24x36"'],
    description: 'A beautiful and modern interpretation of Surah Al-Fatiha.',
  },
  {
    id: '2',
    title: 'Bismillah',
    artist: 'Abubakar.Arts',
    category: 'Quranic',
    imageUrl: '/images/bismillah.jpg', 
    price: 2000,     // 12/24
    featured: false,
    sizes: ['12x18"', '18x24"', '24x36"'],
    description: 'A striking minimalist piece featuring "Bismillahir Rahmanir Raheem."',
  },
  {
    id: '3',
    title: 'Ayat al-Kursi',
    artist: 'Abubakar.Arts',
    category: 'Quranic',
    imageUrl: '/images/ayat-al-kursi.jpg', 
    price: 1000,     // 12/12
    featured: true,
    sizes: ['18x24"', '30x40"'],
    description: 'A grand and detailed canvas depicting Ayat al-Kursi.',
  },
  {
    id: '4',
    title: 'Surah Al-Asr',
    artist: 'Abubakar.Arts',
    category: 'Quranic',
    imageUrl: '/images/surah-al-asr.jpg', 
    price: 3500,     // 36/48
    featured: false,
    sizes: ['16x20"', '24x36"'],
    description: 'An elegant rendering of Surah Al-Asr.',
  },
  {
    id: '5',
    title: 'Hasbunallah',
    artist: 'Abubakar.Arts',
    category: 'Duas',
    imageUrl: '/images/hasbunallah.jpg', 
    price: 400,
    featured: false,
    sizes: ['12x12"', '16x16"'],
    description: 'A beautiful circular design with "Hasbunallah."',
  },
  {
    id: '6',
    title: 'Subhanallah',
    artist: 'Abubakar.Arts',
    category: 'Duas',
    imageUrl: '/images/subhanallah.jpg', 
    price: 1200,
    featured: false,
    sizes: ['12x18"', '18x24"'],
    description: 'A vibrant piece with the phrase "Subhanallah."',
  },
  {
    id: '7',
    title: 'Alhamdulillah',
    artist: 'Abubakar.Arts',
    category: 'Duas',
    imageUrl: '/images/alhamdulillah.jpg', 
    price: 1000,
    featured: true,
    sizes: ['16x20"', '24x36"'],
    description: 'A striking design with "Alhamdulillah."',
  },
  {
    id: '8',
    title: 'Mashallah',
    artist: 'Abubakar.Arts',
    category: 'Duas',
    imageUrl: '/images/mashallah.jpg', 
    price: 3500,
    featured: false,
    sizes: ['12x16"', '18x24"'],
    description: 'A graceful piece with "Mashallah."',
  },
  {
    id: '9',
    title: 'Surah Ar-Rahman',
    artist: 'Abubakar.Arts',
    category: 'Quranic',
    imageUrl: '/images/surah-ar-rahman.jpg', 
    price: 400,
    featured: true,
    sizes: ['20x30"', '30x40"'],
    description: 'A large, mesmerizing piece with verses from Surah Ar-Rahman.',
  },
  {
    id: '10',
    title: 'Innalillahi',
    artist: 'Abubakar.Arts',
    category: 'Duas',
    imageUrl: '/images/innalillahi.jpg', 
    price: 1200,
    featured: false,
    sizes: ['12x12"', '16x16"'],
    description: 'A minimalist piece with the phrase "Inna Lillahi wa inna ilayhi raji\'un."',
  },
];

export const categories = [
  'All',
  ...Array.from(new Set(artworks.map(a => a.category))),
];
