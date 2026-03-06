'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAudio } from '@/context/AudioContext'
import { asset } from '@/lib/asset'
import { Feature } from '@/data/features'
import RouteGuard from '@/components/RouteGuard'
import { getNextFeatureSlug, getPreviousFeatureSlug } from '@/lib/featureNavigation'
import FeatureNavigation from '@/components/FeatureNavigation'

interface Props {
  feature: Feature
}

// Staggered text reveal
const fadeRise = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturePageClient({ feature }: Props) {
  const { play, unlocked } = useAudio()
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // Parallax: portrait moves up slower than scroll
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Play feature-specific track
  useEffect(() => {
    if (unlocked) {
      play(asset(feature.audioSrc), feature.name)
    }
  }, [unlocked, feature.audioSrc, feature.name, play])

  return (
    <RouteGuard>
      <div style={{ background: '#050508', minHeight: '100vh', position: 'relative' }}>
        {/* ── Back nav ──────────────────────────────────── */}
        <div
          style={{
            position: 'fixed',
            top: 'clamp(0.75rem, 2vw, 1.5rem)',
            left: 'clamp(0.75rem, 2vw, 1.5rem)',
            zIndex: 100,
          }}
        >
          <Link
            href="/home"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none',
              transition: 'color 0.3s',
              padding: '0.45rem 1rem',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 4,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
          >
            ← Back
          </Link>
        </div>

        {/* ── Fullscreen hero ───────────────────────────── */}
        <div
          ref={heroRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Portrait with parallax */}
          <motion.div
            style={{ y: portraitY, position: 'absolute', inset: '-10%' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(feature.heroImage)}
              alt={feature.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
              onError={(e) => {
                // Graceful fallback if portrait missing
                ;(e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          </motion.div>

          {/* Dark gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(5,5,8,0.35) 0%, rgba(5,5,8,0.50) 50%, rgba(5,5,8,0.92) 100%)',
            }}
          />

          {/* Blue bloom */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(30,58,138,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Hero text */}
          <motion.div
            style={{ opacity: heroOpacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                color: 'rgba(59,130,246,0.65)',
                marginBottom: '1.5rem',
              }}
            >
              {feature.subtitle ?? 'An Editorial'}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35 }}
              style={{
                fontSize: 'clamp(3rem, 12vw, 10rem)',
                letterSpacing: '0.4em',
                fontWeight: 300,
                textTransform: 'uppercase',
                color: '#eeeef5',
                lineHeight: 1,
                textShadow: '0 0 100px rgba(30,58,138,0.5)',
              }}
            >
              {feature.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              style={{
                marginTop: '3rem',
                fontSize: '0.55rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              Scroll to continue
            </motion.p>
          </motion.div>
        </div>

        {/* ── Content body ──────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: 'clamp(320px, 95vw, 720px)',
            margin: '0 auto',
            padding: 'clamp(1.5rem, 8vw, 7rem) clamp(1rem, 4vw, 2rem)',
          }}
        >
          {/* Section header */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '4rem' }}
          >
            <div
              style={{
                width: 32,
                height: 1,
                background: 'rgba(59,130,246,0.5)',
                marginBottom: '2rem',
              }}
            />
            <p
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 2,
              }}
            >
              Chapter · {feature.name}
            </p>
          </motion.div>

          {/* Text blocks */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={fadeRise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{ marginBottom: '3rem' }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                  lineHeight: 1.9,
                  color: 'rgba(232,232,240,0.7)',
                  letterSpacing: '0.02em',
                }}
              >
                {getPlaceholderText(feature.name, i)}
              </p>
            </motion.div>
          ))}

          {/* ── Media gallery ─────────────────────────── */}
          {feature.media.length > 0 && (
            <motion.div
              variants={fadeRise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8 }}
              style={{ marginTop: '5rem' }}
            >
              <p
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '2rem',
                }}
              >
                Gallery
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                }}
              >
                {feature.media.map((item, idx) => (
                  <motion.figure
                    key={idx}
                    variants={fadeRise}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    style={{ margin: 0 }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        paddingBottom: '66.67%',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      {item.type === 'image' ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={asset(item.src)}
                          alt={item.caption ?? ''}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <video
                          src={asset(item.src)}
                          controls
                          playsInline
                          muted
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                    </div>
                    {item.caption && (
                      <figcaption
                        style={{
                          marginTop: '0.5rem',
                          fontSize: '0.58rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.28)',
                        }}
                      >
                        {item.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Footer nav ────────────────────────────── */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '6rem',
              paddingTop: '3rem',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link
              href="/home"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e8e8f0' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
            >
              ← Return Home
            </Link>
            <p
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.18)',
              }}
            >
              {feature.name}
            </p>
          </motion.div>

          {/* ── Feature navigation ─────────────────────── */}
          <FeatureNavigation
            currentSlug={feature.slug}
            previousSlug={getPreviousFeatureSlug(feature.slug)}
            nextSlug={getNextFeatureSlug(feature.slug)}
            featureName={feature.name}
          />
        </div>
      </div>
    </RouteGuard>
  )
}

// Placeholder editorial copy per feature
function getPlaceholderText(name: string, index: number): string {
  const blocks: Record<string, string[]> = {
    DAVID: [
      'Mr. David Kao is a legendary man.  He once saved my life from a rabid Buck that was voraciously trying to inject buck serum into me.',
      'Mr. Kao might be leaving Hinsdale Central at the end of this year, so please get your bathroom hotboxing sessions in before the end of the year.  Visit 103 College Crossing in Rolling Meadows, IL to meet his family.',
      'A few David quotes: "OMA OMA OMA GET OUT OF MY CASSWOOM!!! as well as "ayaan it is too early for round 2" as well as "you wanna pay balls?"  and yeah ayaan, the owner of this site, has been dating him for 4 years now.',
    ],
    MYRJA: [
      'Oh, Myrja.  What to say about Myrja.  He is an indomitable force, voraciously collecting phone numbers and snapchats at suhoorfest, munching on all sorts of goodies.',
      'Myrja has a great relationship with his good friend ARK.',
      'I, ayaan bandukda, am choosing not to slander Myrjas name too much, as he is a hafiz and he likes men.',
    ],
    NABEEEL: [
      'Nabeel does not announce himself. He arrives in a room, infinite aura, math team awards stacked in his pocket.  Everyones good friend and great side chick.',
      'Presence is the most unclassifiable quality in a person. It cannot be manufactured or rehearsed. It emerges from a coherence between interior life and external expression — when what you carry matches what you show.',
      'The domain of influence extends far beyond the visible. Every decision, every refusal, every silence shapes the field around it. Power understood this way is not possession but responsibility.',
    ],
    DIPPER: [
      'Is an introduction really necessary for someone we all know so well?',
      'He might be gay, were not 100% sure.',
      'Known for entering bodies of water with no clothes on.',
    ],
    THEBUCK: [
      'If youve never been to Bucktown, USA, youve never truly lived.',
      '16oz bottles of buck serum available on sale now at shop.myrja.com.',
      'A cold war hero.',
    ],
    BAGUL: [
      'EVERYTHING but the bagel.',
      'Bro has beef with suhail from IFS',
      'Creator of the legendary Mirja doja cat edit (viewable on the mirja page)',
    ],
    AKHMEDD: [
      'Trained with master shifu.',
      'Chooses dinner, please over inner peace every day',
      'Caught at qahwah house w 2 desi broads',
    ],
    FAHTEE: [
      'Pakistani frat leader Fahtee absolutely framemogs indian frat leader Ayin',
      'Hes been doing bicep curls since before you were born',
      'The echo is very peaceful',
    ],
    HAMJA: [
      'Most know him as Hamas, but real ones call him Lenny.',
      'He also might be gay, were not 100% sure.',
      'Can easily dunk on the buck',
    ],
    WORMIN: [
      'Barely made the cut for this website... hes got a reputation to uphold',
      'There was a different reference here.  But it had to be censored upon Wormins request.  Lets just say wormin is a fricken legend.',
      'Still waiting on that worm video.',
    ],
    YAZNIK: [
      'Bro might be top 5 finest shyt in LA.',
      'Best friends with Nabeel hussain, the co-creator of this website',
      'Known for entering bodies of water with all his clothes on.',
    ],
    BAWAA: [
      'The real legend of this website, he leaked every known bit of info about Mirja and ARK.',
      'Never lets people drive his car',
      'Truly a little fuzzball on the inside.',
    ],
    BUSTIN: [
      'The real legend of this website, he leaked every known bit of info about Mirja and ARK.',
      'Never lets people drive his car',
      'Truly a little fuzzball on the inside.',
    ],
    SIKANDER: [
      'The real legend of this website, he leaked every known bit of info about Mirja and ARK.',
      'Never lets people drive his car',
      'Truly a little fuzzball on the inside.',
    ],
    HEZYN: [
      'The real legend of this website, he leaked every known bit of info about Mirja and ARK.',
      'Never lets people drive his car',
      'Truly a little fuzzball on the inside.',
    ],
    KHANIE: [
      'The real legend of this website, he leaked every known bit of info about Mirja and ARK.',
      'Never lets people drive his car',
      'Truly a little fuzzball on the inside.',
    ],
  }
  return blocks[name]?.[index] ?? 'An editorial note forthcoming.'
}
