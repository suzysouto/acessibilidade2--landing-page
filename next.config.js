/**
 * @type {import('next').NextConfig}
 */

const { withPlugins } = require('next-compose-plugins')
const withOptimizedImages = require('next-optimized-images')

const nextConfig = {
  staticPageGenerationTimeout: 60 * 5,
  webpack: (config) => config,
  compiler: {
    emotion: {
      sourceMap: true,
      autoLabel: 'dev-only',
      labelFormat: '[local]',
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload;',
          },
        ],
      },
    ]
  },
}

module.exports = withPlugins(
  [
    [
      withOptimizedImages,
      {
        images: {
          disableStaticImages: true,
          domains: [
            'media-selene-development.s3.amazonaws.com',
            'media.starlightcms.io',
            'clientes.advance.com.br',
          ],
        },
      },
    ],
    // Place new Next.js plugins here
  ],
  nextConfig,
)
