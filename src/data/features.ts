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
    name: 'NABEEEL',
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
      { type: 'image', src: '/media/features/mirja/mrkaoprofessional.jpeg', caption: 'A domesticated professional Ming.' },
      { type: 'image', src: '/media/features/mirja/mrkaoforest.jpeg', caption: 'A wild Ming in the forests of Palatine.' },
      { type: 'image', src: '/media/features/mirja/bawamirrorpic.jpeg', caption: 'OMA GET OUT OF MY CLASSROOM!' },
    ],
  },
  {
    name: 'DIPPER',
    slug: 'skinnydipper',
    subtitle: 'No clothes here...',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-kissmemore.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/amaanpinkolympics.png', caption: 'Mani performs at the Olympics' },
      { type: 'image', src: '/media/features/mirja/manitongue.jpeg', caption: 'That tongue is relentless' },
    ],
  },
  {
    name: 'THEBUCK',
    slug: 'thebuck',
    subtitle: 'Fathered 70% of bucks in his region',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/track-amornapraia.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/buckinpasture.png', caption: 'a fully bearded buck grazing in the pasture' },
      { type: 'image', src: '/media/features/mirja/yusibicycle.png', caption: 'Who knew his legs could go that far?' },
      { type: 'image', src: '/media/features/mirja/fjallraven.jpeg', caption: 'Fjallraven pre-serum.' },
    ],
  },
  {
    name: 'BAGUL',
    slug: 'bagul',
    subtitle: 'Everything but the bagul',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/bagel.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/bagullaughing.jpeg', caption: 'Bagul turned bagel' },
      { type: 'image', src: '/media/features/mirja/bagulstaring.jpeg', caption: 'The eyes, chico.' },
      { type: 'image', src: '/media/features/mirja/bagulatifs.jpeg', caption: 'SCYARFACE' },
    ],
  },
  {
    name: 'AKHMEDD',
    slug: 'akhmed',
    subtitle: 'The 3rd rule of akhmed',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/kungfufighting.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/akhmedpixelated.jpeg', caption: 'the dragon warrior himself' },
      { type: 'image', src: '/media/features/mirja/akhmedlunch.jpeg', caption: 'legend' },
    ],
  },
  {
    name: 'FAHTEE',
    slug: 'faheet',
    subtitle: 'TOP 5 FATAHH',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/1am.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/fahteeshakes.png', caption: 'top 5 fahteh: thirsty fahteh' },
      { type: 'image', src: '/media/features/mirja/fahteecurling.jpeg', caption: 'top 5: fahteh gets jacked' },
      { type: 'image', src: '/media/features/mirja/fahteeflexing.jpeg', caption: 'top 5: indian frat leader ayin gets absolutley framemogged' },
    ],
  },
  {
    name: 'HAMJA',
    slug: 'hamja',
    subtitle: 'Also known as Hamas',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/hipsdontlie.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/hamzaandakhmed.jpeg', caption: 'hamas works at shaghf sumtimezz' },
      { type: 'image', src: '/media/features/mirja/rasalghul.jpeg', caption: 'Ras al Ghul lives.' },
      { type: 'image', src: '/media/features/mirja/hamzahood.jpeg', caption: 'bros not tuff' },
      { type: 'image', src: '/media/features/mirja/hamzaheadinhands.jpeg', caption: 'hamza is easily offended' },
    ],
  },
  {
    name: 'WORMIN',
    slug: 'wormin',
    subtitle: 'Yes, the worm video exists.',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/spinnin.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/mominbumper.jpeg', caption: 'bro got on forbes to sell scam courses' },
    ],
  },
  {
    name: 'YAZNIK',
    slug: 'yaznik',
    subtitle: 'Ravioli Ravioli, Answeroni Answeroni',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/lahills.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/yazinjawline.jpeg', caption: 'Top 5 finest shyt in LA' },
      { type: 'image', src: '/media/features/mirja/yazineyeswide.jpeg', caption: 'when he hears "Maryam Nawaz"' },
      { type: 'image', src: '/media/features/mirja/yazinbus.jpeg', caption: 'idk bro' },
    ],
  },
  {
    name: 'BAWAA',
    slug: 'bawa',
    subtitle: 'GET OUT OF MY CLASSROOM',
    heroImage: '/media/heroes/legacy.jpg',
    audioSrc: '/audio/everywherigo.mp3',
    media: [
      { type: 'image', src: '/media/features/mirja/bawaposing.jpeg', caption: 'Bebida Monkey' },
      { type: 'image', src: '/media/features/legacy/bawamirrorpic.jpeg', caption: 'The Bearded Dragon' },
    ],
  },
]
