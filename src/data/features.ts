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
      { type: 'image', src: '/media/features/mirja/suhoorfestlossymirja.jpeg', caption: 'Mirja gets brain at Suhoorfest' },
      { type: 'image', src: '/media/features/mirja/mirjagoldeneyes.png', caption: 'Mirja turns evil' },
      { type: 'image', src: '/media/features/mirja/mirjaxark.jpeg', caption: 'Mirja X ARK' },
      { type: 'image', src: '/media/features/mirja/mirjadog.jpeg', caption: 'Whos a good boy?' },
    ],
  },
  {
    name: 'NABEELIUS',
    slug: 'nabeel',
    subtitle: 'Estupid fricken Nabeel',
    heroImage: '/media/heroes/ascent.jpg',
    audioSrc: '/audio/track-4raws.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/nabeelgetsshot.png', caption: 'Goes around, comes around' },
      { type: 'image', src: '/media/features/mirja/nabeelmvp.png', caption: 'How does it feel to be stuck on the sideline...' },
      { type: 'image', src: '/media/features/mirja/nabeelstaring.png', caption: 'The eyes, chico.  They never lie.' },
      { type: 'image', src: '/media/features/mirja/nabeeltrophy.png', caption: 'nabeel hard carry' },
      { type: 'image', src: '/media/features/mirja/geekedvslockedin.jpeg', caption: 'bro thinks hes gang' },
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
  {
    name: 'BAGUL',
    slug: 'bagul',
    subtitle: 'Everything but the bagul',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/bagel.mp3',
    media: [
      { type: 'image', src: '/media/features/nick.png', caption: 'Bagul turned bagel' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'What Endures' },
    ],
  },
  {
    name: 'AKHMEDD',
    slug: 'akhmed',
    subtitle: 'The 3rd rule of akhmed',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-amornapraia.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/buckinpasture.png', caption: 'the dragon warrior himself' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'legend' },
    ],
  },
  {
    name: 'FAHEET',
    slug: 'faheet',
    subtitle: 'TOP 5 FATAHH',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-amornapraia.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/buckinpasture.png', caption: 'top 5 fahteh' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'SHEHJAAD' },
    ],
  },
  {
    name: 'HAMJA',
    slug: 'hamja',
    subtitle: 'Also known as Hamas',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-amornapraia.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/buckinpasture.png', caption: 'hamas works at shaghf sumtimezz' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'hamza monkey' },
    ],
  },
  {
    name: 'WORMIN',
    slug: 'wormin',
    subtitle: 'Yes, the worm video exists.',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-amornapraia.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/buckinpasture.png', caption: 'bro sells scam courses' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'the moestro' },
    ],
  },
  {
    name: 'YAZNIK',
    slug: 'yaznik',
    subtitle: 'Ravioli Ravioli, Answeroni Answeroni',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-amornapraia.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/buckinpasture.png', caption: 'Top 5 finest shyt in LA' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'Yazin the beautiful' },
    ],
  },
]
