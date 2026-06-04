// Sample posts for demo - replace with Firebase data when connected
export const samplePosts = [
  {
    id: '1',
    title: 'Ethereal Bloom',
    description: 'A dreamy floral composition with soft pastels and flowing organic shapes. Inspired by spring gardens at twilight.',
    category: 'Digital Art',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80',
    likes: 234,
    commentsCount: 18,
    views: 1205,
    createdAt: '2026-05-28',
    comments: [
      { id: 'c1', name: 'Sarah', text: 'This is absolutely gorgeous! Love the color palette 💕', createdAt: '2026-05-29' },
      { id: 'c2', name: 'Alex', text: 'The composition is stunning!', createdAt: '2026-05-30' },
    ],
  },
  {
    id: '2',
    title: 'Rose Geometry',
    description: 'Geometric patterns meeting organic rose forms. A blend of mathematics and nature.',
    category: 'Illustration',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    likes: 189,
    commentsCount: 12,
    views: 890,
    createdAt: '2026-05-25',
    comments: [
      { id: 'c3', name: 'Maya', text: 'The blend of geometric and organic is perfection!', createdAt: '2026-05-26' },
    ],
  },
  {
    id: '3',
    title: 'Cosmic Petals',
    description: 'Where the cosmos meets botanical art. Galaxies within flower petals.',
    category: 'Mixed Media',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80',
    likes: 312,
    commentsCount: 25,
    views: 1567,
    createdAt: '2026-05-20',
    comments: [],
  },
  {
    id: '4',
    title: 'Velvet Dreams',
    description: 'Rich textures and deep magentas create an atmosphere of luxury and mystery.',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    likes: 156,
    commentsCount: 8,
    views: 723,
    createdAt: '2026-05-18',
    comments: [],
  },
  {
    id: '5',
    title: 'Blush Canvas',
    description: 'Abstract expressionism in shades of pink. Textured brushstrokes telling stories.',
    category: 'Abstract',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    likes: 278,
    commentsCount: 15,
    views: 1100,
    createdAt: '2026-05-15',
    comments: [
      { id: 'c4', name: 'Jordan', text: 'I can feel the emotion in every stroke 🎨', createdAt: '2026-05-16' },
    ],
  },
  {
    id: '6',
    title: 'Sakura Whispers',
    description: 'Delicate cherry blossom inspired patterns with traditional Japanese influences.',
    category: 'Pattern Design',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80',
    likes: 445,
    commentsCount: 32,
    views: 2100,
    createdAt: '2026-05-12',
    comments: [],
  },
  {
    id: '7',
    title: 'Neon Flora',
    description: 'Where cyberpunk aesthetics meet botanical illustration. Digital nature.',
    category: 'Digital Art',
    imageUrl: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&q=80',
    likes: 198,
    commentsCount: 14,
    views: 856,
    createdAt: '2026-05-10',
    comments: [],
  },
  {
    id: '8',
    title: 'Marble Rose',
    description: 'Luxury meets nature. Rose gold and marble textures in a minimalist composition.',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&q=80',
    likes: 367,
    commentsCount: 22,
    views: 1890,
    createdAt: '2026-05-08',
    comments: [],
  },
  {
    id: '9',
    title: 'Watercolor Dawn',
    description: 'Soft watercolor washes capturing the first light of dawn over rolling hills.',
    category: 'Watercolor',
    imageUrl: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?w=600&q=80',
    likes: 223,
    commentsCount: 10,
    views: 945,
    createdAt: '2026-05-05',
    comments: [],
  },
  {
    id: '10',
    title: 'Petal Mosaic',
    description: 'Intricate mosaic patterns crafted from hundreds of individual petal photographs.',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&q=80',
    likes: 289,
    commentsCount: 19,
    views: 1340,
    createdAt: '2026-05-02',
    comments: [],
  },
];

export const categories = ['All', 'Digital Art', 'Illustration', 'Photography', 'Abstract', 'Mixed Media', 'Pattern Design', 'Design', 'Watercolor'];

export const ownerInfo = {
  name: 'Sutrina Bhattacharyya',
  tagline: 'Digital Artist & Creative Designer',
  bio: "Hi there! I'm Sutrina, a passionate digital artist and designer who finds beauty in the intersection of technology and organic forms. My work explores color, texture, and emotion through various mediums — from digital illustrations to mixed media compositions. Every piece I create is a story waiting to be discovered.",
  skills: ['Digital Art', 'Illustration', 'UI/UX Design', 'Photography', 'Watercolor', 'Mixed Media'],
  stats: { posts: 48, followers: '2.4K', likes: '12K' },

  // Professional Details
  profession: 'Senior Creative Designer & Digital Artist',
  location: 'San Francisco, CA',
  email: 'hello@ariarose.art',
  website: 'www.ariarose.art',
  availableForWork: true,

  // Social Media
  socials: {
    instagram: '@aria.rose.art',
    instagramUrl: 'https://instagram.com/aria.rose.art',
    pinterest: '@ariarosecreative',
    pinterestUrl: 'https://pinterest.com/ariarosecreative',
    dribbble: '@ariarose',
    dribbbleUrl: 'https://dribbble.com/ariarose',
    behance: '@ariaroseart',
    behanceUrl: 'https://behance.net/ariaroseart',
  },

  // Work Experience
  experience: [
    {
      role: 'Lead Creative Designer',
      company: 'PixelCraft Studios',
      period: '2023 – Present',
      description: 'Leading a team of 8 designers creating brand identities and digital campaigns for Fortune 500 clients.',
    },
    {
      role: 'Senior Illustrator',
      company: 'ArtWave Agency',
      period: '2020 – 2023',
      description: 'Created 200+ illustrations for editorial, advertising, and product packaging across global markets.',
    },
    {
      role: 'Freelance Digital Artist',
      company: 'Self-Employed',
      period: '2017 – 2020',
      description: 'Built a client base of 50+ brands. Specialized in digital art, mixed media, and brand illustrations.',
    },
  ],

  // Education
  education: [
    {
      degree: 'MFA in Digital Arts',
      school: 'California Institute of the Arts',
      year: '2017',
    },
    {
      degree: 'BFA in Fine Arts',
      school: 'Rhode Island School of Design',
      year: '2015',
    },
  ],

  // Awards
  awards: [
    { title: 'Adobe Design Achievement Award', year: '2025' },
    { title: 'Communication Arts Illustration Annual', year: '2024' },
    { title: 'Society of Illustrators Gold Medal', year: '2023' },
    { title: 'Behance Portfolio Review Winner', year: '2022' },
  ],

  // Tools & Software
  tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Procreate', 'Figma', 'Blender', 'After Effects', 'Cinema 4D', 'Substance Painter'],

  // Languages
  languages: ['English (Native)', 'Japanese (Conversational)', 'French (Basic)'],
};
