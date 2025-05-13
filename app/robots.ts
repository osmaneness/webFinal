import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Tüm arama motorları için
        allow: [
          '/', // Ana sayfa
          '/events', // Etkinlikler sayfası
          '/announcements', // Duyurular sayfası
          '/gallery', // Galeri sayfası
          '/about', // Hakkımızda sayfası
          '/contact', // İletişim sayfası
        ],
        disallow: [
          '/admin/*', // Admin paneli ve alt sayfaları
          '/api/*', // API endpoint'leri
          '/login', // Giriş sayfası
          '/_next/*', // Next.js sistem dosyaları
          '/static/*', // Statik dosyalar
          '/*.json$', // JSON dosyaları
          '/*.xml$', // XML dosyaları (sitemap hariç)
        ],
      },
      {
        userAgent: 'GPTBot', // ChatGPT için özel kural
        disallow: ['/'], // Tüm siteyi taramasını engelle
      },
      {
        userAgent: 'CCBot', // Common Crawl için özel kural
        disallow: ['/'], // Tüm siteyi taramasını engelle
      },
    ],
    sitemap: 'https://localhost:3000/sitemap.xml', // Sitemap konumu
    host: 'https://localhost:3000', // Ana domain
  };
} 