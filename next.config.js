/** @type {import('next').NextConfig} */

// The site is served from a custom domain (myrja.com) at the root "/".
// No basePath or assetPrefix needed — all public assets resolve as
// myrja.com/audio/..., myrja.com/frames/..., etc.
// NEXT_PUBLIC_BASE_PATH is intentionally absent so asset() returns
// plain absolute paths ("/audio/track-a.mp3" etc).

module.exports = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
