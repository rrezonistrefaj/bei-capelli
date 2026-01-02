import PageRenderer from '@/components/sections/PageRenderer';
import Footer from '@/components/layout/Footer';
import { getPageBySlug, getFooterData } from '@/lib/api';
import { getAllPageSlugs } from '@/lib/services/pages';
import type { Metadata } from 'next';
import { FooterData } from '@/types/strapi';

type Params = Promise<{ slug?: string[] }>;

const fallbackFooterData: FooterData = {
  id: 0,
  documentId: '',
  scheduleBlock: {
    leftTitleLabel: '',
    rightTitleLabel: '',
    schedule: []
  },
  formBlock: {
    title: '',
    description: '',
    submitText: '',
    privacyNotice: ''
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug: slugParam } = await params;
  const slug = Array.isArray(slugParam) ? slugParam.join('/') : '';
  
  try {
  const [page, footerData] = await Promise.all([
      getPageBySlug(slug),
    getFooterData()
  ]);
  
  if (!page) {
      // In development, show available pages
      let availableSlugs: string[] = [];
      if (process.env.NODE_ENV === 'development') {
        try {
          availableSlugs = await getAllPageSlugs();
        } catch {
          // Silently fail in development
        }
      }
      
    return (
      <div className="min-h-screen bg-[#E0D7C9] flex items-center justify-center">
          <div className="text-center max-w-2xl px-4">
          <h1 className="text-4xl font-bold text-black mb-4">Page Not Found</h1>
            <p className="text-lg text-black mb-4">The page &quot;{slug}&quot; could not be found.</p>
            {process.env.NODE_ENV === 'development' && availableSlugs.length > 0 && (
              <div className="mt-6 text-left">
                <p className="text-sm font-semibold text-black mb-2">Available pages:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {availableSlugs.map((s) => (
                    <li key={s}>
                      <a href={`/${s}`} className="hover:underline text-blue-600">
                        /{s}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#E0D7C9]">
      <main className="pt-24">
        <PageRenderer sections={page.sections || []} />
      </main>
      <Footer data={footerData} />
    </div>
  );
  } catch {
    return (
      <div className="min-h-screen bg-[#E0D7C9]">
        <main className="pt-24">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-black mb-4">Unable to load page</h1>
            <p className="text-lg text-black">Please try again later.</p>
          </div>
        </main>
        <Footer data={fallbackFooterData} />
      </div>
    );
  }
}

// Best-practice metadata for slug pages
export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const { slug: slugParam } = await params;
  const slug = Array.isArray(slugParam) ? slugParam.join('/') : ''
  
  try {
    const page = await getPageBySlug(slug)

  const title = page?.seo?.metaTitle || page?.title || 'Bei Capelli'
  const description = page?.seo?.metaDescription || 'Beauty and hair services at Bei Capelli.'
  const base = process.env.NEXT_PUBLIC_STRAPI_URL
  if (!base && process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_STRAPI_URL environment variable is required in production')
  }
  const shareImage = page?.seo?.shareImage?.url
    ? (page.seo.shareImage.url.startsWith('http') ? page.seo.shareImage.url : base ? `${base}${page.seo.shareImage.url}` : page.seo.shareImage.url)
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/${slug}`.replace(/\/+/, '/'),
      images: shareImage ? [{ url: shareImage }] : undefined
    },
    twitter: {
      card: shareImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: shareImage ? [shareImage] : undefined
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/${slug}`.replace(/\/+/, '/')
      }
    }
  } catch {
    return {
      title: 'Bei Capelli',
      description: 'Beauty and hair services at Bei Capelli.'
    }
  }
}


