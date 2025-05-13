import { NextResponse } from 'next/server';

export async function GET() {
  // Statik sayfalar
  const staticPages = [
    {
      url: 'https://localhost:3000',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://localhost:3000/login',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://localhost:3000/events',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://localhost:3000/announcements',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://localhost:3000/gallery',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://localhost:3000/about',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://localhost:3000/contact',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // XML formatında sitemap oluştur
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                              http://www.google.com/schemas/sitemap-image/1.1
                              http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
      ${staticPages.map(page => `
        <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastModified}</lastmod>
          <changefreq>${page.changeFrequency}</changefreq>
          <priority>${page.priority}</priority>
          <image:image>
            <image:loc>${page.url}/og-image.jpg</image:loc>
            <image:title>${page.url.split('/').pop() || 'Ana Sayfa'}</image:title>
          </image:image>
        </url>
      `).join('')}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 