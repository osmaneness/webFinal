import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">EtkinlikRehberi</h3>
            <p className="mt-4 text-sm text-gray-400">
              Şehrinizdeki en güncel etkinlikleri keşfedin.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Hızlı Bağlantılar</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/etkinlikler" className="text-sm text-gray-400 hover:text-white">
                  Etkinlikler
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-sm text-gray-400 hover:text-white">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm text-gray-400 hover:text-white">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">İletişim</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Email: info@etkinlikrehberi.com</li>
              <li>Tel: +90 (555) 123 45 67</li>
              <li>Adres: İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} EtkinlikRehberi. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
} 