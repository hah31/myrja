export interface MediaItem {
  type: 'image' | 'video'
  src: string
  caption?: string
}

export interface Feature {
  name: string
  slug: string
  subtitle?: string
  heroImage: string
  audioSrc: string
  media: MediaItem[]
}

export const features: Feature[] = [
  {
    name: 'MYRJA',
    slug: 'myrja',
    subtitle: 'The foundation of everything',
    heroImage: '/media/heroes/origins.jpg',
    audioSrc: '/audio/track-bazooka.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/mirjalickinglips.jpg', caption: 'Mirja licks his lips' },
      { type: 'image', src: '/media/features/mirja/suhoorfestmirja.jpg', caption: 'Mirja gets brain at Suhoorfest' },
      { type: 'video', src: '/media/features/mirja/mirjagoldeneyes.png', caption: 'Mirja turns evil' },
    ],
  },
  {
    name: 'NABEELIUS',
    slug: 'nabeel',
    subtitle: 'Estupid fricken Nabeel',
    heroImage: '/media/heroes/ascent.jpg',
    audioSrc: '/audio/features/ascent.mp3',
    media: [
      { type: 'image', src: '/media/features/ascent/01.jpg', caption: 'Elevation' },
      { type: 'image', src: '/media/features/ascent/02.jpg', caption: 'The Peak' },
      { type: 'video', src: '/media/features/ascent/01.mp4', caption: 'In Motion' },
    ],
  },
  {
    name: 'DAVID',
    slug: 'david',
    subtitle: 'Hiu Ming David Kao',
    heroImage: '/media/heroes/dominion.jpg',
    audioSrc: '/audio/track-yourphonelinging.mp3',
    media: [
      { type: 'image', src: '/media/features/dominion/01.jpg', caption: 'Control' },
      { type: 'image', src: '/media/features/dominion/02.jpg', caption: 'Authority' },
      { type: 'video', src: '/media/features/dominion/01.mp4', caption: 'Command' },
    ],
  },
  {
    name: 'SKINNY DIPPER',
    slug: 'skinny dipper',
    subtitle: 'No clothes here...',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-kissmemore.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/cutemani.jpeg', caption: 'what a sweet guy' },
      { type: 'image', src: '/media/features/mirja/amaanpinkolympics.png', caption: 'Mani performs at the Olympics' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'What Endures' },
    ],
  },
  {
    name: 'THE BUCK',
    slug: 'the buck',
    subtitle: 'Fathered 70% of bucks in his region',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-amornapraia.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/buckinpasture.png', caption: 'a fully bearded buck grazing in the pasture' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'What Endures' },
    ],
  },
]
