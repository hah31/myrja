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
    name: 'ORIGINS',
    slug: 'origins',
    subtitle: 'The foundation of everything',
    heroImage: '/media/heroes/origins.jpg',
    audioSrc: '/audio/features/origins.mp3',
    media: [
      { type: 'image', src: '/media/features/origins/01.jpg', caption: 'Chapter I' },
      { type: 'image', src: '/media/features/origins/02.jpg', caption: 'Chapter II' },
      { type: 'video', src: '/media/features/origins/01.mp4', caption: 'The Beginning' },
    ],
  },
  {
    name: 'ASCENT',
    slug: 'ascent',
    subtitle: 'The climb toward something greater',
    heroImage: '/media/heroes/ascent.jpg',
    audioSrc: '/audio/features/ascent.mp3',
    media: [
      { type: 'image', src: '/media/features/ascent/01.jpg', caption: 'Elevation' },
      { type: 'image', src: '/media/features/ascent/02.jpg', caption: 'The Peak' },
      { type: 'video', src: '/media/features/ascent/01.mp4', caption: 'In Motion' },
    ],
  },
  {
    name: 'DOMINION',
    slug: 'dominion',
    subtitle: 'Command and presence',
    heroImage: '/media/heroes/dominion.jpg',
    audioSrc: '/audio/features/dominion.mp3',
    media: [
      { type: 'image', src: '/media/features/dominion/01.jpg', caption: 'Control' },
      { type: 'image', src: '/media/features/dominion/02.jpg', caption: 'Authority' },
      { type: 'video', src: '/media/features/dominion/01.mp4', caption: 'Command' },
    ],
  },
  {
    name: 'LEGACY',
    slug: 'legacy',
    subtitle: 'What remains when nothing else does',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/features/legacy.mp3',
    media: [
      { type: 'image', src: '/media/features/legacy/01.jpg', caption: 'Permanence' },
      { type: 'image', src: '/media/features/legacy/02.jpg', caption: 'Echo' },
      { type: 'video', src: '/media/features/legacy/01.mp4', caption: 'What Endures' },
    ],
  },
]
