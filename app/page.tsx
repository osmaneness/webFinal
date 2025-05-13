import Link from 'next/link';
import { Calendar, Image, Newspaper } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Şehrinizdeki Etkinlikleri Keşfedin
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Konserler, tiyatrolar, sergiler ve daha fazlası. Şehrinizdeki tüm etkinlikleri tek bir platformda bulun.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/etkinlikler"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Etkinlikleri Keşfet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Özellikler */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Özellikler</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Etkinlik Rehberi ile Her Şey Daha Kolay
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Calendar className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Güncel Etkinlikler
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Şehrinizdeki tüm etkinlikleri güncel takvimde görüntüleyin.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Image className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Etkinlik Galerisi
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Etkinlik fotoğraflarını görüntüleyin ve paylaşın.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Newspaper className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Son Duyurular
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">En son etkinlik duyurularını takip edin.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
