import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Habit Penalty',
    short_name: 'Habit Penalty',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/chick.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/chick.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}